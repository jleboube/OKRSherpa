import React from 'react';
import { Zap, Brain } from 'lucide-react';
import { ModelType } from '../types';

interface ModelToggleProps {
  currentModel: ModelType;
  onToggle: (model: ModelType) => void;
}

export const ModelToggle: React.FC<ModelToggleProps> = ({ currentModel, onToggle }) => {
  return (
    <div className="flex bg-slate-200 p-1 rounded-lg shadow-inner w-fit">
      <button
        onClick={() => onToggle(ModelType.FAST)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          currentModel === ModelType.FAST
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Zap size={16} />
        <span>Fast Chat</span>
      </button>
      <button
        onClick={() => onToggle(ModelType.DEEP)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          currentModel === ModelType.DEEP
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Brain size={16} />
        <span>Sherpa Think</span>
      </button>
    </div>
  );
};
