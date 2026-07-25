import React from 'react';
import { X, CheckCircle2, QrCode, Printer, MessageSquare, Building, ShieldCheck } from 'lucide-react';
import type { Room } from '../../types/hotel';

interface BookingVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingRef: string;
    room: Room;
    guestName: string;
    phone: string;
    nights: number;
    paymentMode: string;
    totalAmount: number;
  } | null;
}

export const BookingVoucherModal: React.FC<BookingVoucherModalProps> = ({
  isOpen,
  onClose,
  bookingData
}) => {
  if (!isOpen || !bookingData) return null;

  const whatsappMessage = `Namaste ${bookingData.guestName} Ji! 🙏 Your booking at Grand Heritage Inn is CONFIRMED!\n\n📋 Booking Ref: ${bookingData.bookingRef}\n🏨 Room: ${bookingData.room.number} (${bookingData.room.type})\n🌙 Stay: ${bookingData.nights} Night(s)\n💰 Total Tariff Paid: ₹${bookingData.totalAmount.toLocaleString('en-IN')}\n\n📍 Navigate in Google Maps: https://maps.google.com/?q=Grand+Heritage+Inn`;

  const whatsappUrl = `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Digital Booking Confirmation Voucher</h3>
              <p className="text-[11px] text-zinc-400 font-mono">{bookingData.bookingRef}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 bg-zinc-950">
          <div className="p-4 bg-gradient-to-br from-indigo-950/60 via-zinc-900 to-zinc-900 rounded-2xl border border-indigo-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">Grand Heritage Inn</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                CONFIRMED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-500 block">Guest Name</span>
                <span className="text-xs font-bold text-white">{bookingData.guestName}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Phone</span>
                <span className="text-xs font-mono text-zinc-300">{bookingData.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Assigned Room</span>
                <span className="text-xs font-mono font-bold text-indigo-300">Room {bookingData.room.number}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Total Tariff</span>
                <span className="text-xs font-mono font-bold text-emerald-400">₹{bookingData.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 block font-mono">Digital Check-in Token</span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Ready at Front Desk
                </span>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-black" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-center"
          >
            <MessageSquare className="w-4 h-4" /> Send Confirmation on WhatsApp
          </a>

          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="w-1/2 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print Voucher
            </button>
            <button 
              onClick={onClose}
              className="w-1/2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
