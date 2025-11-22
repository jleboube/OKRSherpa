import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Sender } from '../types';
import { Bot, User, Sparkles } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAi = message.sender === Sender.AI;

  return (
    <div className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'} mb-6 animate-fade-in-up`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm mt-1 ${
          isAi ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
        }`}>
          {isAi ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden ${
              isAi
                ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                : 'bg-indigo-600 text-white rounded-tr-none'
            }`}
          >
            {message.isThinking ? (
              <div className="flex items-center gap-2 text-indigo-500">
                 <Sparkles size={16} className="animate-pulse" />
                 <span className="italic font-medium">Thinking about your goals...</span>
              </div>
            ) : (
              <div className="markdown-body">
                <ReactMarkdown
                  components={{
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-base font-bold my-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-sm font-bold my-1" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-3 italic my-2 opacity-80" {...props} />,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1 px-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
