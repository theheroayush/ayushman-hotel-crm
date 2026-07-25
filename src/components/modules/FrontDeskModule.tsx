import React from 'react';
import { 
  UserCheck, 
  UserMinus, 
  Footprints, 
  Clock, 
  Crown, 
  AlertCircle, 
  Plus, 
  IndianRupee, 
  ArrowUpRight,
  Building,
  Brush,
  Wrench
} from 'lucide-react';
import type { Room, Guest } from '../../types/hotel';

interface FrontDeskModuleProps {
  rooms: Room[];
  guests: Guest[];
  onOpenQuickBooking: () => void;
  onOpenCheckIn: (room: Room) => void;
  onOpenCheckOut: (room: Room) => void;
  onOpenPayment: (guest: Guest) => void;
  onSelectTab: (tab: any) => void;
}

export const FrontDeskModule: React.FC<FrontDeskModuleProps> = ({
  rooms,
  guests,
  onOpenQuickBooking,
  onOpenCheckOut,
  onOpenPayment,
  onSelectTab
}) => {
  const occupiedRooms = rooms.filter(r => r.status === 'occupied');
  const cleaningRooms = rooms.filter(r => r.status === 'cleaning');
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance');

  const vipGuests = guests.filter(g => g.isVIP);
  const pendingPaymentGuests = guests.filter(g => g.pendingBalance > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 p-5 rounded-2xl border border-zinc-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              FRONT DESK LIVE
            </span>
            <span className="text-xs text-zinc-400">Shift Manager: Aman V.</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">Operational Workspace</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Everything needed to run check-ins, guest billing & room allocation without switching screens.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenQuickBooking}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all duration-150 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            + 30s Quick Walk-in / Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Check Ins</span>
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">4</div>
          <span className="text-[10px] text-emerald-400">2 Processed</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Check Outs</span>
            <UserMinus className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">3</div>
          <span className="text-[10px] text-amber-400">1 Due in 30m</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Walk-Ins</span>
            <Footprints className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">2</div>
          <span className="text-[10px] text-indigo-400">Today</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Pending Pay</span>
            <IndianRupee className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-lg font-bold font-mono text-red-400">₹{pendingPaymentGuests.reduce((acc, g) => acc + g.pendingBalance, 0).toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-red-400">{pendingPaymentGuests.length} Guest</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Arrivals</span>
            <Clock className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">5</div>
          <span className="text-[10px] text-sky-400">Upcoming</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">VIP Guests</span>
            <Crown className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-lg font-bold font-mono text-amber-300">{vipGuests.length}</div>
          <span className="text-[10px] text-amber-300">Priority Stay</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Cleaning</span>
            <Brush className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">{cleaningRooms.length}</div>
          <span className="text-[10px] text-zinc-400">Rooms</span>
        </div>

        <div className="glass-card p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-medium">Maintenance</span>
            <Wrench className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">{maintenanceRooms.length}</div>
          <span className="text-[10px] text-zinc-400">Blocked</span>
        </div>
      </div>

      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 space-y-3">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Quick Actions (3 Clicks Maximum)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button 
            onClick={onOpenQuickBooking}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-indigo-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">+ New Booking</div>
            <div className="text-[10px] text-zinc-400">Advance or direct</div>
          </button>

          <button 
            onClick={onOpenQuickBooking}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Footprints className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">+ Walk In</div>
            <div className="text-[10px] text-zinc-400">Instant check-in</div>
          </button>

          <button 
            onClick={() => onSelectTab('rooms')}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-sky-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">Check In Guest</div>
            <div className="text-[10px] text-zinc-400">Scan Aadhaar / Phone</div>
          </button>

          <button 
            onClick={() => onSelectTab('rooms')}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-amber-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UserMinus className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">Check Out</div>
            <div className="text-[10px] text-zinc-400">Generate GST Bill</div>
          </button>

          <button 
            onClick={() => onSelectTab('rooms')}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-indigo-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Building className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">Assign Room</div>
            <div className="text-[10px] text-zinc-400">Visual drag & select</div>
          </button>

          <button 
            onClick={() => onSelectTab('finance')}
            className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 rounded-xl text-left transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-white">Receive Payment</div>
            <div className="text-[10px] text-zinc-400">Instant UPI Dynamic QR</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-400" />
              Currently Occupied Rooms ({occupiedRooms.length})
            </h3>
            <button onClick={() => onSelectTab('rooms')} className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              Visual Board <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {occupiedRooms.map(room => (
              <div 
                key={room.id}
                className="p-3 bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 rounded-xl flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 font-mono text-sm font-bold text-red-400 flex items-center justify-center">
                    {room.number}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      {room.currentGuest?.name}
                      {room.currentGuest?.isVIP && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">VIP</span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                      <span>{room.type}</span>
                      <span>•</span>
                      <span>Out: {room.checkOutTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onOpenCheckOut(room)}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xs font-medium text-white transition-colors"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              Pending Payment & Alerts
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Action Required</span>
          </div>

          <div className="space-y-2.5">
            {pendingPaymentGuests.map(guest => (
              <div key={guest.id} className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{guest.name}</div>
                  <div className="text-[11px] text-red-300">Pending Balance: ₹{guest.pendingBalance.toLocaleString('en-IN')}</div>
                </div>
                <button 
                  onClick={() => onOpenPayment(guest)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs text-white font-medium flex items-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  Collect UPI
                </button>
              </div>
            ))}

            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-200">Room 102 Cleaning in Progress</div>
                <div className="text-[11px] text-amber-300/80">Assigned housekeeper Suresh K. • Ready in 15 mins</div>
              </div>
              <button 
                onClick={() => onSelectTab('operations')}
                className="px-2.5 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs rounded-lg border border-amber-500/40"
              >
                Kanban
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
