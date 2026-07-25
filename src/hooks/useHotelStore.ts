import { useState, useEffect } from 'react';
import type { Room, Guest, Transaction, HousekeepingTask, RoomStatus, HotelConfig, StaffAccount } from '../types/hotel';
import type { PermissionScope } from '../types/scopes';
import { ROLE_DEFAULT_SCOPES } from '../types/scopes';
import { INITIAL_ROOMS, MOCK_GUESTS, INITIAL_TRANSACTIONS, INITIAL_TASKS } from '../data/mockData';

export type UserRole = 'owner' | 'manager' | 'receptionist' | 'housekeeper' | 'guest';

export const DEFAULT_HOTEL_CONFIG: HotelConfig = {
  hotelName: 'Grand Heritage Inn Hotel',
  upiVpa: 'grandheritage@upi',
  merchantName: 'Grand Heritage Inn Hospitality Pvt Ltd',
  gstin: '27AABCG1234H1Z5',
  address: 'Beach Road, Bandra West, Mumbai 400050',
  phone: '+91 98765 43210'
};

export const DEFAULT_STAFF_ACCOUNTS: StaffAccount[] = [
  {
    id: 'STF-101',
    name: 'Aman Varma (Admin / Owner)',
    phone: '+91 98765 43210',
    roleTitle: 'Hotel Owner & General Manager',
    pin: '9999',
    scopes: [...ROLE_DEFAULT_SCOPES.owner],
    active: true
  },
  {
    id: 'STF-102',
    name: 'Priya Nair (Front Desk Lead)',
    phone: '+91 98200 11223',
    roleTitle: 'Senior Receptionist',
    pin: '2222',
    scopes: [...ROLE_DEFAULT_SCOPES.receptionist],
    active: true
  },
  {
    id: 'STF-103',
    name: 'Suresh Kumar (Housekeeping)',
    phone: '+91 97411 22334',
    roleTitle: 'Housekeeper Staff',
    pin: '1111',
    scopes: [...ROLE_DEFAULT_SCOPES.housekeeper],
    active: true
  }
];

export function useHotelStore() {
  const [hotelConfig, setHotelConfig] = useState<HotelConfig>(() => {
    const saved = localStorage.getItem('ayushmaan_hotel_config');
    return saved ? JSON.parse(saved) : DEFAULT_HOTEL_CONFIG;
  });

  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>(() => {
    const saved = localStorage.getItem('ayushmaan_staff_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_STAFF_ACCOUNTS;
  });

  const [currentStaff, setCurrentStaff] = useState<StaffAccount | null>(() => {
    const saved = localStorage.getItem('ayushmaan_current_staff');
    return saved ? JSON.parse(saved) : DEFAULT_STAFF_ACCOUNTS[0];
  });

  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    return (localStorage.getItem('ayushmaan_role') as UserRole) || 'owner';
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('ayushmaan_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('ayushmaan_guests');
    return saved ? JSON.parse(saved) : MOCK_GUESTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ayushmaan_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [tasks, setTasks] = useState<HousekeepingTask[]>(() => {
    const saved = localStorage.getItem('ayushmaan_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // LocalStorage Persistence Sync
  useEffect(() => {
    localStorage.setItem('ayushmaan_hotel_config', JSON.stringify(hotelConfig));
  }, [hotelConfig]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_staff_accounts', JSON.stringify(staffAccounts));
  }, [staffAccounts]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_current_staff', JSON.stringify(currentStaff));
  }, [currentStaff]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ayushmaan_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Check Scope Utility
  const hasScope = (scope: PermissionScope): boolean => {
    if (activeRole === 'owner') return true;
    if (!currentStaff) return false;
    return currentStaff.scopes.includes(scope);
  };

  const updateHotelConfig = (newConfig: Partial<HotelConfig>) => {
    setHotelConfig(prev => ({ ...prev, ...newConfig }));
  };

  const saveStaffAccount = (staff: StaffAccount) => {
    setStaffAccounts(prev => {
      const idx = prev.findIndex(s => s.id === staff.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = staff;
        return copy;
      }
      return [...prev, staff];
    });
  };

  const updateRoomStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, status: newStatus } : r));
  };

  const addBooking = (details: {
    room: Room;
    guestName: string;
    phone: string;
    nights: number;
    paymentMode: 'UPI' | 'Cash' | 'Card';
    totalAmount: number;
  }) => {
    const bookingRef = `AYU-${Date.now().toString().slice(-4)}`;

    const existingGuest = guests.find(g => g.phone.includes(details.phone));
    const guestObj: Guest = existingGuest ? {
      ...existingGuest,
      visits: existingGuest.visits + 1,
      totalSpent: existingGuest.totalSpent + details.totalAmount,
      lastStay: '2026-07-24'
    } : {
      id: `g-${Date.now()}`,
      name: details.guestName,
      phone: details.phone,
      email: 'guest@hotel.in',
      visits: 1,
      totalSpent: details.totalAmount,
      lastStay: '2026-07-24',
      preferredRoomType: details.room.type,
      isVIP: false,
      aadhaarVerified: true,
      pendingBalance: 0
    };

    if (!existingGuest) {
      setGuests(prev => [guestObj, ...prev]);
    } else {
      setGuests(prev => prev.map(g => g.id === guestObj.id ? guestObj : g));
    }

    setRooms(prev => prev.map(r => {
      if (r.id === details.room.id) {
        return {
          ...r,
          status: 'occupied',
          currentGuest: guestObj,
          checkInTime: 'Just Now',
          checkOutTime: `${details.nights} Night(s) Stay`
        };
      }
      return r;
    }));

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: '2026-07-24',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      guestName: details.guestName,
      roomNumber: details.room.number,
      amount: details.totalAmount,
      type: details.paymentMode,
      status: 'Success',
      gstInvoiceNumber: `INV-2026-0${Math.floor(100 + Math.random() * 900)}`
    };
    setTransactions(prev => [newTx, ...prev]);

    return { bookingRef, guestObj, newTx };
  };

  const updateTaskStage = (taskId: string, newStage: 'dirty' | 'cleaning' | 'inspection' | 'ready') => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        if (newStage === 'ready') {
          setRooms(rPrev => rPrev.map(r => r.number === t.roomNumber ? { ...r, status: 'vacant' } : r));
        }
        return { ...t, stage: newStage, updatedAt: 'Just Now' };
      }
      return t;
    }));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setHotelConfig(DEFAULT_HOTEL_CONFIG);
    setStaffAccounts(DEFAULT_STAFF_ACCOUNTS);
    setCurrentStaff(DEFAULT_STAFF_ACCOUNTS[0]);
    setRooms(INITIAL_ROOMS);
    setGuests(MOCK_GUESTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setTasks(INITIAL_TASKS);
    setActiveRole('owner');
  };

  return {
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
    hasScope,
    updateRoomStatus,
    addBooking,
    updateTaskStage,
    resetDemoData
  };
}
