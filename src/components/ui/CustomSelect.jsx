import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Custom Cyberpunk / TUI Select Component
 * Replaces native HTML <select> with custom styled dropdown list
 */
export const CustomSelect = ({ options, value, onChange, placeholder = 'Select option...', className = '', buttonClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle option select
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Find label for current value
  const selectedOption = options.find((opt) => opt.value === value || opt === value);
  const selectedLabel = typeof selectedOption === 'object' ? selectedOption.label : selectedOption || value;

  return (
    <div className={`relative w-full font-mono text-xs ${className}`} ref={containerRef}>
      
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full bg-[#07080e] border ${
          isOpen ? 'border-cyan-400 text-cyan-300' : 'border-white/10 text-slate-200 hover:border-white/30'
        } rounded-md px-3 py-2 flex items-center justify-between cursor-pointer transition-all select-none ${buttonClassName}`}
      >
        <span className="truncate pr-2 font-mono text-xs">{selectedLabel || placeholder}</span>
        
        {/* Chevron Arrow Icon */}
        <ChevronDown 
          size={13} 
          className={`text-slate-400 shrink-0 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`} 
        />
      </div>

      {/* Custom Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0B0B11] border border-white/20 rounded-md overflow-hidden z-50 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 font-mono text-xs divide-y divide-white/5">
          {options.map((opt, idx) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = optValue === value;

            return (
              <div
                key={idx}
                onClick={() => handleSelect(optValue)}
                className={`px-3.5 py-2.5 cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span className="truncate pr-2">{optLabel}</span>
                {isSelected && <span className="text-cyan-400 text-xs font-bold">✓</span>}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default CustomSelect;
