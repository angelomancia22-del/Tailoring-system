import React, { useState, useEffect } from 'react';
import { Order, Customer, GarmentCategory, OrderStatus, PaymentMethod, PaymentStatus, StaffUser, ShopSettings } from '../types/tailoring';
import { MeasurementEditor } from './MeasurementEditor';
import { Scissors, DollarSign, Calendar, User, FileText, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface OrderModalProps {
  order: Order | null;
  customers: Customer[];
  staff: StaffUser[];
  settings: ShopSettings;
  isOpen: boolean;
  preselectedCustomer?: Customer | null;
  onClose: () => void;
  onSave: (savedOrder: Order) => void;
}

const GARMENT_TYPES: GarmentCategory[] = [
  'Barong Tagalog',
  'Polo Barong',
  'Formal Suit / Coat',
  'Slacks / Trousers',
  'School Uniform',
  'Barangay & Office Uniform',
  'Filipiniana / Terno',
  'Evening Gown / Dress',
  'Blouse & Skirt',
  'Alteration & Repair'
];

export const OrderModal: React.FC<OrderModalProps> = ({
  order,
  customers,
  staff,
  settings,
  isOpen,
  preselectedCustomer,
  onClose,
  onSave
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [garmentType, setGarmentType] = useState<GarmentCategory>('Barong Tagalog');
  const [quantity, setQuantity] = useState<number>(1);
  const [priority, setPriority] = useState<'Normal' | 'Rush' | 'High Priority'>('Normal');

  // Fabric details
  const [fabricSource, setFabricSource] = useState<'customer_provided' | 'shop_inventory'>('customer_provided');
  const [fabricName, setFabricName] = useState<string>('');
  const [fabricColorPattern, setFabricColorPattern] = useState<string>('');
  const [fabricYards, setFabricYards] = useState<string>('3.5 yards');
  const [fabricNotes, setFabricNotes] = useState<string>('');

  // Styling specs
  const [collarStyle, setCollarStyle] = useState<string>('Traditional Pointed');
  const [pocketStyle, setPocketStyle] = useState<string>('Single chest pocket');
  const [ventStyle, setVentStyle] = useState<string>('Side vents');
  const [liningStyle, setLiningStyle] = useState<string>('Half lined');
  const [embroideryDetail, setEmbroideryDetail] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Workflow & Dates
  const [assignedTailor, setAssignedTailor] = useState<string>('Mang Roberto \'Lito\' Santos');
  const [status, setStatus] = useState<OrderStatus>('Pending');
  const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [fittingDate, setFittingDate] = useState<string>('');
  const [promisedDeadline, setPromisedDeadline] = useState<string>('');

  // Financials
  const [totalLabor, setTotalLabor] = useState<number>(2500);
  const [fabricCost, setFabricCost] = useState<number>(0);
  const [additionalCost, setAdditionalCost] = useState<number>(0);
  const [downpayment, setDownpayment] = useState<number>(1500);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('GCash');
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  // Measurements
  const [orderMeasurements, setOrderMeasurements] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'details' | 'measurements' | 'billing'>('details');

  useEffect(() => {
    if (order) {
      setSelectedCustomerId(order.customerId);
      setGarmentType(order.garmentType);
      setQuantity(order.quantity);
      setPriority(order.priority);
      setFabricSource(order.fabricSource);
      setFabricName(order.fabricName);
      setFabricColorPattern(order.fabricColorPattern);
      setFabricYards(order.fabricYards);
      setFabricNotes(order.fabricNotes || '');
      setCollarStyle(order.collarStyle);
      setPocketStyle(order.pocketStyle);
      setVentStyle(order.ventStyle);
      setLiningStyle(order.liningStyle);
      setEmbroideryDetail(order.embroideryDetail || '');
      setSpecialInstructions(order.specialInstructions || '');
      setAssignedTailor(order.assignedTailor);
      setStatus(order.status);
      setOrderDate(order.orderDate);
      setFittingDate(order.fittingDate || '');
      setPromisedDeadline(order.promisedDeadline);
      setTotalLabor(order.totalLabor);
      setFabricCost(order.fabricCost);
      setAdditionalCost(order.additionalCost || 0);
      setDownpayment(order.downpayment);
      setPaymentMethod(order.paymentMethod);
      setReferenceNumber(order.referenceNumber || '');
      setOrderMeasurements(order.measurementsSnapshot);
    } else {
      // New order
      const initialCust = preselectedCustomer || (customers.length > 0 ? customers[0] : null);
      if (initialCust) {
        setSelectedCustomerId(initialCust.id);
        setOrderMeasurements(JSON.parse(JSON.stringify(initialCust.measurements)));
      }
      setGarmentType('Barong Tagalog');
      setQuantity(1);
      setPriority('Normal');
      setFabricSource('customer_provided');
      setFabricName('Piña Organza / Jusi');
      setFabricColorPattern('Natural Ecru');
      setFabricYards('3.5 yards');
      setFabricNotes('');
      setCollarStyle('Traditional Pointed Collar');
      setPocketStyle('None');
      setVentStyle('Side slits');
      setLiningStyle('Half-lined cotton');
      setEmbroideryDetail('Calado pechera embroidery');
      setSpecialInstructions('');
      setAssignedTailor(staff[0]?.name || 'Mang Roberto Santos');
      setStatus('Pending');
      const today = new Date();
      setOrderDate(today.toISOString().split('T')[0]);
      
      const fitDate = new Date();
      fitDate.setDate(today.getDate() + 5);
      setFittingDate(fitDate.toISOString().split('T')[0]);

      const deadDate = new Date();
      deadDate.setDate(today.getDate() + 10);
      setPromisedDeadline(deadDate.toISOString().split('T')[0]);

      setTotalLabor(2500);
      setFabricCost(0);
      setAdditionalCost(0);
      setDownpayment(1500);
      setPaymentMethod('GCash');
      setReferenceNumber('');
    }
    setActiveTab('details');
  }, [order, isOpen, preselectedCustomer, customers]);

  if (!isOpen) return null;

  const currentCustomer = customers.find(c => c.id === selectedCustomerId);

  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    const found = customers.find(c => c.id === custId);
    if (found && !order) {
      setOrderMeasurements(JSON.parse(JSON.stringify(found.measurements)));
    }
  };

  const handleGarmentTypeChange = (gt: GarmentCategory) => {
    setGarmentType(gt);
    // Intelligent defaults based on Filipino tailoring practices
    if (gt === 'Barong Tagalog') {
      setCollarStyle('Traditional Pointed Collar');
      setPocketStyle('No Pockets');
      setVentStyle('Side Vents');
      setTotalLabor(2800);
      setFabricName('Piña Organza / Jusi');
    } else if (gt === 'Polo Barong') {
      setCollarStyle('Mandarin Chinese Collar');
      setPocketStyle('Single Chest Pocket');
      setVentStyle('Side Vents with Triangles');
      setTotalLabor(1200);
      setFabricName('Peach Twill / Linen');
    } else if (gt === 'Slacks / Trousers') {
      setCollarStyle('N/A');
      setPocketStyle('Slant front, 2 welt back pockets');
      setVentStyle('N/A');
      setTotalLabor(900);
      setFabricName('Wool Gabardine / Tetoron');
    } else if (gt === 'Filipiniana / Terno') {
      setCollarStyle('Sweetheart Neckline with Butterfly Sleeves');
      setPocketStyle('Hidden Side Pockets');
      setVentStyle('Kick Pleat');
      setTotalLabor(3800);
      setFabricName('Duchess Satin with Organza overlay');
    } else if (gt === 'School Uniform') {
      setCollarStyle('Peter Pan / Standard Collar');
      setPocketStyle('Single Chest Pocket');
      setVentStyle('Straight Bottom');
      setTotalLabor(650);
      setFabricName('Peach Twill / Katol');
    } else if (gt === 'Alteration & Repair') {
      setCollarStyle('N/A');
      setPocketStyle('N/A');
      setVentStyle('N/A');
      setTotalLabor(300);
      setFabricName('Customer Garment for Alteration');
    }
  };

  const totalAmount = Number(totalLabor || 0) + Number(fabricCost || 0) + Number(additionalCost || 0);
  const balance = Math.max(0, totalAmount - Number(downpayment || 0));
  const paymentStatus: PaymentStatus = balance === 0 ? 'Paid' : downpayment > 0 ? 'Partial' : 'Unpaid';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCustomer) {
      alert('Please select a customer.');
      return;
    }

    const savedOrder: Order = {
      id: order ? order.id : `ord-${Date.now()}`,
      orderNumber: order ? order.orderNumber : `${settings.orderPrefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: currentCustomer.id,
      customerName: currentCustomer.fullName,
      customerPhone: currentCustomer.contactNumber,
      customerPurok: currentCustomer.purok,
      garmentType,
      quantity,
      priority,
      fabricSource,
      fabricName,
      fabricColorPattern,
      fabricYards,
      fabricNotes,
      collarStyle,
      pocketStyle,
      ventStyle,
      liningStyle,
      embroideryDetail,
      specialInstructions,
      measurementsSnapshot: orderMeasurements || currentCustomer.measurements,
      assignedTailor,
      status,
      orderDate,
      fittingDate: fittingDate || undefined,
      promisedDeadline,
      completedDate: status === 'Completed' ? new Date().toISOString().split('T')[0] : order?.completedDate,
      totalLabor: Number(totalLabor || 0),
      fabricCost: Number(fabricCost || 0),
      additionalCost: Number(additionalCost || 0),
      totalAmount,
      downpayment: Number(downpayment || 0),
      balance,
      paymentStatus,
      paymentMethod,
      referenceNumber: referenceNumber || undefined,
      history: order ? [
        ...order.history,
        {
          id: `h-${Date.now()}`,
          timestamp: new Date().toISOString(),
          stage: status,
          updatedBy: assignedTailor,
          notes: `Order updated. Status: ${status}. Balance: ${settings.currencySymbol}${balance.toLocaleString()}`
        }
      ] : [
        {
          id: `h-${Date.now()}`,
          timestamp: new Date().toISOString(),
          stage: status,
          updatedBy: assignedTailor,
          notes: `Job order booked. Downpayment ${settings.currencySymbol}${downpayment.toLocaleString()} via ${paymentMethod}.`
        }
      ],
      createdAt: order ? order.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(savedOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 rounded-lg text-emerald-700 dark:text-emerald-400">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {order ? `Edit Job Order: ${order.orderNumber}` : 'Create New Customer Tailoring Job Order'}
              </h3>
              <p className="text-xs text-slate-500">
                Barangay Bagong Bayan 1 Digital Order Tracking & Cutting Workflow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
              activeTab === 'details'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Scissors className="w-4 h-4 mr-1.5" />
            1. Garment & Fabric Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('measurements')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
              activeTab === 'measurements'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 mr-1.5" />
            2. Linked Measurements Snapshot
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
              activeTab === 'billing'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4 mr-1.5" />
            3. Pricing, Downpayment & Schedule
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Customer Selector */}
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-1 text-emerald-600" />
                  Select Registered Customer (Barangay Bagong Bayan 1):
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerSelect(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.purok}, Brgy Bagong Bayan 1) - Tel: {c.contactNumber}
                    </option>
                  ))}
                </select>
                {currentCustomer && (
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                    ✓ Attached Customer: {currentCustomer.fullName} • Measurements on file: {currentCustomer.measurements.unit}
                  </p>
                )}
              </div>

              {/* Garment Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Garment Category *
                  </label>
                  <select
                    value={garmentType}
                    onChange={(e) => handleGarmentTypeChange(e.target.value as GarmentCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    {GARMENT_TYPES.map((gt) => (
                      <option key={gt} value={gt}>{gt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Quantity (Piraso)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Fabric Specs */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Fabric & Materials Details
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Fabric Source
                    </label>
                    <select
                      value={fabricSource}
                      onChange={(e) => setFabricSource(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    >
                      <option value="customer_provided">Customer Provided (Dinala ng kostumer)</option>
                      <option value="shop_inventory">From Shop Stock (Tindahan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Fabric Name / Textile
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Piña Jusi, Ramie Linen, Peach Twill"
                      value={fabricName}
                      onChange={(e) => setFabricName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Color / Pattern & Yards
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cream Ecru (3.5 yards)"
                      value={fabricColorPattern}
                      onChange={(e) => setFabricColorPattern(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Design Customizations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Collar Style
                  </label>
                  <input
                    type="text"
                    value={collarStyle}
                    onChange={(e) => setCollarStyle(e.target.value)}
                    placeholder="e.g. Mandarin, Pointed"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pockets
                  </label>
                  <input
                    type="text"
                    value={pocketStyle}
                    onChange={(e) => setPocketStyle(e.target.value)}
                    placeholder="e.g. Single chest, None"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vents / Slits
                  </label>
                  <input
                    type="text"
                    value={ventStyle}
                    onChange={(e) => setVentStyle(e.target.value)}
                    placeholder="e.g. Side vents, None"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inner Lining
                  </label>
                  <input
                    type="text"
                    value={liningStyle}
                    onChange={(e) => setLiningStyle(e.target.value)}
                    placeholder="e.g. Half-lined, Full boning"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Embroidery & Special Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Embroidery / Applique Details
                  </label>
                  <input
                    type="text"
                    value={embroideryDetail}
                    onChange={(e) => setEmbroideryDetail(e.target.value)}
                    placeholder="e.g. Hand Calado embroidery pechera, floral corded lace"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Tailor Instructions & Fit Requests
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Give 1 inch allowance on waist; for wedding Nov 15"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Production Status & Assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Assigned Tailor / Sewer
                  </label>
                  <select
                    value={assignedTailor}
                    onChange={(e) => setAssignedTailor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    {staff.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Order Production Stage
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-emerald-700 dark:text-emerald-400"
                  >
                    <option value="Pending">1. Pending (Bagong Tanggap)</option>
                    <option value="Cutting">2. Cutting (Tinatabasan)</option>
                    <option value="Sewing">3. Sewing (Tinatahi)</option>
                    <option value="Fitting">4. Fitting (Isusukat)</option>
                    <option value="Finishing">5. Finishing / Pressing (Pinaplantsa)</option>
                    <option value="Ready for Pickup">6. Ready for Pickup (Handa nang kunin)</option>
                    <option value="Completed">7. Completed / Delivered (Nakuha na)</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Normal">Normal Priority</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Rush">Rush Order (Mabilisang Tahi)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <div>
              <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  Measurements attached to this specific job order. Any tweaks here won't overwrite the customer's permanent profile unless desired.
                </span>
                {currentCustomer && (
                  <button
                    type="button"
                    onClick={() => setOrderMeasurements(JSON.parse(JSON.stringify(currentCustomer.measurements)))}
                    className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium"
                  >
                    Reset from Customer Profile
                  </button>
                )}
              </div>
              {orderMeasurements && (
                <MeasurementEditor
                  measurements={orderMeasurements}
                  onChange={(updated) => setOrderMeasurements(updated)}
                />
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-4">
              {/* Dates */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-emerald-600" />
                  Important Dates & Deadlines (Brgy. Bagong Bayan 1)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Order Date Received
                    </label>
                    <input
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
                      Fitting Date (Trial Fit)
                    </label>
                    <input
                      type="date"
                      value={fittingDate}
                      onChange={(e) => setFittingDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-red-700 dark:text-red-400 font-bold mb-1">
                      Promised Pickup Deadline *
                    </label>
                    <input
                      type="date"
                      value={promisedDeadline}
                      onChange={(e) => setPromisedDeadline(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Cost Calculations */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-emerald-600" />
                  Financial Accounting & Downpayment Breakdown
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tailoring Labor Fee ({settings.currencySymbol}) *
                    </label>
                    <input
                      type="number"
                      value={totalLabor}
                      onChange={(e) => setTotalLabor(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Fabric & Material Cost ({settings.currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={fabricCost}
                      onChange={(e) => setFabricCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Rush Fee / Embellishments ({settings.currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={additionalCost}
                      onChange={(e) => setAdditionalCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Total and Balance highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Amount</span>
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {settings.currencySymbol}{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Downpayment Paid ({settings.currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={downpayment}
                      onChange={(e) => setDownpayment(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1 text-sm font-bold text-emerald-700 dark:text-emerald-400 rounded border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Remaining Balance</span>
                    <span className={`text-lg font-black ${balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {settings.currencySymbol}{balance.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Status: <strong>{paymentStatus}</strong>
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mode of Payment
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="Cash">Cash (Abot Kamay sa Tindahan)</option>
                      <option value="GCash">GCash Transfer ({settings.gcashNumber})</option>
                      <option value="Maya">Maya E-Wallet</option>
                      <option value="Bank Transfer">Bank Transfer (BDO / BPI / Landbank)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      OR / GCash Reference Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. GCASH-19827384 o Resibo #"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500">
            {order ? `Editing Job Order #${order.orderNumber}` : 'New job order will be saved to local database.'}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center transition"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Save Job Order & Financials
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
