// src/components/chat/ChatBot.tsx
import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { chatWithAI } from '../../lib/api';
import { marked } from 'marked';

interface Message {
  text: string;
  isUser: boolean;
}

// Simple typing indicator (3 bouncing dots)
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-2 py-1">
      <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function AiRobotIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head – wide, square-ish with rounded corners */}
      <rect x="4" y="9" width="24" height="17" rx="5" />

      {/* Left antenna stalk + ball */}
      <line x1="12" y1="9" x2="12" y2="5" />
      <circle cx="12" cy="4" r="2" fill="currentColor" stroke="none" />

      {/* Right antenna stalk + ball */}
      <line x1="20" y1="9" x2="20" y2="5" />
      <circle cx="20" cy="4" r="2" fill="currentColor" stroke="none" />

      {/* Eyes – perfectly centered */}
      <circle cx="10.67" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="21.33" cy="15" r="1.5" fill="currentColor" stroke="none" />

      {/* Gentle smile */}
      <path d="M12 18.5 Q16 21 20 18.5" fill="none" />
    </svg>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hello! How can I help you today? Ask me anything about our services, payment, location, or licenses.',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const typingIntervalRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Auto‑scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const typewriterEffect = (
    fullText: string,
    updateCallback: (partial: string) => void,
    onComplete?: () => void,
    speed = 18
  ) => {
    let index = 0;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = window.setInterval(() => {
      index++;
      updateCallback(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(typingIntervalRef.current!);
        typingIntervalRef.current = null;
        onComplete?.();
      }
    }, speed);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Cancel ongoing typing
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    // Add placeholder with animated dots
    setMessages(prev => [...prev, { text: '...', isUser: false }]);
    setIsLoading(true);

    try {
      const fullReply = await chatWithAI(userMessage);

      // Replace placeholder with empty string, then start typing animation
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: '', isUser: false };
        return updated;
      });

      typewriterEffect(
        fullReply,
        (partial) => {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { text: partial, isUser: false };
            return updated;
          });
        },
        () => {
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: 'Sorry, I encountered an error. Please try again later.',
          isUser: false,
        };
        return updated;
      });
      setIsLoading(false);
    }
  };

  // Determine if the last AI message is still loading (showing dots)
  const lastAILoading = isLoading && messages.length > 1 && !messages[messages.length - 1].isUser;

  return (
    <>
      {/* Floating toggle button – always show the AI robot icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition cursor-pointer
                   h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center"
        aria-label="Chat with us"
      >
        <AiRobotIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 sm:hidden cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat window */}
          <div
            className="
              fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
              inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:max-w-[calc(100vw-2rem)]
              h-[calc(100dvh-2rem)] sm:h-[550px] sm:max-h-[calc(100dvh-6rem)]
            "
          >
            {/* Header */}
            <div className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <AiRobotIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-semibold text-sm sm:text-base">
                  Skyscraper Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-orange-600 rounded cursor-pointer"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-gray-50">
              {messages.map((msg, idx) => {
                // Show typing dots for the last AI message when loading
                if (lastAILoading && idx === messages.length - 1 && msg.text === '...') {
                  return (
                    <div key={idx} className="flex justify-start">
                      <div className="bg-blue-50 border border-blue-200 text-gray-800 rounded-bl-none rounded-lg px-3 py-2 max-w-[85%]">
                        <TypingDots />
                      </div>
                    </div>
                  );
                }

                // Normal message rendering
                return (
                  <div
                    key={idx}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-sm  ${
                        msg.isUser
                          ? 'bg-orange-500 text-white rounded-br-none'
                          : 'bg-blue-50 border border-blue-200 text-gray-800 rounded-bl-none'
                      }`}
                      dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                    />
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-2 sm:p-3 bg-white flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-text"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg disabled:opacity-50 cursor-pointer transition-colors"
                aria-label="Send message"
                disabled={isLoading || !input.trim()}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}