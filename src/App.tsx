import React, { useState, useEffect } from 'react';
import { Customer, Order, StaffUser, ShopSettings, AuditLog, OrderStatus } from './types/tailoring';
import { 
  getStoredCustomers, 
  saveCustomers, 
  getStoredOrders, 
  saveOrders, 
  getStoredStaff, 
  saveStaff, 
  getStoredSettings, 
  saveSettings, 
  getStoredAuditLogs, 
  logAuditEvent,
  exportDatabaseBackup,
  exportOrdersCsv,
  resetToDefaultData
} from './services/storage';

import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CustomerList } from './components/CustomerList';
import { CustomerModal } from './components/CustomerModal';
import { OrderList } from './components/OrderList';
import { OrderModal } from './components/OrderModal';
import { JobOrderPrintModal } from './components/JobOrderPrintModal';
import { SmsNotificationModal } from './components/SmsNotificationModal';
import { ShopAdmin } from './components/ShopAdmin';
import { ResearchEvaluation } from './components/ResearchEvaluation';

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>(() => getStoredCustomers());
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(() => getStoredStaff());
  const [settings, setSettings] = useState<ShopSettings>(() => getStoredSettings());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStoredAuditLogs());
  const [currentUser, setCurrentUser] = useState<StaffUser>(() => staffUsers[0] || {
    id: 'staff-1',
    name: 'Mang Roberto Santos',
    role: 'Shop Owner / Admin',
    phone: '0917-845-2190',
    pin: '1234',
    isActive: true
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [preselectedCustomerForOrder, setPreselectedCustomerForOrder] = useState<Customer | null>(null);

  const [printOrder, setPrintOrder] = useState<Order | null>(null);
  const [smsOrder, setSmsOrder] = useState<Order | null>(null);

  // Sync to local storage
  const updateCustomers = (newCustomers: Customer[]) => {
    setCustomers(newCustomers);
    saveCustomers(newCustomers);
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveOrders(newOrders);
  };

  const refreshAuditLogs = () => {
    setAuditLogs(getStoredAuditLogs());
  };

  // --- Customer Handlers ---
  const handleOpenAddCustomer = () => {
    setEditingCustomer(null);
    setIsCustomerModalOpen(true);
  };

  const handleOpenEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleSaveCustomer = (savedCustomer: Customer) => {
    const exists = customers.some(c => c.id === savedCustomer.id);
    let updated: Customer[];
    if (exists) {
      updated = customers.map(c => c.id === savedCustomer.id ? savedCustomer : c);
      logAuditEvent('Customer Profile Updated', savedCustomer.fullName, `Updated contact/measurements for ${savedCustomer.purok}`, currentUser.name);
    } else {
      updated = [savedCustomer, ...customers];
      logAuditEvent('Customer Registered', savedCustomer.fullName, `New customer registered with measurements in ${savedCustomer.purok}`, currentUser.name);
    }
    updateCustomers(updated);
    setIsCustomerModalOpen(false);
    refreshAuditLogs();
  };

  const handleDeleteCustomer = (customerId: string) => {
    const target = customers.find(c => c.id === customerId);
    if (!target) return;
    if (confirm(`Are you sure you want to remove customer "${target.fullName}"?`)) {
      const updated = customers.filter(c => c.id !== customerId);
      updateCustomers(updated);
      logAuditEvent('Customer Deleted', target.fullName, 'Removed from database', currentUser.name);
      refreshAuditLogs();
    }
  };

  const handleCreateOrderForCustomer = (customer: Customer) => {
    setPreselectedCustomerForOrder(customer);
    setEditingOrder(null);
    setIsOrderModalOpen(true);
  };

  const handleViewCustomerMeasurements = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  // --- Order Handlers ---
  const handleOpenAddOrder = () => {
    setEditingOrder(null);
    setPreselectedCustomerForOrder(null);
    setIsOrderModalOpen(true);
  };

  const handleOpenEditOrder = (order: Order) => {
    setEditingOrder(order);
    setPreselectedCustomerForOrder(null);
    setIsOrderModalOpen(true);
  };

  const handleSaveOrder = (savedOrder: Order) => {
    const exists = orders.some(o => o.id === savedOrder.id);
    let updatedOrders: Order[];
    if (exists) {
      updatedOrders = orders.map(o => o.id === savedOrder.id ? savedOrder : o);
      logAuditEvent('Job Order Updated', `${savedOrder.orderNumber} (${savedOrder.customerName})`, `Stage: ${savedOrder.status}, Balance: ${settings.currencySymbol}${savedOrder.balance.toLocaleString()}`, currentUser.name);
    } else {
      updatedOrders = [savedOrder, ...orders];
      logAuditEvent('Job Order Created', `${savedOrder.orderNumber} (${savedOrder.customerName})`, `${savedOrder.garmentType}, Downpayment: ${settings.currencySymbol}${savedOrder.downpayment.toLocaleString()}`, currentUser.name);
      
      // Increment customer order count
      const updatedCusts = customers.map(c => {
        if (c.id === savedOrder.customerId) {
          return { ...c, totalOrdersCount: (c.totalOrdersCount || 0) + 1 };
        }
        return c;
      });
      updateCustomers(updatedCusts);
    }

    updateOrders(updatedOrders);
    setIsOrderModalOpen(false);
    refreshAuditLogs();
  };

  const handleDeleteOrder = (orderId: string) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;
    if (confirm(`Are you sure you want to cancel and delete Job Order #${target.orderNumber}?`)) {
      const updated = orders.filter(o => o.id !== orderId);
      updateOrders(updated);
      logAuditEvent('Job Order Removed', target.orderNumber, `Order for ${target.customerName} cancelled`, currentUser.name);
      refreshAuditLogs();
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          completedDate: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : o.completedDate,
          history: [
            ...o.history,
            {
              id: `h-${Date.now()}`,
              timestamp: new Date().toISOString(),
              stage: newStatus,
              updatedBy: currentUser.name,
              notes: `Stage advanced to ${newStatus}`
            }
          ]
        };
      }
      return o;
    });

    const target = orders.find(o => o.id === orderId);
    updateOrders(updated);
    if (target) {
      logAuditEvent('Order Stage Advanced', `${target.orderNumber} -> ${newStatus}`, `Updated by ${currentUser.name}`, currentUser.name);
      refreshAuditLogs();
    }
  };

  // --- Admin & Backup Handlers ---
  const handleSaveSettings = (newSettings: ShopSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    logAuditEvent('Shop Settings Updated', newSettings.shopName, 'Updated profile and contact information', currentUser.name);
    refreshAuditLogs();
  };

  const handleSaveStaff = (newStaff: StaffUser[]) => {
    setStaffUsers(newStaff);
    saveStaff(newStaff);
    logAuditEvent('Staff Access Modified', `${newStaff.length} staff records`, 'Role permissions updated', currentUser.name);
    refreshAuditLogs();
  };

  const handleRestoreBackup = (json: any) => {
    if (json.customers) updateCustomers(json.customers);
    if (json.orders) updateOrders(json.orders);
    if (json.staff) {
      setStaffUsers(json.staff);
      saveStaff(json.staff);
    }
    if (json.settings) {
      setSettings(json.settings);
      saveSettings(json.settings);
    }
    logAuditEvent('Database Restored', 'Full System Backup', 'Restored from JSON backup file', currentUser.name);
    refreshAuditLogs();
  };

  const handleResetData = () => {
    resetToDefaultData();
    setCustomers(getStoredCustomers());
    setOrders(getStoredOrders());
    setStaffUsers(getStoredStaff());
    setSettings(getStoredSettings());
    setAuditLogs(getStoredAuditLogs());
    alert('System reset to default seed data for Barangay Bagong Bayan 1.');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        currentUser={currentUser}
        staffUsers={staffUsers}
        onSwitchUser={(user) => setCurrentUser(user)}
        settings={settings}
        onQuickNewOrder={handleOpenAddOrder}
        onQuickNewCustomer={handleOpenAddCustomer}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            orders={orders}
            customers={customers}
            settings={settings}
            auditLogs={auditLogs}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onAddOrder={handleOpenAddOrder}
            onAddCustomer={handleOpenAddCustomer}
            onPrintOrder={(ord) => setPrintOrder(ord)}
            onSendSms={(ord) => setSmsOrder(ord)}
            onExportCsv={() => exportOrdersCsv(orders)}
            onExportBackup={exportDatabaseBackup}
          />
        )}

        {activeTab === 'orders' && (
          <OrderList
            orders={orders}
            settings={settings}
            onAddOrder={handleOpenAddOrder}
            onEditOrder={handleOpenEditOrder}
            onDeleteOrder={handleDeleteOrder}
            onPrintOrder={(ord) => setPrintOrder(ord)}
            onSendSms={(ord) => setSmsOrder(ord)}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === 'customers' && (
          <CustomerList
            customers={customers}
            onAddCustomer={handleOpenAddCustomer}
            onEditCustomer={handleOpenEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            onCreateOrderForCustomer={handleCreateOrderForCustomer}
            onViewCustomerMeasurements={handleViewCustomerMeasurements}
          />
        )}

        {activeTab === 'admin' && (
          <ShopAdmin
            settings={settings}
            staff={staffUsers}
            auditLogs={auditLogs}
            onSaveSettings={handleSaveSettings}
            onSaveStaff={handleSaveStaff}
            onExportBackup={exportDatabaseBackup}
            onExportCsv={() => exportOrdersCsv(orders)}
            onResetData={handleResetData}
            onRestoreBackup={handleRestoreBackup}
          />
        )}

        {activeTab === 'evaluation' && (
          <ResearchEvaluation />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4 text-xs mt-auto print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              COMM-BB1: Customer Order and Measurements Management System
            </p>
            <p className="text-[11px] text-slate-500">
              Tailoring & Dressmaking Shops of Barangay Bagong Bayan 1 • Empirical Capstone Implementation
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={() => setActiveTab('evaluation')}
              className="hover:text-emerald-400 transition"
            >
              Study Objectives
            </button>
            <button
              onClick={exportDatabaseBackup}
              className="hover:text-emerald-400 transition"
            >
              System Backup
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">
              Active: {currentUser.name} ({currentUser.role})
            </span>
          </div>
        </div>
      </footer>

      {/* Customer Modal */}
      <CustomerModal
        customer={editingCustomer}
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSave={handleSaveCustomer}
      />

      {/* Order Modal */}
      <OrderModal
        order={editingOrder}
        customers={customers}
        staff={staffUsers}
        settings={settings}
        isOpen={isOrderModalOpen}
        preselectedCustomer={preselectedCustomerForOrder}
        onClose={() => setIsOrderModalOpen(false)}
        onSave={handleSaveOrder}
      />

      {/* Printable Job Order Slip Modal */}
      <JobOrderPrintModal
        order={printOrder}
        settings={settings}
        onClose={() => setPrintOrder(null)}
      />

      {/* Customer SMS Notification Modal */}
      <SmsNotificationModal
        order={smsOrder}
        settings={settings}
        onClose={() => setSmsOrder(null)}
      />

    </div>
  );
}
