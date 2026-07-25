import React, { useState } from 'react';
import { 
  QrCode, 
  CreditCard, 
  Wallet, 
  FileText, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  Receipt,
  Settings,
  Check
} from 'lucide-react';
import type { Transaction, HotelConfig } from '../../types/hotel';

interface FinanceModuleProps {
  transactions: Transaction[];
  todayRevenue: number;
  hotelConfig: HotelConfig;
  onUpdateHotelConfig: (config: Partial<HotelConfig>) => void;
  onOpenGSTModal: (tx: Transaction) => void;
}

export const FinanceModule: React.FC<FinanceModuleProps> = ({
  transactions,
  todayRevenue,
  hotelConfig,
  onUpdateHotelConfig,
  onOpenGSTModal
}) => {
  const [upiVpaInput, setUpiVpaInput] = useState(hotelConfig.upiVpa);
  const [merchantInput, setMerchantInput] = useState(hotelConfig.merchantName);
  const [isSaved, setIsSaved] = useState(false);

  const upiTotal = transactions.filter(t => t.type === 'UPI').reduce((acc, t) => acc + t.amount, 0);
  const cashTotal = transactions.filter(t => t.type === 'Cash').reduce((acc, t) => acc + t.amount, 0);
  const cardTotal = transactions.filter(t => t.type === 'Card').reduce((acc, t) => acc + t.amount, 0);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHotelConfig({
      upiVpa: upiVpaInput,
      merchantName: merchantInput
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Finance & Merchant UPI Cockpit
          </h2>
          <p className="text-xs text-zinc-400">Zero accounting complexity. Immediate breakdown of Cash, UPI, Card, GST Invoices & Expenses.</p>
        </div>

        <button 
          onClick={() => alert("Generate GST Report for Tally export")}
          className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-400" /> Export Tally / GST JSON
        </button>
      </div>

      {/* Hotel Real UPI VPA Config Card */}
      <form onSubmit={handleSaveConfig} className="p-4 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Hotel Real Merchant UPI Configuration</h3>
            <p className="text-[11px] text-zinc-400">Generated QR codes will route instant payments directly to this VPA ID.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="text" 
            value={upiVpaInput}
            onChange={(e) => setUpiVpaInput(e.target.value)}
            placeholder="e.g. hotel@upi"
            className="bg-zinc-950 text-xs text-emerald-400 font-mono px-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-emerald-500 w-44"
          />
          <input 
            type="text" 
            value={merchantInput}
            onChange={(e) => setMerchantInput(e.target.value)}
            placeholder="Merchant Legal Name"
            className="bg-zinc-950 text-xs text-white px-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-emerald-500 w-48"
          />
          <button 
            type="submit"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-md"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            {isSaved ? 'Saved VPA!' : 'Save VPA'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
            <span>Today's Total Revenue</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">₹{todayRevenue.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-zinc-400 block">100% Reconciled for today</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-medium">
            <span className="flex items-center gap-1.5"><QrCode className="w-4 h-4" /> UPI Collections</span>
            <span className="text-[10px] font-mono bg-indigo-500/20 px-1.5 py-0.5 rounded">VPA: {hotelConfig.upiVpa}</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">₹{upiTotal.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-zinc-400">PhonePe / Google Pay QR</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
            <span className="flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Cash Counter</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">₹{cashTotal.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-zinc-400">In Reception Cash Drawer</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-sky-400 font-medium">
            <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> Card / POS</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">₹{cardTotal.toLocaleString('en-IN')}</div>
          <span className="text-[10px] text-zinc-400">Swipe Terminal</span>
        </div>
      </div>

      <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-400" />
            Today's GST Transactions & Receipts
          </h3>
          <span className="text-xs text-zinc-400 font-mono">12% / 18% GST Breakdown</span>
        </div>

        <div className="space-y-2">
          {transactions.map(tx => (
            <div 
              key={tx.id}
              className="p-3.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border ${
                  tx.type === 'UPI' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
                  tx.type === 'Cash' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-sky-500/20 text-sky-300 border-sky-500/30'
                }`}>
                  {tx.type}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    {tx.guestName}
                    <span className="text-[10px] font-mono text-zinc-400">Room {tx.roomNumber}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Invoice: {tx.gstInvoiceNumber} • {tx.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-emerald-400">₹{tx.amount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-emerald-400/80 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Paid & Settled
                  </div>
                </div>

                <button 
                  onClick={() => onOpenGSTModal(tx)}
                  className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" /> GST Bill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
