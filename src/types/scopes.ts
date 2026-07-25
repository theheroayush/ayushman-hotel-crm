export type PermissionScope = 
  | 'SCOPE_FRONT_DESK_READ'
  | 'SCOPE_FRONT_DESK_WRITE'
  | 'SCOPE_COLLECT_PAYMENT'
  | 'SCOPE_VIEW_FINANCE'
  | 'SCOPE_VIEW_OWNER_ANALYTICS'
  | 'SCOPE_HOUSEKEEPING_ONLY'
  | 'SCOPE_GIVE_DISCOUNTS'
  | 'SCOPE_MANAGE_STAFF';

export const ALL_SCOPES: { id: PermissionScope; label: string; description: string }[] = [
  { id: 'SCOPE_FRONT_DESK_READ', label: 'View Front Desk', description: 'View check-ins, check-outs, and arrivals' },
  { id: 'SCOPE_FRONT_DESK_WRITE', label: 'Modify Front Desk', description: 'Create bookings, check in/out guests, assign rooms' },
  { id: 'SCOPE_COLLECT_PAYMENT', label: 'Collect Payments', description: 'Collect UPI/Cash and generate bills' },
  { id: 'SCOPE_VIEW_FINANCE', label: 'View Finance Ledgers', description: 'View daily revenue, GST invoices, export Tally data' },
  { id: 'SCOPE_VIEW_OWNER_ANALYTICS', label: 'Owner Insights', description: 'View RevPAR, ADR, and room fill-rate analytics' },
  { id: 'SCOPE_HOUSEKEEPING_ONLY', label: 'Housekeeping App', description: 'Restricted mobile cleaner checklist' },
  { id: 'SCOPE_GIVE_DISCOUNTS', label: 'Tariff Overrides', description: 'Apply dynamic discounts or tariff overrides' },
  { id: 'SCOPE_MANAGE_STAFF', label: 'Admin Staff Scopes', description: 'Create/edit staff accounts and grant scopes' },
];

export const ROLE_DEFAULT_SCOPES: Record<string, PermissionScope[]> = {
  housekeeper: [
    'SCOPE_HOUSEKEEPING_ONLY'
  ],
  receptionist: [
    'SCOPE_FRONT_DESK_READ',
    'SCOPE_FRONT_DESK_WRITE',
    'SCOPE_COLLECT_PAYMENT'
  ],
  accountant: [
    'SCOPE_VIEW_FINANCE',
    'SCOPE_COLLECT_PAYMENT'
  ],
  manager: [
    'SCOPE_FRONT_DESK_READ',
    'SCOPE_FRONT_DESK_WRITE',
    'SCOPE_COLLECT_PAYMENT',
    'SCOPE_VIEW_FINANCE',
    'SCOPE_GIVE_DISCOUNTS'
  ],
  owner: [
    'SCOPE_FRONT_DESK_READ',
    'SCOPE_FRONT_DESK_WRITE',
    'SCOPE_COLLECT_PAYMENT',
    'SCOPE_VIEW_FINANCE',
    'SCOPE_VIEW_OWNER_ANALYTICS',
    'SCOPE_GIVE_DISCOUNTS',
    'SCOPE_MANAGE_STAFF'
  ]
};
