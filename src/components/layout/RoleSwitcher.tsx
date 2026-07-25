import React from 'react';
import { 
  Crown, 
  Briefcase, 
  UserCheck, 
  Brush, 
  User, 
  Share2,
  Lock
} from 'lucide-react';
import type { UserRole } from '../../hooks/useHotelStore';
import type { StaffAccount } from '../../types/hotel';

interface RoleSwitcherProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentStaff: StaffAccount | null;
  onOpenShareModal: () => void;
  onOpenStaffLoginModal: () => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  activeRole,
  setActiveRole,
  currentStaff,
  onOpenShareModal,
  onOpenStaffLoginModal
}) => {
  const roles: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'owner', label: 'Owner View', icon: Crown, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'manager', label: 'Manager View', icon: Briefcase, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { id: 'receptionist', label: 'Reception Desk', icon: UserCheck, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
    { id: 'housekeeper', label: 'Cleaner App', icon: Brush, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'guest', label: 'Guest Portal', icon: User, color: 'text-zinc-300 bg-zinc-800 border-zinc-700' },
  ];

  return (
    <div className="bg-zinc-900/90 border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider hidden sm:inline">Active Scope Role:</span>
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive 
                    ? `${r.color} font-semibold shadow-sm border` 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {currentStaff && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">{currentStaff.name.split(' ')[0]}</span>
            <span className="text-[10px] font-mono text-zinc-500">({currentStaff.id})</span>
          </div>
        )}

        <button 
          onClick={onOpenStaffLoginModal}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold border border-zinc-700 flex items-center gap-1.5 transition-all"
        >
          <Lock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Staff PIN Login</span>
        </button>

        <button 
          onClick={onOpenShareModal}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Grant Access</span>
        </button>
      </div>
    </div>
  );
};
