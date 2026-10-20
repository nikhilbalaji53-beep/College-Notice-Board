import React from 'react';
import { Category } from '../types';
import { 
  Layers, 
  FileText, 
  Award, 
  Building2, 
  Users, 
  CreditCard, 
  AlertTriangle,
  HelpCircle,
  UserCheck
} from 'lucide-react';

interface FilterChipsProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  categoryCounts: Record<string, number>;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
}) => {
  const chips: { name: Category; icon: React.ElementType }[] = [
    { name: 'All', icon: Layers },
    { name: 'Attendance', icon: UserCheck },
    { name: 'Examination', icon: FileText },
    { name: 'Placement', icon: Award },
    { name: 'Department', icon: Building2 },
    { name: 'Fees', icon: CreditCard },
    { name: 'Emergency', icon: AlertTriangle },
    { name: 'Clubs', icon: Users },
    { name: 'General', icon: HelpCircle },
  ];

  return (
    <div className="relative w-full overflow-x-auto no-scrollbar py-2 my-2">
      <div className="flex items-center gap-2 min-w-max">
        {chips.map((chip) => {
          const Icon = chip.icon;
          const isSelected = selectedCategory === chip.name;
          const count = categoryCounts[chip.name] || 0;

          return (
            <button
              key={chip.name}
              onClick={() => setSelectedCategory(chip.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? (chip.name === 'Emergency' ? 'text-red-400' : '') : 'text-slate-400'}`} />
              <span>{chip.name}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
