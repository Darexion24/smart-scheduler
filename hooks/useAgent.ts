// src/hooks/useAgent.ts
import { useState } from 'react';
import { Message, AgentAction } from '../types';
import { parseIntent } from '../lib/intentParser';

export function useAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = async (content: string) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    // 2. Simulate Network Delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Parse Intent and Generate Action
    const { intent, payload } = parseIntent(content);
    
    const action: AgentAction = {
      id: `act_${Date.now()}`,
      intent,
      status: intent === 'ERROR_TRIGGER' ? 'error' : 'success',
      payload
    };

    // 4. Generate AI Response Message based on Intent
    let aiResponseText = '';
    switch (intent) {
      case 'SCHEDULE_EVENT':
        aiResponseText = 'I have prepared that calendar event for you.';
        break;
      case 'ACTIVATE_FOCUS':
        aiResponseText = 'Focus mode initiated. Silencing notifications.';
        break;
      case 'ERROR_TRIGGER':
        aiResponseText = 'I encountered an issue executing that action.';
        break;
      default:
        aiResponseText = "I'm a scheduling assistant. Try asking me to 'schedule a meeting' or 'enter focus mode'.";
    }

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponseText,
      timestamp: new Date(),
      action: intent !== 'GENERAL_CHAT' ? action : undefined // Attach the action if it's not a generic chat
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  return {
    messages,
    sendMessage,
    isProcessing
  };
}