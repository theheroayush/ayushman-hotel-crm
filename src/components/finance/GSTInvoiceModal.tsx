import React from 'react';
import { X, Printer, Send, Building } from 'lucide-react';
import type { Transaction } from '../../types/hotel';

interface GSTInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const GSTInvoiceModal: React.FC<GSTInvoiceModalProps> = ({
  isOpen,
  onClose,
  transaction
}) => {
  if (!isOpen || !transaction) return null;

  const baseAmount = Math.round(transaction.amount / 1.12);
  const gstAmount = transaction.amount - baseAmount;
  const sgst = Math.round(gstAmount / 2);
  const cgst = gstAmount - sgst;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">GST Tax Invoice (Official)</h3>
              <p className="text-[11px] text-zinc-400 font-mono">{transaction.gstInvoiceNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 bg-zinc-950 font-sans text-xs">
          <div className="flex justify-between border-b border-zinc-800 pb-4">
            <div>
              <h4 className="font-bold text-white text-sm">Grand Heritage Inn Hotel</h4>
              <p className="text-zinc-400">GSTIN: 27AABCG1234H1Z5</p>
              <p className="text-zinc-400">SAC Code: 996311 (Hotel Lodging)</p>
              <p className="text-zinc-400">Beach Road, Bandra, Mumbai 400050</p>
            </div>
            <div className="text-right space-y-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                PAID VIA {transaction.type}
              </span>
              <p className="text-zinc-400">Date: {transaction.date}</p>
              <p className="text-zinc-400">Time: {transaction.time}</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Billed To:</span>
            <div className="font-bold text-white text-sm mt-0.5">{transaction.guestName}</div>
            <div className="text-zinc-400">Room Number: {transaction.roomNumber}</div>
          </div>

          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-semibold text-zinc-400">
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 text-right">Base Tariff</th>
                  <th className="p-2.5 text-right">CGST (6%)</th>
                  <th className="p-2.5 text-right">SGST (6%)</th>
                  <th className="p-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                <tr>
                  <td className="p-2.5">Hotel Room Accomodation (Room {transaction.roomNumber})</td>
                  <td className="p-2.5 text-right font-mono">₹{baseAmount.toLocaleString('en-IN')}</td>
                  <td className="p-2.5 text-right font-mono">₹{cgst.toLocaleString('en-IN')}</td>
                  <td className="p-2.5 text-right font-mono">₹{sgst.toLocaleString('en-IN')}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-white">₹{transaction.amount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
            <span className="text-emerald-300 font-medium">Grand Total (Incl. GST):</span>
            <span className="text-lg font-bold font-mono text-emerald-400">₹{transaction.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
          <button 
            onClick={() => alert("Sending PDF Invoice to WhatsApp...")}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Send PDF on WhatsApp
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Invoice
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
