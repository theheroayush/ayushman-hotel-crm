import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  User, 
  MessageSquare, 
  CornerDownLeft
} from 'lucide-react';

interface AIAssistantModuleProps {
  onTriggerWhatsApp: () => void;
  onOpenQuickBooking: () => void;
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({
  onTriggerWhatsApp
}) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; action?: string }[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am your Ayushmaan OS AI Assistant. Ask me anything about rooms, pending payments, guest WhatsApp invoices, or occupancy predictions.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const quickPrompts = [
    'How many deluxe rooms tomorrow?',
    'Who has pending payment?',
    'Show VIP arrivals today',
    'Draft WhatsApp review request',
    'Predict occupancy for next weekend'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    let aiResponseText = '';

    const lower = query.toLowerCase();
    if (lower.includes('deluxe') || lower.includes('tomorrow')) {
      aiResponseText = 'Tomorrow you have 2 Deluxe Ocean View rooms available (Room 102 & Room 201). Current tariff is ₹3,500/night.';
    } else if (lower.includes('pending') || lower.includes('payment')) {
      aiResponseText = '1 Guest currently has an outstanding pending balance: Vikram Malhotra in Room 201 owes ₹1,400.';
    } else if (lower.includes('vip')) {
      aiResponseText = '2 VIP guests today: Rajesh Sharma (Executive Suite 101, 5 stays) & Dr. Sunita Patel (Presidential Suite 203, 8 stays). Both prefer non-smoking rooms with early green tea.';
    } else if (lower.includes('whatsapp') || lower.includes('review')) {
      aiResponseText = 'WhatsApp Draft Ready: "Dear Rajesh, thank you for choosing Grand Heritage Inn! We hope you enjoyed your stay in Room 101. Could you share a 5-star Google review? Tap here: https://g.page/grandheritage/review"';
    } else if (lower.includes('predict') || lower.includes('occupancy')) {
      aiResponseText = 'Occupancy Prediction: Next weekend expected at 92% occupancy due to regional tech conference. Recommended dynamic surge pricing: +15% on Deluxe & Executive Suites.';
    } else {
      aiResponseText = `Processing "${query}": Analysis complete. Everything is running smoothly across Front Desk and Housekeeping.`;
    }

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: aiResponseText }]);
    setInputQuery('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-950 via-zinc-900 to-zinc-900 p-5 rounded-2xl border border-indigo-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Reception & Operations Copilot</h2>
            <p className="text-xs text-indigo-300/80">No menus. Just type or ask in natural Hindi/English.</p>
          </div>
        </div>

        <button 
          onClick={onTriggerWhatsApp}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
        >
          <MessageSquare className="w-4 h-4" /> Open WhatsApp AI
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-indigo-500/50 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            {prompt}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 min-h-[400px] flex flex-col justify-between space-y-4">
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-4 rounded-2xl text-xs max-w-xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 rounded-tl-none'
              }`}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-700/80 focus-within:border-indigo-500 transition-colors">
            <input 
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI anything (e.g. 'Who has pending payment?', 'Draft invoice for 101')..."
              className="w-full bg-transparent text-xs text-white px-2 focus:outline-none placeholder-zinc-500"
            />
            <button 
              onClick={() => handleSend()}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              Ask AI <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
