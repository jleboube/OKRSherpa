import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from './services/geminiService';
import { Message, Sender, OKRContext, ModelType } from './types';
import { ContextPanel } from './components/ContextPanel';
import { MessageBubble } from './components/MessageBubble';
import { ModelToggle } from './components/ModelToggle';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { Send, Menu, Mountain, X, ChevronLeft, LogIn, LogOut, Save } from 'lucide-react';

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  text: "Hello! I'm your OKR Sherpa. I'm here to help you set ambitious, measurable goals aligned with your organization's vision. To start, could you tell me what you're hoping to achieve this quarter, or shall we review the Leadership Goals first?",
  sender: Sender.AI,
  timestamp: Date.now(),
};

type PageView = 'landing' | 'chat' | 'privacy' | 'terms';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageView>('landing');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Chat App State
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [modelType, setModelType] = useState<ModelType>(ModelType.FAST);
  const [context, setContext] = useState<OKRContext>({
    leadershipGoals: '',
    userRole: '',
    organizationType: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Refs for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPage === 'chat') {
      scrollToBottom();
    }
  }, [messages, isThinking, currentPage]);

  // Check for existing auth on mount
  useEffect(() => {
    // Handle OAuth callback
    if (window.location.pathname === '/auth/callback') {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const state = params.get('state');

      if (accessToken && state === 'okr_sherpa_auth') {
        // Fetch user info from Google
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(res => res.json())
          .then(userData => {
            const user = {
              email: userData.email,
              name: userData.name
            };
            setUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('okr_user', JSON.stringify(user));

            // Redirect back to main page
            window.history.replaceState({}, '', '/');
            setCurrentPage('landing');
          })
          .catch(err => {
            console.error('Failed to fetch user info:', err);
            alert('Failed to sign in with Google');
            window.history.replaceState({}, '', '/');
          });
      } else {
        window.history.replaceState({}, '', '/');
      }
      return;
    }

    // Check for stored user
    const storedUser = localStorage.getItem('okr_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse stored user data');
      }
    }
  }, []);

  // Google OAuth login
  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;

    if (!clientId) {
      console.error('Google Client ID not configured');
      alert('Google OAuth is not configured. Please add VITE_GOOGLE_CLIENT_ID to .env.local');
      return;
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token&` +
      `scope=${encodeURIComponent('openid profile email')}&` +
      `state=okr_sherpa_auth`;

    window.location.href = googleAuthUrl;
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('okr_user');
    localStorage.removeItem('okr_messages');
    localStorage.removeItem('okr_context');
    setMessages([INITIAL_MESSAGE]);
    setContext({
      leadershipGoals: '',
      userRole: '',
      organizationType: '',
    });
  };

  const handleSaveOKR = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save your OKR data');
      return;
    }

    // Save to localStorage for now (will be MongoDB in production)
    localStorage.setItem('okr_messages', JSON.stringify(messages));
    localStorage.setItem('okr_context', JSON.stringify(context));
    alert('OKR data saved successfully!');
  };

  const handleLoadOKR = () => {
    const savedMessages = localStorage.getItem('okr_messages');
    const savedContext = localStorage.getItem('okr_context');

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to load messages');
      }
    }

    if (savedContext) {
      try {
        setContext(JSON.parse(savedContext));
      } catch (e) {
        console.error('Failed to load context');
      }
    }
  };

  // Load saved data when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      handleLoadOKR();
    }
  }, [isAuthenticated]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input.trim();
    setInput('');

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: Sender.USER,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    const currentHistory = [...messages]; 

    try {
      const responseText = await generateResponse(
        currentHistory,
        userText,
        context,
        modelType
      );

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to generate response", error);
    } finally {
      setIsThinking(false);
    }
  };

  // Page routing
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onStart={() => setCurrentPage('chat')}
        onNavigateToPrivacy={() => setCurrentPage('privacy')}
        onNavigateToTerms={() => setCurrentPage('terms')}
      />
    );
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => setCurrentPage('landing')} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={() => setCurrentPage('landing')} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden relative">
      {/* Mobile overlay for sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Context Panel */}
      <ContextPanel 
        context={context} 
        onContextChange={setContext} 
        isOpen={isSidebarOpen} 
        toggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-slate-600 hover:bg-slate-100 p-2 rounded-md"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div
              className="flex items-center gap-2 text-indigo-700 cursor-pointer hover:opacity-80"
              onClick={() => setCurrentPage('landing')}
              title="Back to Home"
            >
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Mountain size={20} />
              </div>
              <h1 className="text-lg font-bold tracking-tight hidden sm:block">OKR Sherpa</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleSaveOKR}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Save OKR Data"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
            <ModelToggle currentModel={modelType} onToggle={setModelType} />
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 scrollbar-hide bg-slate-50/50">
          <div className="max-w-3xl mx-auto w-full pb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isThinking && (
              <MessageBubble 
                message={{
                  id: 'thinking',
                  text: '',
                  sender: Sender.AI,
                  timestamp: Date.now(),
                  isThinking: true
                }} 
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto w-full">
            <form onSubmit={handleSendMessage} className="relative flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Describe your goal or ask for help with an Objective..."
                  className="w-full p-4 pr-12 max-h-40 min-h-[60px] text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all resize-none shadow-inner"
                  rows={1}
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className={`p-3 rounded-full flex-shrink-0 transition-all duration-200 shadow-md ${
                  !input.trim() || isThinking
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'
                }`}
              >
                <Send size={20} />
              </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-3">
              {modelType === ModelType.DEEP 
                ? "Using Gemini 3.0 Pro (Deep Reasoning Mode) for complex alignment." 
                : "Using Gemini 2.5 Flash Lite for quick assistance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
