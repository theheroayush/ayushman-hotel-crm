import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Crown, 
  ShieldCheck, 
  MessageSquare, 
  Search, 
  Clock,
  Sparkles
} from 'lucide-react';
import type { Guest } from '../../types/hotel';

interface GuestTimelineProps {
  guests: Guest[];
  onOpenWhatsApp: (guest: Guest) => void;
}

export const GuestTimeline: React.FC<GuestTimelineProps> = ({
  guests,
  onOpenWhatsApp
}) => {
  const [selectedGuestId, setSelectedGuestId] = useState<string>(guests[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.phone.includes(searchQuery)
  );

  const currentGuest = guests.find(g => g.id === selectedGuestId) || guests[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Guest 360° Profile & Timeline
          </h2>
          <p className="text-xs text-zinc-400">Receptionist immediately knows lifetime value, room preference, complaints, invoices & notes.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input 
            type="text"
            placeholder="Search guest by name / phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-zinc-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 space-y-2 max-h-[70vh] overflow-y-auto">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Guest Directory ({filteredGuests.length})</span>
          {filteredGuests.map(guest => {
            const isSelected = guest.id === currentGuest?.id;
            return (
              <div 
                key={guest.id}
                onClick={() => setSelectedGuestId(guest.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-150 flex items-center justify-between ${
                  isSelected ? 'bg-zinc-800 border border-zinc-700 shadow-md' : 'hover:bg-zinc-800/40 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold text-sm flex items-center justify-center border border-indigo-500/30">
                    {guest.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      {guest.name}
                      {guest.isVIP && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">VIP</span>}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">{guest.phone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-semibold text-emerald-400">₹{guest.totalSpent.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-zinc-500">{guest.visits} Stays</div>
                </div>
              </div>
            );
          })}
        </div>

        {currentGuest && (
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 text-indigo-300 font-extrabold text-xl flex items-center justify-center border border-indigo-500/40 shadow-inner">
                    {currentGuest.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">{currentGuest.name}</h3>
                      {currentGuest.isVIP && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-300" /> VIP Guest
                        </span>
                      )}
                      {currentGuest.aadhaarVerified && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Aadhaar Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {currentGuest.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {currentGuest.email}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenWhatsApp(currentGuest)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Hub
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Total Stays</span>
                  <span className="text-sm font-bold text-white font-mono">{currentGuest.visits} Times</span>
                </div>
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Lifetime Revenue</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">₹{currentGuest.totalSpent.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Preferred Room</span>
                  <span className="text-xs font-semibold text-indigo-300">{currentGuest.preferredRoomType}</span>
                </div>
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Pending Balance</span>
                  <span className={`text-sm font-bold font-mono ${currentGuest.pendingBalance > 0 ? 'text-red-400' : 'text-zinc-400'}`}>
                    ₹{currentGuest.pendingBalance.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Staff Internal Notes & Preferences:
                </span>
                <p className="text-xs text-zinc-300 italic">{currentGuest.notes || 'No special complaints recorded. Always pays via UPI.'}</p>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Stay & Activity History</h4>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                <div className="flex items-start gap-4 relative pl-8">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center absolute left-0 text-xs">
                    ✓
                  </div>
                  <div className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl w-full">
                    <div className="flex items-center justify-between text-xs text-white font-semibold">
                      <span>Stay in Executive Suite (Room 101)</span>
                      <span className="text-[10px] text-zinc-400 font-mono">24 Jul 2026</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">Paid ₹4,200 via UPI • Instant GST Invoice INV-2026-0891 issued</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative pl-8">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center absolute left-0 text-xs">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl w-full">
                    <div className="flex items-center justify-between text-xs text-white font-semibold">
                      <span>Previous Stay in Deluxe Ocean View</span>
                      <span className="text-[10px] text-zinc-400 font-mono">12 Jun 2026</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">Guest gave 5-star Google review via automated WhatsApp link</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
