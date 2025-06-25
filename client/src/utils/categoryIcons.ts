import type { ExpenseCategory } from '../types';

export const categoryIcons: Record<ExpenseCategory, string> = {
  Food: '🍽️',
  Business: '💼',
  Travel: '✈️',
  Shopping: '🛍️',
  Health: '🏥',
  Education: '📚',
  Other: '📦'
};

export const categoryColors: Record<ExpenseCategory, string> = {
  Food: 'from-orange-500 to-red-500',
  Business: 'from-blue-500 to-indigo-500',
  Travel: 'from-green-500 to-teal-500',
  Shopping: 'from-purple-500 to-pink-500',
  Health: 'from-red-500 to-rose-500',
  Education: 'from-yellow-500 to-orange-500',
  Other: 'from-gray-500 to-slate-500'
};
