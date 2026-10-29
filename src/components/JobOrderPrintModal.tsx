import React from 'react';
import { Order, ShopSettings } from '../types/tailoring';
import { Printer, X, Scissors, CheckCircle, Calendar, Phone, MapPin, Tag } from 'lucide-react';

interface JobOrderPrintModalProps {
  order: Order | null;
  settings: ShopSettings;
  onClose: () => void;
}

export const JobOrderPrintModal: React.FC<JobOrderPrintModalProps> = ({
  order,
  settings,
  onClose
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const m = order.measurementsSnapshot;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none print:w-full print:max-w-none text-slate-800 dark:text-slate-100">
        
        {/* Modal Top Action Bar (hidden during print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 print:hidden">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              Printable Job Order & Cutting Tag #{order.orderNumber}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center shadow-sm transition"
            >
              <Printer className="w-4 h-4 mr-1.5" /> Print Job Order Slip
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 print:p-6 bg-white text-slate-900 font-sans space-y-6">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-800 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  Tailor Work Order
                </span>
                <span className="text-xs text-slate-500 font-medium">Barangay Bagong Bayan 1 Digital System</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
                {settings.shopName}
              </h1>
              <p className="text-xs text-slate-600 flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500 inline" />
                {settings.purok}, {settings.barangay}, {settings.cityMunicipality} • Tel: {settings.contactNumber}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Order No.</span>
              <span className="text-xl font-black font-mono text-emerald-800 tracking-wider">
                {order.orderNumber}
              </span>
              <div className="mt-1">
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded uppercase ${
                  order.priority === 'Rush' ? 'bg-red-100 text-red-800 border border-red-300' :
                  order.priority === 'High Priority' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-slate-100 text-slate-800 border border-slate-300'
                }`}>
                  {order.priority} Job
                </span>
              </div>
            </div>
          </div>

          {/* Customer & Order Core Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div>
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Customer Details</p>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">{order.customerName}</h4>
              <p className="text-slate-700 flex items-center mt-1">
                <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" /> {order.customerPhone}
              </p>
              <p className="text-slate-700 flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {order.customerPurok}, Brgy Bagong Bayan 1
              </p>
            </div>
            <div className="border-l border-slate-200 pl-4 space-y-1">
              <p className="text-slate-500 font-medium uppercase text-[10px] tracking-wider">Production Schedule</p>
              <div className="flex justify-between">
                <span className="text-slate-600">Date Received:</span>
                <span className="font-semibold text-slate-900">{order.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fitting Date:</span>
                <span className="font-bold text-indigo-700">{order.fittingDate || 'To be scheduled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Promised Deadline:</span>
                <span className="font-bold text-red-700">{order.promisedDeadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Assigned Tailor:</span>
                <span className="font-semibold text-slate-900">{order.assignedTailor}</span>
              </div>
            </div>
          </div>

          {/* Garment & Fabric Specification */}
          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-emerald-400" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  Garment & Fabric Specifications
                </span>
              </div>
              <span className="bg-emerald-600 text-white font-bold text-[11px] px-2 py-0.5 rounded">
                Qty: {order.quantity} pc(s)
              </span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4 bg-white">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Garment Type</span>
                <span className="text-sm font-black text-slate-900">{order.garmentType}</span>
                <div className="mt-2">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Collar Style</span>
                  <span className="text-slate-800 font-medium">{order.collarStyle || 'Standard'}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Fabric Source & Name</span>
                <span className="text-slate-900 font-bold">
                  {order.fabricSource === 'customer_provided' ? 'Customer Fabric: ' : 'Shop Stock: '}
                  {order.fabricName}
                </span>
                <div className="mt-2">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Color / Pattern / Yards</span>
                  <span className="text-slate-800 font-medium">{order.fabricColorPattern} ({order.fabricYards})</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Pockets & Vents</span>
                <span className="text-slate-800 font-medium block">{order.pocketStyle || 'None'}</span>
                <span className="text-slate-800 font-medium block">{order.ventStyle || 'None'}</span>
                {order.embroideryDetail && (
                  <div className="mt-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Embroidery / Detail</span>
                    <span className="text-indigo-800 font-semibold">{order.embroideryDetail}</span>
                  </div>
                )}
              </div>
            </div>
            {order.specialInstructions && (
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-amber-900 text-xs">
                <span className="font-bold uppercase text-[10px] tracking-wide text-amber-800">Special Instructions / Fitting Notes: </span>
                {order.specialInstructions}
              </div>
            )}
          </div>

          {/* Measurements Matrix */}
          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Precision Body Measurements (Unit: {m.unit.toUpperCase()})
              </span>
              <span className="text-[11px] text-slate-500">
                Calibrated: {m.lastUpdated || 'Current'}
              </span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-6 bg-white">
              {/* Upper */}
              <div>
                <h5 className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider border-b pb-1 mb-2">
                  Upper Body (Barong/Polo/Blouse)
                </h5>
                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                  <span className="text-slate-500">Neck / Collar:</span>
                  <span className="font-bold text-slate-900">{m.upper.neckCollar ? `${m.upper.neckCollar}"` : '-'}</span>
                  <span className="text-slate-500">Shoulder Width:</span>
                  <span className="font-bold text-slate-900">{m.upper.shoulderWidth ? `${m.upper.shoulderWidth}"` : '-'}</span>
                  <span className="text-slate-500">Chest / Bust:</span>
                  <span className="font-bold text-slate-900">{m.upper.chestBust ? `${m.upper.chestBust}"` : '-'}</span>
                  <span className="text-slate-500">Front Length:</span>
                  <span className="font-bold text-slate-900">{m.upper.frontLength ? `${m.upper.frontLength}"` : '-'}</span>
                  <span className="text-slate-500">Back Length:</span>
                  <span className="font-bold text-slate-900">{m.upper.backLength ? `${m.upper.backLength}"` : '-'}</span>
                  <span className="text-slate-500">Sleeve Length:</span>
                  <span className="font-bold text-slate-900">{m.upper.sleeveLength ? `${m.upper.sleeveLength}"` : '-'}</span>
                  <span className="text-slate-500">Armhole:</span>
                  <span className="font-bold text-slate-900">{m.upper.armhole ? `${m.upper.armhole}"` : '-'}</span>
                  <span className="text-slate-500">Bicep / Braso:</span>
                  <span className="font-bold text-slate-900">{m.upper.bicep ? `${m.upper.bicep}"` : '-'}</span>
                  <span className="text-slate-500">Waist / Stomach:</span>
                  <span className="font-bold text-slate-900">{m.upper.waistStomach ? `${m.upper.waistStomach}"` : '-'}</span>
                  <span className="text-slate-500">Hem / Hip:</span>
                  <span className="font-bold text-slate-900">{m.upper.hipBottom ? `${m.upper.hipBottom}"` : '-'}</span>
                </div>
              </div>

              {/* Lower */}
              <div>
                <h5 className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider border-b pb-1 mb-2">
                  Lower Body (Slacks/Pants/Skirt)
                </h5>
                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                  <span className="text-slate-500">Pants Waist:</span>
                  <span className="font-bold text-slate-900">{m.lower.waist ? `${m.lower.waist}"` : '-'}</span>
                  <span className="text-slate-500">Seat / Full Hip:</span>
                  <span className="font-bold text-slate-900">{m.lower.seatHip ? `${m.lower.seatHip}"` : '-'}</span>
                  <span className="text-slate-500">Outseam:</span>
                  <span className="font-bold text-slate-900">{m.lower.outseamLength ? `${m.lower.outseamLength}"` : '-'}</span>
                  <span className="text-slate-500">Inseam:</span>
                  <span className="font-bold text-slate-900">{m.lower.inseamLength ? `${m.lower.inseamLength}"` : '-'}</span>
                  <span className="text-slate-500">Crotch / Tiro:</span>
                  <span className="font-bold text-slate-900">{m.lower.crotchRise ? `${m.lower.crotchRise}"` : '-'}</span>
                  <span className="text-slate-500">Thigh / Pata:</span>
                  <span className="font-bold text-slate-900">{m.lower.thigh ? `${m.lower.thigh}"` : '-'}</span>
                  <span className="text-slate-500">Knee:</span>
                  <span className="font-bold text-slate-900">{m.lower.knee ? `${m.lower.knee}"` : '-'}</span>
                  <span className="text-slate-500">Bottom Opening:</span>
                  <span className="font-bold text-slate-900">{m.lower.bottomCuff ? `${m.lower.bottomCuff}"` : '-'}</span>
                </div>
              </div>

              {/* Dress / Posture */}
              <div>
                <h5 className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider border-b pb-1 mb-2">
                  Gown / Filipiniana & Posture
                </h5>
                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                  <span className="text-slate-500">Shoulder to Apex:</span>
                  <span className="font-bold text-slate-900">{m.dress.bustHeight ? `${m.dress.bustHeight}"` : '-'}</span>
                  <span className="text-slate-500">Bust Distance:</span>
                  <span className="font-bold text-slate-900">{m.dress.bustDistance ? `${m.dress.bustDistance}"` : '-'}</span>
                  <span className="text-slate-500">Waist to Hem:</span>
                  <span className="font-bold text-slate-900">{m.dress.waistToFloorHem ? `${m.dress.waistToFloorHem}"` : '-'}</span>
                  <span className="text-slate-500">Sleeve Crown:</span>
                  <span className="font-bold text-slate-900">{m.dress.sleeveCrown ? `${m.dress.sleeveCrown}"` : '-'}</span>
                </div>
                {m.specialPostureNotes && (
                  <div className="mt-3 bg-slate-50 p-2 rounded border border-slate-200 text-[10px] text-slate-700">
                    <span className="font-bold block text-slate-900">Anatomical Notes:</span>
                    {m.specialPostureNotes}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financials & Payment Receipt */}
          <div className="grid grid-cols-2 gap-4 items-center border border-slate-300 rounded-lg p-4 text-xs bg-slate-50">
            <div>
              <p className="font-bold text-slate-900 uppercase text-[11px] mb-1">Billing Breakdown</p>
              <div className="space-y-0.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Tailoring Labor:</span>
                  <span>{settings.currencySymbol}{order.totalLabor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fabric & Materials:</span>
                  <span>{settings.currencySymbol}{order.fabricCost.toLocaleString()}</span>
                </div>
                {order.additionalCost > 0 && (
                  <div className="flex justify-between">
                    <span>Rush / Extra Embellishments:</span>
                    <span>{settings.currencySymbol}{order.additionalCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t">
                  <span>Total Amount:</span>
                  <span className="text-sm">{settings.currencySymbol}{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-l border-slate-200 pl-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-600">Downpayment Paid:</span>
                <span className="font-bold text-emerald-700">
                  {settings.currencySymbol}{order.downpayment.toLocaleString()} ({order.paymentMethod})
                </span>
              </div>
              {order.referenceNumber && (
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Receipt / Ref No:</span>
                  <span className="font-mono">{order.referenceNumber}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1 border-t">
                <span className="font-bold text-slate-800">Balance Due:</span>
                <span className={`text-base font-black ${order.balance > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {settings.currencySymbol}{order.balance.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 italic">
                *Balance must be settled prior to releasing the garment.
              </p>
            </div>
          </div>

          {/* Customer Tear-off Stub */}
          <div className="border-t-2 border-dashed border-slate-400 pt-4 mt-6">
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900 uppercase">Customer Claim Stub (Iabot sa Kostumer)</span>
                <p className="text-[11px] text-slate-600">
                  {settings.shopName} • Order #{order.orderNumber} • Customer: {order.customerName}
                </p>
                <p className="text-[10px] text-slate-500">
                  Target Deadline: <strong className="text-slate-900">{order.promisedDeadline}</strong> | Balance: <strong className="text-red-700">{settings.currencySymbol}{order.balance.toLocaleString()}</strong>
                </p>
              </div>
              <div className="text-right text-[11px]">
                <div className="w-36 border-b border-slate-800 mb-1"></div>
                <span className="text-slate-500">Tailor / Shop Representative</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-3">
              {settings.receiptFooterMessage}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
