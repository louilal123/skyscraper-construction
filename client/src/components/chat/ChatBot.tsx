// src/components/chat/ChatBot.tsx
import { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { chatWithAI } from '../../lib/api';
import { marked } from 'marked';

interface Message {
  text: string;
  isUser: boolean;
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

  // Refs for typing animation
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

  // Auto-scroll to bottom when messages change
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

    typingIntervalRef.current = setInterval(() => {
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

    // Cancel any ongoing typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    // Add placeholder for AI response
    setMessages((prev) => [...prev, { text: '', isUser: false }]);

    try {
      const fullReply = await chatWithAI(userMessage);

      // Start typing animation into the last message
      typewriterEffect(
        fullReply,
        (partial) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { text: partial, isUser: false };
            return updated;
          });
        },
        () => {
          // Typing complete
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
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

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="
              fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
              inset-4 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:max-w-[calc(100vw-3rem)]
              h-[calc(100vh-2rem)] sm:h-[500px] sm:max-h-[calc(100vh-8rem)]
            "
          >
            <div className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span className="font-semibold text-sm sm:text-base">
                  Skyscraper Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden p-1 hover:bg-orange-600 rounded"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.isUser
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-2 sm:p-3 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg disabled:opacity-50"
                aria-label="Send message"
                disabled={isLoading}
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