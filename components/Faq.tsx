import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem } from '../types';

export const Faq: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 focus:outline-none"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>{item.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-brand-500" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};