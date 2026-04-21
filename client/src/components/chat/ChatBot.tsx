// src/components/chat/ChatBot.tsx
import { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  text: string;
  isUser: boolean;
}

const faqResponses: Record<string, string> = {
  'services': 'We offer General Construction, CCTV Installation, Electrical, Solar, House Additions, Architectural, and Plumbing services.',
  'payment': 'We require a 30% down payment to start the project. The balance can be arranged based on project milestones.',
  'location': 'Our office is located at Barangay Uno, Buenavista, Marinduque 4904.',
  'contact': 'You can reach us at 09480498948 or message us on Facebook: SkyscraperCES.',
  'license': 'We are PCAB Licensed and SEC Registered. Visit our Licenses page for details.',
  'quote': 'For a free quote, please visit our Contact page or message us directly.',
  'default': 'I can help with questions about our services, payment terms, location, contact info, or licenses. What would you like to know?'
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today? Ask me about services, payment, location, or licenses.', isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    const lowerMsg = userMessage.toLowerCase();
    let response = faqResponses.default;

    if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
      response = faqResponses.services;
    } else if (lowerMsg.includes('payment') || lowerMsg.includes('down') || lowerMsg.includes('30%')) {
      response = faqResponses.payment;
    } else if (lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('where')) {
      response = faqResponses.location;
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('number')) {
      response = faqResponses.contact;
    } else if (lowerMsg.includes('license') || lowerMsg.includes('pcab') || lowerMsg.includes('registered')) {
      response = faqResponses.license;
    } else if (lowerMsg.includes('quote') || lowerMsg.includes('estimate') || lowerMsg.includes('price')) {
      response = faqResponses.quote;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 300);
  };

  return (
    <>
      {/* Chat toggle button - smaller on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition"
        aria-label="Chat with us"
      >
        {isOpen ? <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" /> : <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
      </button>

      {/* Chat window - responsive sizing and positioning */}
      {isOpen && (
        <>
          {/* Mobile overlay backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`
            fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
            /* Mobile: full screen with margin */
            inset-4 sm:inset-auto
            sm:bottom-24 sm:right-6 
            sm:w-96 sm:max-w-[calc(100vw-3rem)]
            /* Height constraints */
            h-[calc(100vh-2rem)] sm:h-[500px] sm:max-h-[calc(100vh-8rem)]
          `}>
            {/* Header */}
            <div className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span className="font-semibold text-sm sm:text-base">Skyscraper Assistant</span>
              </div>
              {/* Close button for mobile */}
              <button 
                onClick={() => setIsOpen(false)}
                className="sm:hidden p-1 hover:bg-orange-600 rounded"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm ${
                    msg.isUser 
                      ? 'bg-orange-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-2 sm:p-3 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg"
                aria-label="Send message"
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