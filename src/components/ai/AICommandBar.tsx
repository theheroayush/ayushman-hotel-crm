import React, { useState, useEffect } from 'react';
import { Sparkles, Key, ArrowRight, CornerDownLeft, MessageSquare } from 'lucide-react';
import type { Room, Guest } from '../../types/hotel';

interface AICommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  guests: Guest[];
  onSelectAction: (action: string, payload?: any) => void;
}

export const AICommandBar: React.FC<AICommandBarProps> = ({
  isOpen,
  onClose,
  rooms,
  guests,
  onSelectAction
}) => {
  const [query, setQuery] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (val.toLowerCase().includes('deluxe') || val.toLowerCase().includes('tomorrow')) {
      setAiResult('AI Insights: You have 2 Deluxe Ocean View rooms available tomorrow (Room 102 & Room 201).');
    } else if (val.toLowerCase().includes('pending') || val.toLowerCase().includes('payment')) {
      setAiResult('AI Insights: 1 Guest has pending balance (Vikram Malhotra in Room 201 - ₹1,400 pending).');
    } else if (val.toLowerCase().includes('vip')) {
      setAiResult('AI Insights: 2 VIP guests arriving/checked-in today: Rajesh Sharma & Dr. Sunita Patel.');
    } else if (val.toLowerCase().includes('whatsapp') || val.toLowerCase().includes('invoice')) {
      setAiResult('AI Insights: Ready to send WhatsApp invoice with UPI QR link.');
    } else {
      setAiResult(null);
    }
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(query.toLowerCase()) || 
    g.phone.includes(query)
  );

  const filteredRooms = rooms.filter(r => 
    r.number.includes(query) || 
    r.type.toLowerCase().includes(query.toLowerCase()) ||
    r.status.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 p-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Ask AI anything or search guest, room 101, pending payments..."
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-zinc-500 font-medium"
          />
          <button 
            onClick={onClose}
            className="px-2 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded-md border border-zinc-700"
          >
            ESC
          </button>
        </div>

        {aiResult && (
          <div className="p-3 mx-4 mt-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {aiResult}
            </span>
            <button 
              onClick={() => {
                onSelectAction('ai-query', query);
                onClose();
              }}
              className="text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              Open AI <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {!query && (
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Suggested Actions</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { onSelectAction('new-booking'); onClose(); }}
                  className="flex items-center gap-2.5 p-2.5 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-xs text-zinc-200 transition-colors text-left"
                >
                  <Key className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold">+ 30s Quick Walk-in</div>
                    <div className="text-[10px] text-zinc-400">Direct booking & room assign</div>
                  </div>
                </button>

                <button 
                  onClick={() => { onSelectAction('whatsapp-trigger'); onClose(); }}
                  className="flex items-center gap-2.5 p-2.5 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-xs text-zinc-200 transition-colors text-left"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold">WhatsApp Guest Hub</div>
                    <div className="text-[10px] text-zinc-400">Send invoices & check-in QR</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {filteredRooms.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Rooms</span>
              <div className="space-y-1">
                {filteredRooms.slice(0, 3).map(room => (
                  <div 
                    key={room.id}
                    onClick={() => { onSelectAction('view-room', room); onClose(); }}
                    className="flex items-center justify-between p-2.5 hover:bg-zinc-800/80 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        room.status === 'occupied' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        room.status === 'vacant' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        room.status === 'cleaning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-zinc-700 text-zinc-400'
                      }`}>
                        {room.number}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{room.type}</div>
                        <div className="text-[11px] text-zinc-400">
                          {room.currentGuest ? `Occupied by ${room.currentGuest.name}` : `Tariff: ₹${room.pricePerNight}/night`}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono capitalize px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {room.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredGuests.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Guests</span>
              <div className="space-y-1">
                {filteredGuests.slice(0, 3).map(guest => (
                  <div 
                    key={guest.id}
                    onClick={() => { onSelectAction('view-guest', guest); onClose(); }}
                    className="flex items-center justify-between p-2.5 hover:bg-zinc-800/80 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                        {guest.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          {guest.name}
                          {guest.isVIP && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">VIP</span>}
                        </div>
                        <div className="text-[11px] text-zinc-400">{guest.phone} • {guest.visits} visits</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Tip: Type room number or guest phone for 100ms lookup</span>
          <span>Ayushmaan OS Engine</span>
        </div>
      </div>
    </div>
  );
};
