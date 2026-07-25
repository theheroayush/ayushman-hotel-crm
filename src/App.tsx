import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import type { ActiveTab } from './components/layout/Sidebar';
import { RoleSwitcher } from './components/layout/RoleSwitcher';
import { ShareAccessModal } from './components/layout/ShareAccessModal';
import { StaffLoginModal } from './components/admin/StaffLoginModal';
import { AdminStaffScopePanel } from './components/admin/AdminStaffScopePanel';
import { AICommandBar } from './components/ai/AICommandBar';
import { FrontDeskModule } from './components/modules/FrontDeskModule';
import { VisualRoomsBoard } from './components/modules/VisualRoomsBoard';
import { QuickBookingModal } from './components/modules/QuickBookingModal';
import { BookingVoucherModal } from './components/booking/BookingVoucherModal';
import { GuestTimeline } from './components/modules/GuestTimeline';
import { FinanceModule } from './components/modules/FinanceModule';
import { HousekeepingKanban } from './components/modules/HousekeepingKanban';
import { OwnerAnalyticsModule } from './components/modules/OwnerAnalyticsModule';
import { CleanerMobileModule } from './components/modules/CleanerMobileModule';
import { AIAssistantModule } from './components/modules/AIAssistantModule';
import { WhatsAppSimulator } from './components/whatsapp/WhatsAppSimulator';
import { GSTInvoiceModal } from './components/finance/GSTInvoiceModal';

import { useHotelStore } from './hooks/useHotelStore';
import type { Room, Guest, Transaction, StaffAccount } from './types/hotel';

export function App() {
  const {
    hotelConfig,
    updateHotelConfig,
    staffAccounts,
    saveStaffAccount,
    currentStaff,
    setCurrentStaff,
    activeRole,
    setActiveRole,
    rooms,
    guests,
    transactions,
    tasks,
    updateRoomStatus,
    addBooking,
    updateTaskStage,
    resetDemoData
  } = useHotelStore();

  const [activeTab, setActiveTab] = useState<ActiveTab>('front-desk');
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | undefined>(undefined);
  
  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [activeVoucherData, setActiveVoucherData] = useState<any>(null);

  // WhatsApp & GST Modals
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppGuest, setWhatsAppGuest] = useState<Guest | null>(null);
  const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);
  const [activeGSTTx, setActiveGSTTx] = useState<Transaction | null>(null);

  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedCount / rooms.length) * 100);
  const todayRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const pendingPaymentCount = guests.filter(g => g.pendingBalance > 0).length;

  const handleCompleteBooking = (details: any) => {
    const result = addBooking(details);
    setActiveVoucherData({
      bookingRef: result.bookingRef,
      room: details.room,
      guestName: details.guestName,
      phone: details.phone,
      nights: details.nights,
      paymentMode: details.paymentMode,
      totalAmount: details.totalAmount
    });
    setIsVoucherOpen(true);
  };

  const handleStaffLoginSuccess = (staff: StaffAccount) => {
    setCurrentStaff(staff);
    if (staff.scopes.includes('SCOPE_HOUSEKEEPING_ONLY') && staff.scopes.length === 1) {
      setActiveRole('housekeeper');
    } else if (staff.scopes.includes('SCOPE_MANAGE_STAFF')) {
      setActiveRole('owner');
    } else {
      setActiveRole('receptionist');
    }
  };

  const handleSelectCmdKAction = (action: string) => {
    if (action === 'new-booking') {
      setIsQuickBookingOpen(true);
    } else if (action === 'whatsapp-trigger') {
      setIsWhatsAppOpen(true);
    } else if (action === 'view-room') {
      setActiveTab('rooms');
    } else if (action === 'view-guest') {
      setActiveTab('guests');
    } else if (action === 'ai-query') {
      setActiveTab('ai-assistant');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans antialiased">
      <RoleSwitcher 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentStaff={currentStaff}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenStaffLoginModal={() => setIsStaffLoginOpen(true)}
      />

      <div className="flex-1 flex">
        {activeRole !== 'housekeeper' && (
          <Sidebar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openCmdK={() => setIsCmdKOpen(true)}
            occupancyRate={occupancyRate}
            todayRevenue={todayRevenue}
            pendingPaymentCount={pendingPaymentCount}
            activeRole={activeRole}
          />
        )}

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto overflow-x-hidden w-full">
          {activeRole === 'housekeeper' ? (
            <CleanerMobileModule 
              tasks={tasks}
              onTaskStageChange={updateTaskStage}
            />
          ) : (
            <>
              {activeTab === 'front-desk' && (
                <FrontDeskModule 
                  rooms={rooms}
                  guests={guests}
                  onOpenQuickBooking={() => setIsQuickBookingOpen(true)}
                  onOpenCheckIn={(room) => {
                    setSelectedRoomForBooking(room);
                    setIsQuickBookingOpen(true);
                  }}
                  onOpenCheckOut={(room) => {
                    updateRoomStatus(room.id, 'cleaning');
                    alert(`Room ${room.number} Checked Out! Sent to Cleaning Kanban.`);
                  }}
                  onOpenPayment={(guest) => {
                    setWhatsAppGuest(guest);
                    setIsWhatsAppOpen(true);
                  }}
                  onSelectTab={setActiveTab}
                />
              )}

              {activeTab === 'rooms' && (
                <VisualRoomsBoard 
                  rooms={rooms}
                  onRoomStatusChange={updateRoomStatus}
                  onBookRoom={(room) => {
                    setSelectedRoomForBooking(room);
                    setIsQuickBookingOpen(true);
                  }}
                  onOpenCheckOut={(room) => {
                    updateRoomStatus(room.id, 'cleaning');
                    alert(`Room ${room.number} Checked Out! Sent to Cleaning Kanban.`);
                  }}
                />
              )}

              {activeTab === 'guests' && (
                <GuestTimeline 
                  guests={guests}
                  onOpenWhatsApp={(g) => {
                    setWhatsAppGuest(g);
                    setIsWhatsAppOpen(true);
                  }}
                />
              )}

              {activeTab === 'finance' && (
                <FinanceModule 
                  transactions={transactions}
                  todayRevenue={todayRevenue}
                  hotelConfig={hotelConfig}
                  onUpdateHotelConfig={updateHotelConfig}
                  onOpenGSTModal={(tx) => {
                    setActiveGSTTx(tx);
                    setIsGSTModalOpen(true);
                  }}
                />
              )}

              {activeTab === 'operations' && (
                <HousekeepingKanban 
                  tasks={tasks}
                  onTaskStageChange={updateTaskStage}
                />
              )}

              {activeTab === 'owner-analytics' && (
                <OwnerAnalyticsModule 
                  rooms={rooms}
                  transactions={transactions}
                  todayRevenue={todayRevenue}
                />
              )}

              {activeTab === 'admin-scopes' && (
                <AdminStaffScopePanel 
                  staffAccounts={staffAccounts}
                  onSaveStaffAccount={saveStaffAccount}
                />
              )}

              {activeTab === 'ai-assistant' && (
                <AIAssistantModule 
                  onTriggerWhatsApp={() => setIsWhatsAppOpen(true)}
                  onOpenQuickBooking={() => setIsQuickBookingOpen(true)}
                />
              )}

              {activeTab === 'settings' && (
                <div className="p-8 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Hotel Settings & Merchant UPI Config</h2>
                      <p className="text-xs text-zinc-400 mt-1">Configure Indian Hotel GSTIN, Merchant UPI VPA, Razorpay / PhonePe webhook keys & Staff RBAC permissions.</p>
                    </div>

                    <button 
                      onClick={() => {
                        if (confirm("Reset local persistent state to default sample data?")) {
                          resetDemoData();
                        }
                      }}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-semibold"
                    >
                      Reset Local Demo Data
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2 text-xs">
                      <div className="font-semibold text-emerald-400">✓ Merchant UPI VPA ID: {hotelConfig.upiVpa}</div>
                      <div className="text-zinc-400">Merchant Name: {hotelConfig.merchantName}</div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2 text-xs">
                      <div className="font-semibold text-indigo-400">✓ Admin Staff Scope Management</div>
                      <div className="text-zinc-400">{staffAccounts.length} Staff Accounts configured with 4-digit PINs.</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <ShareAccessModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentRole={activeRole}
      />

      <StaffLoginModal 
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        staffAccounts={staffAccounts}
        onLoginSuccess={handleStaffLoginSuccess}
      />

      <AICommandBar 
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        rooms={rooms}
        guests={guests}
        onSelectAction={handleSelectCmdKAction}
      />

      <QuickBookingModal 
        isOpen={isQuickBookingOpen}
        onClose={() => setIsQuickBookingOpen(false)}
        selectedRoom={selectedRoomForBooking}
        rooms={rooms}
        hotelConfig={hotelConfig}
        onCompleteBooking={handleCompleteBooking}
      />

      <BookingVoucherModal 
        isOpen={isVoucherOpen}
        onClose={() => setIsVoucherOpen(false)}
        bookingData={activeVoucherData}
      />

      <WhatsAppSimulator 
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        guest={whatsAppGuest}
      />

      <GSTInvoiceModal 
        isOpen={isGSTModalOpen}
        onClose={() => setIsGSTModalOpen(false)}
        transaction={activeGSTTx}
      />
    </div>
  );
}

export default App;
