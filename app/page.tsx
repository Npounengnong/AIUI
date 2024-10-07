"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from '@/components/theme-toggle';
import { SettingsModal } from '@/components/SettingsModal';
import { MessageSquare, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a simulated AI response.' }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border p-4 flex flex-col">
        <Button className="mb-4 w-full justify-start" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          New chat
        </Button>
        <ScrollArea className="flex-grow">
          {/* Chat history would go here */}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <SettingsModal />
          </div>
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}