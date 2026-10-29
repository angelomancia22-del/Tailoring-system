import React from 'react';
import { Customer, Order, ShopSettings, AuditLog, OrderStatus } from '../types/tailoring';
import { 
  Scissors, 
  Ruler, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle, 
  ArrowUpRight, 
  Printer, 
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Download
} from 'lucide-react';

interface DashboardProps {
  orders: Order[];
  customers: Customer[];
  settings: ShopSettings;
  auditLogs: AuditLog[];
  onNavigateTab: (tab: string) => void;
  onAddOrder: () => void;
  onAddCustomer: () => void;
  onPrintOrder: (order: Order) => void;
  onSendSms: (order: Order) => void;
  onExportCsv: () => void;
  onExportBackup: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  orders,
  customers,
  settings,
  auditLogs,
  onNavigateTab,
  onAddOrder,
  onAddCustomer,
  onPrintOrder,
  onSendSms,
  onExportCsv,
  onExportBackup
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const activeOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const completedOrders = orders.filter(o => o.status === 'Completed');

  // Urgent orders: Overdue or due today
  const urgentOrders = orders.filter(o => {
    if (o.status === 'Completed' || o.status === 'Cancelled') return false;
    return o.promisedDeadline <= todayStr;
  });

  // Calculate total collectibles (balances) and total gross
  const totalCollectibles = activeOrders.reduce((sum, o) => sum + o.balance, 0);
  const totalRevenueAll = orders.reduce((sum, o) => sum + (o.totalAmount - o.balance), 0);

  // Group by stages
  const stageCounts: Record<OrderStatus, number> = {
    'Pending': 0,
    'Cutting': 0,
    'Sewing': 0,
    'Fitting': 0,
    'Finishing': 0,
    'Ready for Pickup': 0,
    'Completed': 0,
    'Cancelled': 0
  };
  orders.forEach(o => {
    if (stageCounts[o.status] !== undefined) {
      stageCounts[o.status]++;
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Scissors className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-600/80 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Barangay Bagong Bayan 1
              </span>
              <span className="text-slate-400 text-xs">Customer Order & Measurement Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {settings.shopName}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Centralized digital database replacing paper notebooks. Real-time body measurements, order lifecycles, fitting dates, and financial collections for local tailoring excellence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onAddOrder}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center"
            >
              <Scissors className="w-4 h-4 mr-1.5" /> + New Job Order
            </button>
            <button
              onClick={onAddCustomer}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold border border-slate-700 shadow-sm transition flex items-center"
            >
              <Ruler className="w-4 h-4 mr-1.5 text-emerald-400" /> + Customer & Measure
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Workshop Orders</span>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-105 transition">
              <Scissors className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {activeOrders.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">in production</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
            <span>{completedOrders.length} orders successfully completed</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </p>
        </div>

        {/* Urgent Deadlines */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadlines (Today/Overdue)</span>
            <div className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl group-hover:scale-105 transition">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className={`text-2xl font-black ${urgentOrders.length > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
              {urgentOrders.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">require priority action</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>Avoid missed promises & client delay</span>
          </p>
        </div>

        {/* Collectible Balances */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Balances</span>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-105 transition">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {settings.currencySymbol}{totalCollectibles.toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 flex items-center">
            <span>Collected to date: {settings.currencySymbol}{totalRevenueAll.toLocaleString()}</span>
          </p>
        </div>

        {/* Registered Customers */}
        <div 
          onClick={() => onNavigateTab('customers')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Brgy. BB1 Customers</span>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-105 transition">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {customers.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">registered clients</span>
          </div>
          <p className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 flex items-center font-medium">
            <span>100% digital measurements preserved</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </p>
        </div>

      </div>

      {/* Production Pipeline Overview Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
              <Scissors className="w-4 h-4 mr-2 text-emerald-600" />
              Live Workshop Production Pipeline (Brgy. Bagong Bayan 1)
            </h3>
            <p className="text-xs text-slate-500">
              Follow every garment from fabric cutting to sewing, trial fitting, and customer pickup
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center"
          >
            Open Kanban Board →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { stage: 'Pending' as OrderStatus, label: '1. Pending', count: stageCounts['Pending'], color: 'border-slate-300 bg-slate-50 dark:bg-slate-800/40' },
            { stage: 'Cutting' as OrderStatus, label: '2. Cutting', count: stageCounts['Cutting'], color: 'border-blue-300 bg-blue-50/60 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200' },
            { stage: 'Sewing' as OrderStatus, label: '3. Sewing', count: stageCounts['Sewing'], color: 'border-purple-300 bg-purple-50/60 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200' },
            { stage: 'Fitting' as OrderStatus, label: '4. Fitting', count: stageCounts['Fitting'], color: 'border-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-200' },
            { stage: 'Finishing' as OrderStatus, label: '5. Finishing', count: stageCounts['Finishing'], color: 'border-amber-300 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200' },
            { stage: 'Ready for Pickup' as OrderStatus, label: '6. Ready for Pickup', count: stageCounts['Ready for Pickup'], color: 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200' },
          ].map(item => (
            <div
              key={item.stage}
              onClick={() => onNavigateTab('orders')}
              className={`p-3 rounded-xl border ${item.color} cursor-pointer hover:shadow-sm transition flex flex-col justify-between`}
            >
              <span className="text-[11px] font-semibold block">{item.label}</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-black">{item.count}</span>
                <span className="text-[10px] text-slate-400">jobs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Urgent Orders & System Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Urgent Attention / Action Needed List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-red-500" />
                Deadlines Requiring Tailor Attention
              </h3>
              <p className="text-xs text-slate-500">Upcoming fittings and promised pickup dates</p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {urgentOrders.length} flagged
            </span>
          </div>

          <div className="space-y-3">
            {urgentOrders.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <CheckCircle className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
                All ongoing tailoring orders are on track and within schedule!
              </div>
            ) : (
              urgentOrders.map(order => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-red-700 dark:text-red-400 text-[11px]">
                        {order.orderNumber}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {order.customerName}
                      </span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                        {order.customerPurok}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      {order.garmentType} • Stage: <strong>{order.status}</strong> • Balance: <strong>{settings.currencySymbol}{order.balance.toLocaleString()}</strong>
                    </p>
                    <p className="text-red-700 dark:text-red-400 font-bold text-[11px] flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1 inline" />
                      Promised Deadline: {order.promisedDeadline}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onSendSms(order)}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1" /> SMS
                    </button>
                    <button
                      onClick={() => onPrintOrder(order)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                      title="Print Job Slip"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log & Security Trail */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
                Security & Audit Activity Trail
              </h3>
              <p className="text-xs text-slate-500">Record integrity & user actions</p>
            </div>
            <button
              onClick={() => onNavigateTab('admin')}
              className="text-[11px] text-emerald-600 hover:underline font-semibold"
            >
              Full Log →
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="text-xs border-b border-slate-100 dark:border-slate-800/60 pb-2.5 last:border-none last:pb-0">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{log.action}</span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 truncate">
                  {log.target}
                </p>
                <div className="flex justify-between items-center mt-1 text-[10px] text-slate-400">
                  <span>By: {log.userName}</span>
                  <span className="truncate max-w-[150px]">{log.details}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Backup Controls */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={onExportBackup}
              className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold flex items-center justify-center transition"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Backup JSON
            </button>
            <button
              onClick={onExportCsv}
              className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold flex items-center justify-center transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Export CSV
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
