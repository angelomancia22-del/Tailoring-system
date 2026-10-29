import { Customer, Order, StaffUser, ShopSettings, AuditLog } from '../types/tailoring';
import { initialCustomers, initialOrders, initialStaffUsers, initialShopSettings, initialAuditLogs } from '../data/mockData';

const STORAGE_KEYS = {
  CUSTOMERS: 'comm_bb1_customers',
  ORDERS: 'comm_bb1_orders',
  STAFF: 'comm_bb1_staff',
  SETTINGS: 'comm_bb1_settings',
  AUDIT_LOGS: 'comm_bb1_audit_logs',
  ACTIVE_USER: 'comm_bb1_active_user'
};

export const getStoredCustomers = (): Customer[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : initialCustomers;
  } catch (e) {
    console.error('Failed to parse customers from storage', e);
    return initialCustomers;
  }
};

export const saveCustomers = (customers: Customer[]): void => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
};

export const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : initialOrders;
  } catch (e) {
    console.error('Failed to parse orders from storage', e);
    return initialOrders;
  }
};

export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getStoredStaff = (): StaffUser[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STAFF);
    return data ? JSON.parse(data) : initialStaffUsers;
  } catch (e) {
    return initialStaffUsers;
  }
};

export const saveStaff = (staff: StaffUser[]): void => {
  localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
};

export const getStoredSettings = (): ShopSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : initialShopSettings;
  } catch (e) {
    return initialShopSettings;
  }
};

export const saveSettings = (settings: ShopSettings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getStoredAuditLogs = (): AuditLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return data ? JSON.parse(data) : initialAuditLogs;
  } catch (e) {
    return initialAuditLogs;
  }
};

export const logAuditEvent = (action: string, target: string, details: string, userName: string = 'Master Tailor'): void => {
  const currentLogs = getStoredAuditLogs();
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userName,
    action,
    target,
    details
  };
  const updated = [newLog, ...currentLogs].slice(0, 100);
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
};

export const exportDatabaseBackup = () => {
  const backupData = {
    app: "Customer Order and Measurements Management System - Barangay Bagong Bayan 1",
    exportedAt: new Date().toISOString(),
    version: "1.0.0",
    settings: getStoredSettings(),
    customers: getStoredCustomers(),
    orders: getStoredOrders(),
    staff: getStoredStaff(),
    auditLogs: getStoredAuditLogs()
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonString);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute("download", `COMM_BB1_Backup_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportOrdersCsv = (orders: Order[]) => {
  const headers = [
    "Order Number",
    "Customer Name",
    "Phone",
    "Purok",
    "Garment Type",
    "Status",
    "Order Date",
    "Deadline",
    "Total Labor",
    "Total Amount",
    "Downpayment",
    "Balance",
    "Payment Status",
    "Payment Method",
    "Assigned Tailor"
  ];

  const rows = orders.map(o => [
    `"${o.orderNumber}"`,
    `"${o.customerName}"`,
    `"${o.customerPhone}"`,
    `"${o.customerPurok}"`,
    `"${o.garmentType}"`,
    `"${o.status}"`,
    `"${o.orderDate}"`,
    `"${o.promisedDeadline}"`,
    o.totalLabor,
    o.totalAmount,
    o.downpayment,
    o.balance,
    `"${o.paymentStatus}"`,
    `"${o.paymentMethod}"`,
    `"${o.assignedTailor}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `COMM_BB1_Orders_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const resetToDefaultData = () => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(initialCustomers));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders));
  localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(initialStaffUsers));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialShopSettings));
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
};
