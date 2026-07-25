import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Smartphone } from 'lucide-react';

interface RealUPIQRCodeProps {
  upiVpa: string;
  merchantName: string;
  amount: number;
  bookingRef: string;
}

export const RealUPIQRCode: React.FC<RealUPIQRCodeProps> = ({
  upiVpa,
  merchantName,
  amount,
  bookingRef
}) => {
  const [copied, setCopied] = useState(false);

  const cleanVpa = upiVpa || 'grandheritage@upi';
  const cleanMerchant = merchantName || 'Grand Heritage Inn';
  const upiUri = `upi://pay?pa=${encodeURIComponent(cleanVpa)}&pn=${encodeURIComponent(cleanMerchant)}&am=${amount}&tn=${encodeURIComponent(bookingRef)}&cu=INR`;

  const qrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiUri)}&size=200&margin=1`;

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(cleanVpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-zinc-950 rounded-2xl border border-emerald-500/30 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white text-xs">Merchant UPI Payment QR</span>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
          Real `upi://pay` URI
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
        <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
          <img 
            src={qrImageUrl} 
            alt="Merchant UPI QR Code" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="space-y-2 w-full">
          <div>
            <span className="text-[10px] text-zinc-500 block">Merchant Name</span>
            <span className="font-bold text-white text-sm">{cleanMerchant}</span>
          </div>

          <div>
            <span className="text-[10px] text-zinc-500 block">UPI VPA ID</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-emerald-400 font-semibold text-xs">{cleanVpa}</span>
              <button 
                onClick={handleCopyVpa}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                title="Copy VPA"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
            <span className="text-zinc-400">Total Payable:</span>
            <span className="font-mono font-extrabold text-emerald-400 text-sm">₹{amount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] text-zinc-400 font-semibold block">Tap to pay with mobile UPI app:</span>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={upiUri}
            className="p-2 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 rounded-xl text-[11px] font-bold text-indigo-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Open PhonePe / GPay
          </a>
          <a
            href={upiUri}
            className="p-2 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-xl text-[11px] font-bold text-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> Open BHIM / Paytm
          </a>
        </div>
      </div>
    </div>
  );
};
