// src/components/chat/ChatInterface.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { useAgent } from '@/hooks/useAgent';
import CalendarCard from '../widgets/CalendarCard';
import FocusTimer from '../widgets/FocusTimer';
import ErrorCard from '../widgets/ErrorCard';
import { ActionPayload } from '@/types';

export default function ChatInterface() {
  const { messages, sendMessage, isProcessing } = useAgent();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100 dark:bg-zinc-900 dark:ring-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-white/50 p-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-semibold text-gray-900 dark:text-white">Smart Scheduler</h1>
          <p className="text-xs text-gray-500 dark:text-zinc-400">Action-Oriented AI</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <p>Try saying "Schedule a deep work block at 2 PM"</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white'
                }`}
              >
                {msg.content}
              </div>
              
           {/* Action Widgets */}
           {msg.action && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ml-2"
                >
                  {msg.action.payload.type === 'SCHEDULE_EVENT' && (
                    <CalendarCard data={msg.action.payload.data} />
                  )}
                  {msg.action.payload.type === 'ACTIVATE_FOCUS' && (
                    <FocusTimer data={msg.action.payload.data} />
                  )}
                  {msg.action.payload.type === 'ERROR_TRIGGER' && (
                    <ErrorCard data={msg.action.payload.data} />
                  )}
                </motion.div>
              )}
            </motion.div>
          ))
        )}
        
        {/* Sophisticated Loading State */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
            <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-5 py-4 text-sm dark:bg-zinc-800">
              <span className="flex gap-1">
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="h-2 w-2 rounded-full bg-gray-400" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-2 w-2 rounded-full bg-gray-400" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-2 w-2 rounded-full bg-gray-400" />
              </span>
              <span className="text-gray-500 dark:text-gray-400">Processing action...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-zinc-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message your AI..."
            disabled={isProcessing}
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400 disabled:opacity-50 dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-black"
          >
            <Send className="h-4 w-4 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}