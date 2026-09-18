import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AIShoppingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

export const AIShoppingAssistant: React.FC<AIShoppingAssistantProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hello! I'm your MERCHVERSE AI Creator Stylist. I can assist you with sizing, explain the craftsmanship behind the Gen-2 Recycled Hoodie, help you find developer gifts, or match your personal workflow aesthetic.",
      timestamp: 'Just now',
      recommendedProductIds: ['google-recycled-black-hoodie-gen2', 'nano-banana-tee'],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Why is the Gen-2 Hoodie better than regular merch?',
    'What size should I get for a Tokyo relaxed drape?',
    'Recommend a gift under $100 for an AI engineer',
    'Tell me about the Nano Banana Graphic Tee',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      const replyText = data.reply || 'I recommend checking out our Recycled Black Hoodie (Gen-2) and the cult-favorite Nano Banana Tee for the quintessential creator uniform.';

      // Determine product recommendations based on message content
      const lower = textToSend.toLowerCase();
      let matchedIds: string[] = [];
      if (lower.includes('hoodie') || lower.includes('black')) {
        matchedIds.push('google-recycled-black-hoodie-gen2');
      }
      if (lower.includes('banana') || lower.includes('tee') || lower.includes('t-shirt')) {
        matchedIds.push('nano-banana-tee');
      }
      if (lower.includes('gift') || lower.includes('under 100')) {
        matchedIds.push('nano-banana-tee', 'deepmind-latent-space-cap');
      }
      if (lower.includes('bag') || lower.includes('backpack') || lower.includes('laptop')) {
        matchedIds.push('quantum-modular-creator-backpack');
      }
      if (matchedIds.length === 0) {
        matchedIds = ['google-recycled-black-hoodie-gen2'];
      }

      const botMsg: Message = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: matchedIds,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: 'bot_err_' + Date.now(),
        sender: 'assistant',
        text: 'The **Recycled Black Hoodie (Gen-2)** ($98) is our flagship recommendation. Crafted with 460 GSM circular knit and hidden Pixel Buds pocket, it offers premium creator luxury.',
        timestamp: 'Just now',
        recommendedProductIds: ['google-recycled-black-hoodie-gen2'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full sm:h-[90vh] sm:mr-6 rounded-none sm:rounded-3xl bg-[#10121a] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Assistant Header */}
        <div className="p-4 border-b border-white/10 bg-[#141824] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#4285F4] to-[#EA4335] text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                <span>AI Creator Stylist</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-[#34A853]/20 text-[#34A853] border border-[#34A853]/30">
                  Online
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Gemini 2.5 Multimodal Engine</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const recommendedProducts = msg.recommendedProductIds
              ? PRODUCTS.filter((p) => msg.recommendedProductIds?.includes(p.id))
              : [];

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#4285F4] text-white rounded-br-none'
                      : 'bg-[#181d2c] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Embedded Product Cards inside Chat */}
                {recommendedProducts.length > 0 && !isUser && (
                  <div className="mt-2 space-y-2 w-full max-w-[90%]">
                    {recommendedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-2.5 rounded-2xl bg-[#141822] border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                      >
                        <div
                          onClick={() => {
                            onSelectProduct(prod);
                            onClose();
                          }}
                          className="flex items-center space-x-2.5 cursor-pointer flex-1"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="text-xs">
                            <div className="font-bold text-white line-clamp-1">{prod.name}</div>
                            <div className="text-[#34A853] font-mono font-bold">${prod.price}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(prod, 1, prod.sizes[0] || 'M', prod.colors[0].name)}
                          className="p-2 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs shrink-0"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono py-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#4285F4] animate-spin" />
              <span>Analyzing creator telemetry & generating recommendation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="p-3 border-t border-white/5 bg-[#10121a]">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2 pt-1"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sizing, fabric, styling, or gifts..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4285F4]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-[#4285F4] hover:bg-[#3367d6] disabled:opacity-50 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
