import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import type { StaffAccount } from '../../types/hotel';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffAccounts: StaffAccount[];
  onLoginSuccess: (staff: StaffAccount) => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({
  isOpen,
  onClose,
  staffAccounts,
  onLoginSuccess
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleKeyPress = (num: string) => {
    if (pinInput.length < 4) {
      const next = pinInput + num;
      setPinInput(next);
      setErrorMsg(null);
      if (next.length === 4) {
        verifyPin(next);
      }
    }
  };

  const handleDelete = () => {
    setPinInput(prev => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const verifyPin = (pin: string) => {
    const match = staffAccounts.find(s => s.pin === pin && s.active);
    if (match) {
      onLoginSuccess(match);
      setPinInput('');
      setErrorMsg(null);
      onClose();
    } else {
      setErrorMsg('Invalid Staff PIN. Try 1111 (Cleaner), 2222 (Receptionist), or 9999 (Admin).');
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-white">Staff Scope Login</span>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4 bg-zinc-950">
          <div>
            <h3 className="text-sm font-bold text-white">Enter 4-Digit Staff PIN</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">Enforces active staff scopes across Ayushmaan OS</p>
          </div>

          <div className="flex justify-center items-center gap-3 py-2">
            {[0, 1, 2, 3].map((idx) => (
              <div 
                key={idx}
                className={`w-4 h-4 rounded-full border transition-all ${
                  pinInput.length > idx 
                    ? 'bg-indigo-500 border-indigo-400 shadow-md shadow-indigo-500/50' 
                    : 'bg-zinc-900 border-zinc-700'
                }`}
              ></div>
            ))}
          </div>

          {errorMsg && (
            <div className="text-[10px] text-red-400 font-mono bg-red-950/40 p-2 rounded-lg border border-red-500/30">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2.5 max-w-[220px] mx-auto pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="w-14 h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 border border-zinc-800 text-white font-mono text-lg font-bold transition-all shadow-sm"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={handleDelete}
              className="w-14 h-14 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 font-mono text-xs font-semibold flex items-center justify-center"
            >
              DEL
            </button>
            <button 
              onClick={() => handleKeyPress('0')}
              className="w-14 h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 border border-zinc-800 text-white font-mono text-lg font-bold transition-all shadow-sm"
            >
              0
            </button>
            <div className="w-14 h-14 flex items-center justify-center text-[10px] font-mono text-zinc-600">
              PIN
            </div>
          </div>

          <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800/80 text-[10px] text-zinc-400 text-left font-mono space-y-0.5">
            <div>💡 Default Test PINs:</div>
            <div>• Housekeeper: <span className="text-emerald-400 font-bold">1111</span></div>
            <div>• Receptionist: <span className="text-sky-400 font-bold">2222</span></div>
            <div>• Owner / Admin: <span className="text-amber-400 font-bold">9999</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
