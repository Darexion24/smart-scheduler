  // src/lib/intentParser.ts
import { ActionPayload, IntentType } from '../types';

export function parseIntent(input: string): { intent: IntentType; payload: ActionPayload } {
  const lowerInput = input.toLowerCase();

  // 1. Check for Scheduling Intent
  if (lowerInput.includes('schedule') || lowerInput.includes('book') || lowerInput.includes('meeting')) {
    return {
      intent: 'SCHEDULE_EVENT',
      payload: {
        type: 'SCHEDULE_EVENT',
        data: {
          title: 'Deep Work Block',
          time: '14:00', // Mock extracted time
          durationMinutes: 60
        }
      }
    };
  }

  // 2. Check for Focus Mode Intent
  if (lowerInput.includes('focus') || lowerInput.includes('distraction free') || lowerInput.includes('pomodoro')) {
    return {
      intent: 'ACTIVATE_FOCUS',
      payload: {
        type: 'ACTIVATE_FOCUS',
        data: {
          durationMinutes: 25,
          label: 'Deep Work Session'
        }
      }
    };
  }

  // 3. Check for Error Trigger Intent
  if (lowerInput.includes('error') || lowerInput.includes('fail')) {
    return {
      intent: 'ERROR_TRIGGER',
      payload: {
        type: 'ERROR_TRIGGER',
        data: {
          code: 'ERR_TIMEOUT',
          message: 'The calendar API failed to respond in time.'
        }
      }
    };
  }

  // Default to General Chat
  return {
    intent: 'GENERAL_CHAT',
    payload: { type: 'GENERAL_CHAT', data: null }
  };
}