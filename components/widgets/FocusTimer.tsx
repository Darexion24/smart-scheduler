import { Timer, Zap } from 'lucide-react';
import { FocusPayload } from '@/types';

export default function FocusTimer({ data }: { data: FocusPayload }) {
  return (
    <div className="mt-2 w-64 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm dark:border-indigo-900/30 dark:bg-indigo-950/20">
      <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <Zap className="h-5 w-5 fill-indigo-600 dark:fill-indigo-400" />
        <span className="text-sm font-semibold">Focus Mode Active</span>
      </div>
      <div className="flex flex-col items-center justify-center py-2">
        <Timer className="mb-1 h-8 w-8 text-indigo-500" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {data.durationMinutes}:00
        </span>
        <span className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">{data.label}</span>
      </div>
      <button className="mt-3 w-full rounded-xl bg-indigo-600 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-700">
        End Session
      </button>
    </div>
  );
}