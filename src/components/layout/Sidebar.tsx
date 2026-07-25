import React from 'react';
import { 
  LayoutDashboard, 
  Grid3X3, 
  Users, 
  IndianRupee, 
  Sparkles, 
  Settings, 
  Building2,
  Command,
  Brush,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import type { UserRole } from '../../hooks/useHotelStore';

export type ActiveTab = 'front-desk' | 'rooms' | 'guests' | 'finance' | 'operations' | 'owner-analytics' | 'admin-scopes' | 'ai-assistant' | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openCmdK: () => void;
  occupancyRate: number;
  todayRevenue: number;
  pendingPaymentCount: number;
  activeRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openCmdK,
  occupancyRate,
  todayRevenue,
  pendingPaymentCount,
  activeRole
}) => {
  const navItems = [
    { id: 'front-desk', label: 'Front Desk', icon: LayoutDashboard, badge: 'Heart' },
    { id: 'rooms', label: 'Rooms Board', icon: Grid3X3, badge: `${occupancyRate}%` },
    { id: 'guests', label: 'Guests 360°', icon: Users },
    { id: 'finance', label: 'Finance & UPI', icon: IndianRupee, badge: pendingPaymentCount > 0 ? `${pendingPaymentCount} Pending` : undefined },
    { id: 'operations', label: 'Housekeeping', icon: Brush },
    { id: 'owner-analytics', label: 'Owner Insights', icon: BarChart3, highlight: true },
    { id: 'admin-scopes', label: 'Staff Scopes Admin', icon: ShieldCheck, highlight: true },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 h-screen glass-panel flex flex-col justify-between border-r border-zinc-800/60 sticky top-0 z-30 select-none">
      <div>
        <div className="p-4 border-b border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                Ayushmaan <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-md border border-indigo-500/30">OS</span>
              </h1>
              <p className="text-[11px] text-zinc-400 font-medium">Hotel Operating System</p>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3">
          <button 
            onClick={openCmdK}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 text-xs text-zinc-400 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Command className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              <span>Ask AI / Quick Search</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">⌘K</kbd>
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive 
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold' 
                    : item.highlight 
                      ? 'text-indigo-400 hover:bg-indigo-950/30 hover:text-indigo-300' 
                      : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : item.highlight ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-zinc-800/60">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Grand Heritage Inn
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">{activeRole}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/50">
              <span className="text-[10px] text-zinc-500 block">Today's Rev</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">₹{todayRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/50">
              <span className="text-[10px] text-zinc-500 block">Occupancy</span>
              <span className="text-xs font-semibold text-indigo-300 font-mono">{occupancyRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
