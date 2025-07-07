// Application constants and configuration
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer'
};

export const ITEM_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food & Beverages',
  'Health & Beauty',
  'Home & Garden',
  'Books & Media',
  'Sports & Outdoors',
  'Toys & Games',
  'Office Supplies',
  'Automotive',
  'Other'
];

export const ALERT_TYPES = {
  LOW_STOCK: 'low_stock',
  EXPIRY_WARNING: 'expiry_warning',
  EXPIRED: 'expired',
  TASK_ASSIGNED: 'task_assigned'
};

export const TASK_TYPES = {
  AUDIT: 'audit',
  REORDER: 'reorder',
  QUALITY_CHECK: 'quality_check',
  MAINTENANCE: 'maintenance'
};

export const STOCK_THRESHOLDS = {
  LOW_STOCK: 10,
  EXPIRY_WARNING_DAYS: 7
};

export const CHART_COLORS = {
  primary: '#3182CE',
  secondary: '#38B2AC',
  accent: '#ED8936',
  success: '#38A169',
  warning: '#D69E2E',
  error: '#E53E3E'
};