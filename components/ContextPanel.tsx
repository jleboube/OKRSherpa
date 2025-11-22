import React, { useState } from 'react';
import { OKRContext } from '../types';
import { ChevronDown, ChevronRight, Target, Briefcase, Building2 } from 'lucide-react';

interface ContextPanelProps {
  context: OKRContext;
  onContextChange: (newContext: OKRContext) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ context, onContextChange, isOpen, toggleOpen }) => {
  
  const handleChange = (field: keyof OKRContext, value: string) => {
    onContextChange({ ...context, [field]: value });
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-20 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
      } w-80 md:relative md:translate-x-0 md:w-80 md:shadow-none flex flex-col`}
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Target className="text-indigo-600" size={20}/>
          Mission Control
        </h2>
        <button onClick={toggleOpen} className="md:hidden p-1 hover:bg-slate-200 rounded">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
             <Building2 size={16} className="text-slate-400"/>
             Leadership / Board Goals
          </label>
          <p className="text-xs text-slate-500">Paste the company's top-level OKRs or annual vision here. The Sherpa will align your goals to these.</p>
          <textarea
            value={context.leadershipGoals}
            onChange={(e) => handleChange('leadershipGoals', e.target.value)}
            className="w-full h-48 p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-slate-50"
            placeholder="e.g., 1. Achieve $10M ARR by Q4.&#10;2. Launch specific product X globally."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Briefcase size={16} className="text-slate-400"/>
            Your Role
          </label>
          <input
            type="text"
            value={context.userRole}
            onChange={(e) => handleChange('userRole', e.target.value)}
            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
            placeholder="e.g., VP of Engineering, Product Manager"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Building2 size={16} className="text-slate-400"/>
            Organization Type
          </label>
          <input
            type="text"
            value={context.organizationType}
            onChange={(e) => handleChange('organizationType', e.target.value)}
            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
            placeholder="e.g., B2B SaaS, Non-profit, E-commerce"
          />
        </div>
      </div>

      <div className="p-4 bg-indigo-50 border-t border-indigo-100">
        <p className="text-xs text-indigo-800 font-medium">
          Tip: The better the context provided above, the sharper the Sherpa's guidance will be.
        </p>
      </div>
    </div>
  );
};
