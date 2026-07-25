import type { Room, Guest, Transaction, HousekeepingTask } from '../types/hotel';

export const MOCK_GUESTS: Guest[] = [
  {
    id: 'g-101',
    name: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@example.com',
    visits: 5,
    totalSpent: 42500,
    lastStay: '2026-06-12',
    preferredRoomType: 'Executive Suite',
    birthday: '14th Aug',
    isVIP: true,
    aadhaarVerified: true,
    pendingBalance: 0,
    notes: 'Requires extra pillows and hot water early morning. Prefers quiet corner rooms.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'g-102',
    name: 'Vikram Malhotra',
    phone: '+91 98200 11223',
    email: 'vikram.m@techcorp.in',
    visits: 2,
    totalSpent: 18400,
    lastStay: '2026-05-04',
    preferredRoomType: 'Deluxe Ocean View',
    isVIP: false,
    aadhaarVerified: true,
    pendingBalance: 1400,
    notes: 'Corporate billing for TechCorp. Needs GST invoice emailed.',
  },
  {
    id: 'g-103',
    name: 'Priyanka & Arjun Mehta',
    phone: '+91 99100 88776',
    email: 'mehta.arjun@gmail.com',
    visits: 1,
    totalSpent: 8400,
    lastStay: '2026-07-24',
    preferredRoomType: 'Standard King',
    isVIP: false,
    aadhaarVerified: true,
    pendingBalance: 0,
    notes: 'Honeymoon couple. Request welcome drinks.',
  },
  {
    id: 'g-104',
    name: 'Dr. Sunita Patel',
    phone: '+91 97411 22334',
    email: 'sunita.patel@aiims.edu',
    visits: 8,
    totalSpent: 76000,
    lastStay: '2026-07-01',
    preferredRoomType: 'Presidential Suite',
    isVIP: true,
    aadhaarVerified: true,
    pendingBalance: 0,
    notes: 'Prefers green tea, non-smoking floor.',
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r-101',
    number: '101',
    floor: 1,
    type: 'Executive Suite',
    pricePerNight: 4200,
    status: 'occupied',
    currentGuest: MOCK_GUESTS[0],
    checkInTime: 'Today, 02:00 PM',
    checkOutTime: 'Tomorrow, 11:00 AM',
  },
  {
    id: 'r-102',
    number: '102',
    floor: 1,
    type: 'Deluxe Ocean View',
    pricePerNight: 3500,
    status: 'cleaning',
    cleaningProgress: 75,
    readyInMinutes: 15,
    housekeeperAssigned: 'Suresh K.',
  },
  {
    id: 'r-103',
    number: '103',
    floor: 1,
    type: 'Standard King',
    pricePerNight: 2800,
    status: 'vacant',
  },
  {
    id: 'r-104',
    number: '104',
    floor: 1,
    type: 'Standard King',
    pricePerNight: 2800,
    status: 'maintenance',
    maintenanceNote: 'AC compressor unit check in progress',
  },
  {
    id: 'r-201',
    number: '201',
    floor: 2,
    type: 'Deluxe Ocean View',
    pricePerNight: 3500,
    status: 'occupied',
    currentGuest: MOCK_GUESTS[1],
    checkInTime: 'Yesterday, 06:30 PM',
    checkOutTime: 'Today, 12:00 PM',
  },
  {
    id: 'r-202',
    number: '202',
    floor: 2,
    type: 'Executive Suite',
    pricePerNight: 4500,
    status: 'vacant',
  },
  {
    id: 'r-203',
    number: '203',
    floor: 2,
    type: 'Presidential Suite',
    pricePerNight: 9500,
    status: 'occupied',
    currentGuest: MOCK_GUESTS[3],
    checkInTime: '24 Jul, 01:00 PM',
    checkOutTime: '28 Jul, 11:00 AM',
  },
  {
    id: 'r-204',
    number: '204',
    floor: 2,
    type: 'Standard King',
    pricePerNight: 2800,
    status: 'vacant',
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-901',
    date: '2026-07-24',
    time: '21:15',
    guestName: 'Rajesh Sharma',
    roomNumber: '101',
    amount: 4200,
    type: 'UPI',
    status: 'Success',
    gstInvoiceNumber: 'INV-2026-0891'
  },
  {
    id: 'tx-902',
    date: '2026-07-24',
    time: '18:40',
    guestName: 'Vikram Malhotra',
    roomNumber: '201',
    amount: 3500,
    type: 'Card',
    status: 'Success',
    gstInvoiceNumber: 'INV-2026-0890'
  },
  {
    id: 'tx-903',
    date: '2026-07-24',
    time: '14:20',
    guestName: 'Dr. Sunita Patel',
    roomNumber: '203',
    amount: 19000,
    type: 'UPI',
    status: 'Success',
    gstInvoiceNumber: 'INV-2026-0889'
  },
  {
    id: 'tx-904',
    date: '2026-07-24',
    time: '11:05',
    guestName: 'Walk-in Guest (Cash)',
    roomNumber: '103',
    amount: 2800,
    type: 'Cash',
    status: 'Success',
    gstInvoiceNumber: 'INV-2026-0888'
  }
];

export const INITIAL_TASKS: HousekeepingTask[] = [
  {
    id: 'hk-1',
    roomNumber: '102',
    housekeeperName: 'Suresh K.',
    stage: 'cleaning',
    priority: 'High',
    updatedAt: '10 mins ago'
  },
  {
    id: 'hk-2',
    roomNumber: '105',
    housekeeperName: 'Ramesh P.',
    stage: 'dirty',
    priority: 'VIP Urgent',
    updatedAt: '25 mins ago'
  },
  {
    id: 'hk-3',
    roomNumber: '205',
    housekeeperName: 'Sunil M.',
    stage: 'inspection',
    priority: 'Normal',
    updatedAt: '5 mins ago'
  },
  {
    id: 'hk-4',
    roomNumber: '202',
    housekeeperName: 'Suresh K.',
    stage: 'ready',
    priority: 'Normal',
    updatedAt: '1 hour ago'
  }
];
