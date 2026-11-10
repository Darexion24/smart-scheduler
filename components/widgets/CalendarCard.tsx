import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { SchedulePayload } from '@/types';

export default function CalendarCard({ data }: { data: SchedulePayload }) {
  return (
    <div className="mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-semibold">Event Scheduled</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="font-medium">{data.title}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{data.time} ({data.durationMinutes} min)</span>
        </div>
      </div>
      <button className="mt-4 w-full rounded-xl bg-gray-100 py-2 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600">
        View in Calendar
      </button>
    </div>
  );
}