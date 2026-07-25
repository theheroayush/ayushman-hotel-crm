import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  UserCheck, 
  Brush, 
  Crown, 
  Check, 
  X, 
  Briefcase
} from 'lucide-react';
import type { StaffAccount } from '../../types/hotel';
import type { PermissionScope } from '../../types/scopes';
import { ALL_SCOPES, ROLE_DEFAULT_SCOPES } from '../../types/scopes';

interface AdminStaffScopePanelProps {
  staffAccounts: StaffAccount[];
  onSaveStaffAccount: (staff: StaffAccount) => void;
  onDeleteStaffAccount?: (staffId: string) => void;
}

export const AdminStaffScopePanel: React.FC<AdminStaffScopePanelProps> = ({
  staffAccounts,
  onSaveStaffAccount
}) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffAccount | null>(null);

  const handleOpenAdd = () => {
    setEditingStaff({
      id: `STF-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      phone: '+91 ',
      roleTitle: 'Front Desk Receptionist',
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
      scopes: [...ROLE_DEFAULT_SCOPES.receptionist],
      active: true
    });
    setIsEditingModalOpen(true);
  };

  const handleOpenEdit = (staff: StaffAccount) => {
    setEditingStaff({ ...staff });
    setIsEditingModalOpen(true);
  };

  const handleApplyRoleTemplate = (roleKey: string) => {
    if (!editingStaff) return;
    const defaultScopes = ROLE_DEFAULT_SCOPES[roleKey] || [];
    setEditingStaff(prev => prev ? { ...prev, scopes: [...defaultScopes] } : null);
  };

  const handleToggleScope = (scopeId: PermissionScope) => {
    if (!editingStaff) return;
    const exists = editingStaff.scopes.includes(scopeId);
    const updated = exists 
      ? editingStaff.scopes.filter(s => s !== scopeId)
      : [...editingStaff.scopes, scopeId];
    setEditingStaff(prev => prev ? { ...prev, scopes: updated } : null);
  };

  const handleSave = () => {
    if (!editingStaff || !editingStaff.name.trim()) {
      alert("Please enter staff member's name.");
      return;
    }
    onSaveStaffAccount(editingStaff);
    setIsEditingModalOpen(false);
    setEditingStaff(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 p-5 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Admin Staff Scope & Permission Control</h2>
            <p className="text-xs text-zinc-400">Configure exact operational scopes per staff member with default role abilities.</p>
          </div>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffAccounts.map(staff => (
          <div 
            key={staff.id}
            className="p-4 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                  {staff.id}
                </span>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                  PIN: {staff.pin}
                </span>
              </div>

              <div className="text-sm font-bold text-white flex items-center gap-2">
                {staff.name}
              </div>
              <div className="text-xs text-zinc-400 font-medium">{staff.roleTitle}</div>
              <div className="text-[11px] font-mono text-zinc-500 mt-1">{staff.phone}</div>

              <div className="mt-3 pt-3 border-t border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
                  Granted Scopes ({staff.scopes.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {staff.scopes.map(sc => (
                    <span key={sc} className="text-[9px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
                      {sc.replace('SCOPE_', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleOpenEdit(staff)}
              className="w-full mt-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-medium border border-zinc-700 transition-colors"
            >
              Edit Scopes & Passcode
            </button>
          </div>
        ))}
      </div>

      {isEditingModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Staff Scope Permission Editor</h3>
                  <p className="text-[11px] text-zinc-400">{editingStaff.name || 'New Staff Account'} ({editingStaff.id})</p>
                </div>
              </div>
              <button onClick={() => setIsEditingModalOpen(false)} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">Full Name</label>
                  <input 
                    type="text" 
                    value={editingStaff.name} 
                    onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-zinc-950 text-xs text-white p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">Role Title</label>
                  <input 
                    type="text" 
                    value={editingStaff.roleTitle} 
                    onChange={(e) => setEditingStaff({ ...editingStaff, roleTitle: e.target.value })}
                    placeholder="e.g. Receptionist"
                    className="w-full bg-zinc-950 text-xs text-white p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">Phone Number</label>
                  <input 
                    type="text" 
                    value={editingStaff.phone} 
                    onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full bg-zinc-950 text-xs text-white p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300 block">4-Digit Access PIN</label>
                  <input 
                    type="text" 
                    maxLength={4}
                    value={editingStaff.pin} 
                    onChange={(e) => setEditingStaff({ ...editingStaff, pin: e.target.value })}
                    placeholder="1234"
                    className="w-full bg-zinc-950 text-xs text-white p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                <span className="text-[11px] font-semibold text-zinc-400 block">Pre-configured Role Templates:</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    type="button"
                    onClick={() => handleApplyRoleTemplate('housekeeper')}
                    className="px-2.5 py-1 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 rounded-lg text-xs border border-emerald-500/30 flex items-center gap-1"
                  >
                    <Brush className="w-3 h-3" /> Housekeeper Scope
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyRoleTemplate('receptionist')}
                    className="px-2.5 py-1 bg-sky-950/60 text-sky-300 hover:bg-sky-900/60 rounded-lg text-xs border border-sky-500/30 flex items-center gap-1"
                  >
                    <UserCheck className="w-3 h-3" /> Receptionist Scope
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyRoleTemplate('manager')}
                    className="px-2.5 py-1 bg-indigo-950/60 text-indigo-300 hover:bg-indigo-900/60 rounded-lg text-xs border border-indigo-500/30 flex items-center gap-1"
                  >
                    <Briefcase className="w-3 h-3" /> Manager Scope
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyRoleTemplate('owner')}
                    className="px-2.5 py-1 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 rounded-lg text-xs border border-amber-500/30 flex items-center gap-1"
                  >
                    <Crown className="w-3 h-3" /> Admin Full Access
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <span className="text-[11px] font-semibold text-zinc-300 block">Granular Permission Scopes:</span>
                <div className="space-y-1.5">
                  {ALL_SCOPES.map(sc => {
                    const isChecked = editingStaff.scopes.includes(sc.id);
                    return (
                      <label 
                        key={sc.id}
                        onClick={() => handleToggleScope(sc.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked ? 'bg-indigo-950/40 border-indigo-500/50 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold font-mono">{sc.label} ({sc.id})</div>
                          <div className="text-[10px] text-zinc-400">{sc.description}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-zinc-700 bg-zinc-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsEditingModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
              >
                Save Staff Scopes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
