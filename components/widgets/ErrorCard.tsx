import { AlertCircle } from 'lucide-react';
import { ErrorPayload } from '@/types';

export default function ErrorCard({ data }: { data: ErrorPayload }) {
  return (
    <div className="mt-2 w-64 rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm dark:border-red-900/30 dark:bg-red-950/20">
      <div className="mb-2 flex items-center gap-2 text-red-600 dark:text-red-400">
        <AlertCircle className="h-5 w-5" />
        <span className="text-sm font-semibold">Action Failed</span>
      </div>
      <p className="text-xs font-mono text-red-800 dark:text-red-300 mb-1">
        {data.code}
      </p>
      <p className="text-sm text-red-700 dark:text-red-400">
        {data.message}
      </p>
    </div>
  );
}