import React, { useState, useMemo } from 'react';
import { Order, OrderStatus, ShopSettings, PaymentStatus } from '../types/tailoring';
import { 
  Search, 
  Plus, 
  Printer, 
  MessageSquare, 
  Edit3, 
  Trash2, 
  Filter, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Scissors, 
  ArrowRight,
  Kanban,
  List
} from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  settings: ShopSettings;
  onAddOrder: () => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onPrintOrder: (order: Order) => void;
  onSendSms: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const STAGES: OrderStatus[] = [
  'Pending',
  'Cutting',
  'Sewing',
  'Fitting',
  'Finishing',
  'Ready for Pickup',
  'Completed'
];

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  settings,
  onAddOrder,
  onEditOrder,
  onDeleteOrder,
  onPrintOrder,
  onSendSms,
  onUpdateOrderStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('table');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.garmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.fabricName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerPhone.includes(searchTerm);

      const matchStatus = statusFilter === 'All' || o.status === statusFilter;
      const matchPayment = paymentFilter === 'All' || o.paymentStatus === paymentFilter;
      const matchPriority = priorityFilter === 'All' || o.priority === priorityFilter;

      return matchSearch && matchStatus && matchPayment && matchPriority;
    });
  }, [orders, searchTerm, statusFilter, paymentFilter, priorityFilter]);

  const getUrgencyBadge = (deadline: string, status: OrderStatus) => {
    if (status === 'Completed' || status === 'Cancelled') {
      return null;
    }
    if (deadline < todayStr) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300 dark:border-red-800 animate-pulse">
          <AlertTriangle className="w-3 h-3 mr-1" /> OVERDUE
        </span>
      );
    }
    if (deadline === todayStr) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <Clock className="w-3 h-3 mr-1" /> DUE TODAY
        </span>
      );
    }
    return null;
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
      case 'Cutting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'Sewing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300';
      case 'Fitting':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300';
      case 'Finishing':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'Ready for Pickup':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'Completed':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Scissors className="w-5 h-5 mr-2 text-emerald-600" />
            Tailoring Orders & Workshop Production Workflow
          </h2>
          <p className="text-xs text-slate-500">
            Monitor garment cutting, fitting dates, pickup deadlines, and balance collections ({orders.length} total orders)
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View toggle */}
          <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center transition ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4 mr-1" /> Table
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center transition ${
                viewMode === 'pipeline'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Workshop Kanban Pipeline"
            >
              <Kanban className="w-4 h-4 mr-1" /> Pipeline
            </button>
          </div>

          <button
            onClick={onAddOrder}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center shadow-sm transition"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            + New Tailoring Order
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search order #, customer name, phone, garment type, fabric..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          >
            <option value="All">All Production Stages</option>
            {STAGES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Fully Paid</option>
            <option value="Partial">Partial / With Balance</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          >
            <option value="All">All Priorities</option>
            <option value="Normal">Normal</option>
            <option value="High Priority">High Priority</option>
            <option value="Rush">Rush Order</option>
          </select>
        </div>
      </div>

      {/* Main View Mode: Pipeline Kanban OR Table */}
      {viewMode === 'pipeline' ? (
        /* Workshop Kanban Pipeline View */
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-3 min-w-[1100px]">
            {STAGES.map((stage) => {
              const stageOrders = filteredOrders.filter(o => o.status === stage);
              return (
                <div
                  key={stage}
                  className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex flex-col min-h-[500px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      {stage}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
                      {stageOrders.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                    {stageOrders.length === 0 ? (
                      <div className="h-28 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg">
                        Empty stage
                      </div>
                    ) : (
                      stageOrders.map(order => (
                        <div
                          key={order.id}
                          className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[11px] text-emerald-700 dark:text-emerald-400">
                              {order.orderNumber}
                            </span>
                            {getUrgencyBadge(order.promisedDeadline, order.status)}
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">
                              {order.customerName}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {order.garmentType} ({order.quantity} pc)
                            </p>
                          </div>

                          <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900/60 text-[10px] space-y-0.5">
                            <p className="text-slate-600 dark:text-slate-400">
                              Fabric: <strong className="text-slate-800 dark:text-slate-200">{order.fabricName}</strong>
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                              Target: <strong className="text-red-600 dark:text-red-400">{order.promisedDeadline}</strong>
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-700">
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {settings.currencySymbol}{order.totalAmount.toLocaleString()}
                            </span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              order.balance === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {order.balance === 0 ? 'Paid' : `Bal: ${settings.currencySymbol}${order.balance.toLocaleString()}`}
                            </span>
                          </div>

                          {/* Quick stage actions */}
                          <div className="flex items-center justify-between pt-1 gap-1">
                            <button
                              onClick={() => onPrintOrder(order)}
                              title="Print Job Slip"
                              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onSendSms(order)}
                              title="Send SMS"
                              className="p-1 text-slate-500 hover:text-emerald-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onEditOrder(order)}
                              title="Edit Details"
                              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Move to next stage button */}
                            {stage !== 'Completed' && (
                              <button
                                onClick={() => {
                                  const curIdx = STAGES.indexOf(stage);
                                  if (curIdx < STAGES.length - 1) {
                                    onUpdateOrderStatus(order.id, STAGES[curIdx + 1]);
                                  }
                                }}
                                title="Move to next stage"
                                className="ml-auto text-[10px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 rounded font-semibold flex items-center transition"
                              >
                                Advance <ArrowRight className="w-3 h-3 ml-0.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Detailed Table View */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Job Order #</th>
                  <th className="py-3 px-4">Customer & Purok</th>
                  <th className="py-3 px-4">Garment & Fabric</th>
                  <th className="py-3 px-4">Stage / Status</th>
                  <th className="py-3 px-4">Key Deadlines</th>
                  <th className="py-3 px-4">Financials & Balance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No tailoring orders match your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      
                      {/* Order Number & Priority */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                          {order.orderNumber}
                        </span>
                        <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded mt-0.5 ${
                          order.priority === 'Rush' ? 'bg-red-100 text-red-700' :
                          order.priority === 'High Priority' ? 'bg-amber-100 text-amber-700' :
                          'text-slate-500'
                        }`}>
                          {order.priority}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 dark:text-slate-100 block">
                          {order.customerName}
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          {order.customerPhone} • {order.customerPurok}
                        </span>
                      </td>

                      {/* Garment & Fabric */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 dark:text-slate-200 block">
                          {order.garmentType} ({order.quantity} pc)
                        </span>
                        <span className="text-[11px] text-slate-500 truncate block max-w-[200px]" title={order.fabricName}>
                          {order.fabricName}
                        </span>
                      </td>

                      {/* Stage Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg border ${getStatusColor(order.status)} focus:outline-none`}
                        >
                          {STAGES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Assigned: {order.assignedTailor.split(' ')[0]}
                        </span>
                      </td>

                      {/* Deadlines & Fitting */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {order.promisedDeadline}
                          </span>
                          {getUrgencyBadge(order.promisedDeadline, order.status)}
                        </div>
                        {order.fittingDate && (
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 block">
                            Fitting: {order.fittingDate}
                          </span>
                        )}
                      </td>

                      {/* Financials */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          {settings.currencySymbol}{order.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-[11px]">
                          {order.balance > 0 ? (
                            <span className="text-red-600 dark:text-red-400 font-semibold">
                              Bal: {settings.currencySymbol}{order.balance.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
                              <CheckCircle className="w-3 h-3 mr-0.5 inline" /> Fully Paid
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => onPrintOrder(order)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Print Work Order Slip & Fabric Tag"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onSendSms(order)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Customer SMS Notification"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onEditOrder(order)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Order"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteOrder(order.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
