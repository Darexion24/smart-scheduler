export type Role = 'user' | 'assistant' | 'system';

export type IntentType = 
  | 'SCHEDULE_EVENT' 
  | 'ACTIVATE_FOCUS' 
  | 'CHECK_AVAILABILITY' 
  | 'ERROR_TRIGGER' 
  | 'GENERAL_CHAT';

export type ActionStatus = 'idle' | 'processing' | 'success' | 'error';

export interface SchedulePayload {
  title: string;
  time: string;
  durationMinutes: number;
}

export interface FocusPayload {
  durationMinutes: number;
  label: string;
}

export interface ErrorPayload {
  code: string;
  message: string;
}

// A discriminated union for type-safe action payloads
export type ActionPayload = 
  | { type: 'SCHEDULE_EVENT'; data: SchedulePayload }
  | { type: 'ACTIVATE_FOCUS'; data: FocusPayload }
  | { type: 'CHECK_AVAILABILITY'; data: { date: string } }
  | { type: 'ERROR_TRIGGER'; data: ErrorPayload }
  | { type: 'GENERAL_CHAT'; data: null };

export interface AgentAction {
  id: string;
  intent: IntentType;
  status: ActionStatus;
  payload: ActionPayload;
  errorMessage?: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  action?: AgentAction; // Attaches an interactive widget to the message
}