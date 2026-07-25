import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCheck, 
  QrCode, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import type { Guest } from '../../types/hotel';

interface WhatsAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  guest?: Guest | null;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  isOpen,
  onClose,
  guest
}) => {
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'guest' | 'hotel' | 'ai'; text: string; type?: 'text' | 'qr' | 'invoice' | 'location' }>>([
    { sender: 'guest', text: 'Namaste! Do you have a room for tonight?' },
    { sender: 'ai', text: 'Namaste Rajesh Ji! 🙏 We have our Deluxe Ocean View room available for ₹3,500/night. Would you like me to reserve it?' },
    { sender: 'guest', text: 'Yes please confirm' },
    { 
      sender: 'ai', 
      text: 'Great! Room 101 has been blocked. Tap below to pay advance via UPI & get your instant digital key & GST receipt.',
      type: 'qr'
    },
    {
      sender: 'ai',
      text: '📍 Hotel Location & Instant Check-in QR: Grand Heritage Inn, Beach Road. Tap to navigate in Google Maps.',
      type: 'location'
    }
  ]);

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const activeGuestName = guest ? guest.name : 'Rajesh Sharma';

  const handleSend = () => {
    if (!input.trim()) return;
    const newGuestMsg = { sender: 'guest' as const, text: input };
    setChatMessages(prev => [...prev, newGuestMsg]);
    setInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Thank you! Ayushmaan OS AI has updated your reservation for ${activeGuestName}. Your check-in QR code is ready at front desk.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[640px]">
        <div className="bg-emerald-900/90 p-4 border-b border-emerald-700/60 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/30 font-bold text-sm flex items-center justify-center border border-emerald-400">
              {activeGuestName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                {activeGuestName}
                <span className="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">WhatsApp AI</span>
              </div>
              <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online • Automated Bot
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 bg-[#0b141a] overflow-y-auto space-y-3 font-sans">
          {chatMessages.map((msg, index) => (
            <div 
              key={index}
              className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-2 ${
                msg.sender === 'guest' 
                  ? 'bg-[#005c4b] text-white rounded-tr-none' 
                  : 'bg-[#202c33] text-zinc-100 rounded-tl-none border border-zinc-700/40'
              }`}>
                {msg.sender === 'ai' && (
                  <div className="text-[9px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Ayushmaan OS Auto-Bot
                  </div>
                )}
                <div>{msg.text}</div>

                {msg.type === 'qr' && (
                  <div className="p-3 bg-[#111b21] rounded-xl border border-emerald-500/40 space-y-2 mt-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-300">
                      <span>UPI Payment Request</span>
                      <span className="font-mono">₹3,500</span>
                    </div>
                    <div className="w-full bg-white p-2 rounded-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-black" />
                    </div>
                    <button className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold text-center">
                      Tap to Pay via PhonePe / GPay
                    </button>
                  </div>
                )}

                {msg.type === 'location' && (
                  <div className="p-2.5 bg-[#111b21] rounded-xl border border-zinc-700 flex items-center gap-2 mt-1">
                    <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                    <div className="text-[11px] text-zinc-300">
                      Grand Heritage Inn Location Pin & Directions
                    </div>
                  </div>
                )}

                <div className="text-[9px] text-zinc-400 text-right flex items-center justify-end gap-1 pt-1">
                  <span>10:42 PM</span>
                  <CheckCheck className="w-3 h-3 text-sky-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#202c33] border-t border-zinc-800 flex items-center gap-2">
          <input 
            type="text"
            placeholder="Simulate guest message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-[#2a3942] text-xs text-white px-3 py-2 rounded-full focus:outline-none placeholder-zinc-400"
          />
          <button 
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
