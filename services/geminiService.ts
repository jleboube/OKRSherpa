import { GoogleGenAI, Content } from "@google/genai";
import { Message, ModelType, OKRContext, Sender } from "../types";

// Initialize the client
// API key must be provided via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_BASE = `
You are the "OKR Sherpa", an expert consultant in Objectives and Key Results (OKRs).
Your goal is to help the user draft high-quality, measurable, and aligned OKRs using the Socratic method.
Do not simply write the OKRs for them immediately. Ask probing questions to clarify their intent, measure of success, and alignment.

Principles:
1. Alignment: All OKRs must tie back to the provided Leadership/Board Goals.
2. Measurability: Key Results must be quantitative (numbers, percentages, currency) and time-bound.
3. Ambition: OKRs should be "roofshots" or "moonshots", not just "business as usual".
4. Socratic Approach: Guide the user. Ask "Why is this important?" or "How will we know we've succeeded?"
5. Tone: Professional, encouraging, clear, and concise.

When the user provides input, analyze it against the Leadership Goals. If it lacks alignment or specific metrics, kindly ask questions to refine it.
`;

export const generateResponse = async (
  history: Message[],
  currentInput: string,
  context: OKRContext,
  modelType: ModelType
): Promise<string> => {
  try {
    // Construct the full system instruction with the dynamic context
    const contextBlock = `
    --- CONTEXT ---
    Organization/Team Type: ${context.organizationType || "Not specified"}
    User Role: ${context.userRole || "Not specified"}
    
    LEADERSHIP/BOARD GOALS (The North Star):
    ${context.leadershipGoals || "No specific leadership goals provided. Ask the user to provide them if needed for alignment."}
    --- END CONTEXT ---
    `;

    const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}\n${contextBlock}`;

    // Select model and config based on type
    let modelName = 'gemini-2.5-flash-lite'; // Default to fast
    let config: any = {
        systemInstruction: fullSystemInstruction,
    };

    if (modelType === ModelType.DEEP) {
      modelName = 'gemini-3-pro-preview';
      // Thinking config for deep reasoning
      config = {
        ...config,
        thinkingConfig: { thinkingBudget: 32768 }, 
        // Note: maxOutputTokens should NOT be set when using thinkingBudget effectively if we want max potential, 
        // or set carefully. The prompt says "Do not set maxOutputTokens".
      };
    } else {
      // Fast mode
      modelName = 'gemini-2.5-flash-lite';
      config = {
        ...config,
        temperature: 0.7,
      };
    }

    // Convert internal message history to Gemini Content format
    const contents: Content[] = history.map((msg) => ({
      role: msg.sender === Sender.USER ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: currentInput }],
    });

    // We use generateContent because we are managing history manually to inject context dynamically if needed,
    // but using ai.chats.create is also valid. Here generateContent gives us fine-grained control per request.
    // However, keeping context in a chat session object is often easier. 
    // Let's use generateContent to strictly follow the "stateless but with history" pattern for easier React integration.
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config,
    });

    return response.text || "I'm having trouble generating a response right now. Please try again.";

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "I encountered an error while consulting my guidebooks. Please ensure your API key is valid and try again.";
  }
};
