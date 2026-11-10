import ChatInterface from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-zinc-950">
      <ChatInterface />
    </main>
  );
}