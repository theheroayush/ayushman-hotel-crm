import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Shield, Share2, Crown, UserCheck, Brush } from 'lucide-react';
import type { UserRole } from '../../hooks/useHotelStore';

interface ShareAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
}

export const ShareAccessModal: React.FC<ShareAccessModalProps> = ({
  isOpen,
  onClose,
  currentRole: _currentRole
}) => {
  const [selectedRoleToShare, setSelectedRoleToShare] = useState<UserRole>('receptionist');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const accessUrl = `http://127.0.0.1:3000/?role=${selectedRoleToShare}&hotelId=grand-heritage`;

  const handleCopy = () => {
    navigator.clipboard.writeText(accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Grant Staff & Guest Access</h3>
              <p className="text-[11px] text-zinc-400">Share role-specific access links & QR codes without password headaches</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">Select Access Role to Grant</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setSelectedRoleToShare('receptionist')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3.5 transition-all ${
                  selectedRoleToShare === 'receptionist' ? 'bg-indigo-950/60 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <UserCheck className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="text-xs font-bold">Reception Desk</div>
                  <div className="text-[10px] text-zinc-400">Walk-ins, billing & check-in</div>
                </div>
              </button>

              <button 
                onClick={() => setSelectedRoleToShare('housekeeper')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3.5 transition-all ${
                  selectedRoleToShare === 'housekeeper' ? 'bg-indigo-950/60 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <Brush className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold">Housekeeper / Cleaner</div>
                  <div className="text-[10px] text-zinc-400">Mobile cleaning checklist</div>
                </div>
              </button>

              <button 
                onClick={() => setSelectedRoleToShare('owner')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3.5 transition-all ${
                  selectedRoleToShare === 'owner' ? 'bg-indigo-950/60 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-bold">Owner Access</div>
                  <div className="text-[10px] text-zinc-400">Fill rates, RevPAR & financials</div>
                </div>
              </button>

              <button 
                onClick={() => setSelectedRoleToShare('guest')}
                className={`p-3 rounded-xl border text-left flex items-center gap-3.5 transition-all ${
                  selectedRoleToShare === 'guest' ? 'bg-indigo-950/60 border-indigo-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <Shield className="w-4 h-4 text-zinc-300" />
                <div>
                  <div className="text-xs font-bold">Guest Portal Link</div>
                  <div className="text-[10px] text-zinc-400">Self check-in & digital key</div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 block">Shareable Access URL</label>
            <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
              <input 
                type="text" 
                readOnly 
                value={accessUrl}
                className="w-full bg-transparent text-xs text-indigo-300 font-mono focus:outline-none px-2"
              />
              <button 
                onClick={handleCopy}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Mobile QR Code Access</div>
              <div className="text-[10px] text-zinc-400">Scan with phone camera for direct mobile login</div>
            </div>
            <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center">
              <QrCode className="w-12 h-12 text-black" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
