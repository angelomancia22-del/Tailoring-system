import React, { useState, useEffect } from 'react';
import { Customer, CustomerMeasurements } from '../types/tailoring';
import { MeasurementEditor } from './MeasurementEditor';
import { User, Phone, MapPin, FileText, Check, X, Ruler } from 'lucide-react';

interface CustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedCustomer: Customer) => void;
}

const emptyMeasurements: CustomerMeasurements = {
  unit: 'inches',
  upper: {
    neckCollar: '',
    chestBust: '',
    shoulderWidth: '',
    frontLength: '',
    backLength: '',
    armhole: '',
    sleeveLength: '',
    bicep: '',
    wristCuff: '',
    waistStomach: '',
    hipBottom: ''
  },
  lower: {
    waist: '',
    highHip: '',
    seatHip: '',
    outseamLength: '',
    inseamLength: '',
    crotchRise: '',
    thigh: '',
    knee: '',
    bottomCuff: ''
  },
  dress: {
    bustHeight: '',
    bustDistance: '',
    shoulderToWaist: '',
    waistToFloorHem: '',
    sleeveCrown: '',
    backWidth: ''
  },
  specialPostureNotes: '',
  lastUpdated: new Date().toISOString().split('T')[0]
};

const PUROK_OPTIONS = [
  "Purok 1",
  "Purok 2",
  "Purok 3",
  "Purok 4",
  "Purok 5",
  "Purok 6",
  "Purok 7"
];

export const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    fullName: '',
    nickname: '',
    contactNumber: '',
    email: '',
    purok: 'Purok 1',
    streetAddress: '',
    barangay: 'Barangay Bagong Bayan 1',
    gender: 'Male',
    notes: '',
    measurements: emptyMeasurements
  });

  const [activeStep, setActiveStep] = useState<'profile' | 'measurements'>('profile');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        fullName: '',
        nickname: '',
        contactNumber: '',
        email: '',
        purok: 'Purok 1',
        streetAddress: '',
        barangay: 'Barangay Bagong Bayan 1',
        gender: 'Male',
        notes: '',
        measurements: JSON.parse(JSON.stringify(emptyMeasurements))
      });
    }
    setActiveStep('profile');
    setErrors({});
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName?.trim()) errs.fullName = 'Customer full name is required.';
    if (!formData.contactNumber?.trim()) errs.contactNumber = 'Contact phone number is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setActiveStep('profile');
      return;
    }

    const saved: Customer = {
      id: customer ? customer.id : `cust-${Date.now()}`,
      customerCode: customer ? customer.customerCode : `CUST-${Math.floor(100 + Math.random() * 900)}`,
      fullName: formData.fullName || '',
      nickname: formData.nickname || '',
      contactNumber: formData.contactNumber || '',
      email: formData.email || '',
      purok: formData.purok || 'Purok 1',
      streetAddress: formData.streetAddress || '',
      barangay: 'Barangay Bagong Bayan 1',
      gender: formData.gender as any || 'Male',
      notes: formData.notes || '',
      measurements: formData.measurements || emptyMeasurements,
      createdAt: customer ? customer.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalOrdersCount: customer ? customer.totalOrdersCount : 0
    };

    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {customer ? `Edit Customer Profile: ${customer.fullName}` : 'Register New Customer (Barangay Bagong Bayan 1)'}
            </h3>
            <p className="text-xs text-slate-500">
              {customer ? `Code: ${customer.customerCode} • Total Orders: ${customer.totalOrdersCount}` : 'Centralized database entry with persistent measurement recording'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6">
          <button
            type="button"
            onClick={() => setActiveStep('profile')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
              activeStep === 'profile'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 mr-1.5" />
            1. Personal Info & Barangay Address
          </button>
          <button
            type="button"
            onClick={() => setActiveStep('measurements')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
              activeStep === 'measurements'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Ruler className="w-4 h-4 mr-1.5" />
            2. Precision Body Measurements
            <span className="ml-2 px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded text-[10px]">
              Ready
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeStep === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Juan dela Cruz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 ${
                      errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } focus:outline-none focus:border-emerald-500`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nickname / Alias
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kuya Johnny"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="text"
                    placeholder="0917-000-0000"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 ${
                      errors.contactNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                    } focus:outline-none focus:border-emerald-500`}
                  />
                  {errors.contactNumber && <p className="text-[11px] text-red-500 mt-1">{errors.contactNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="juan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Male">Male (Lalaki)</option>
                    <option value="Female">Female (Babae)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Barangay Location */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Barangay Bagong Bayan 1 Residence Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Purok / Zone *
                    </label>
                    <select
                      value={formData.purok}
                      onChange={(e) => setFormData({ ...formData, purok: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                    >
                      {PUROK_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p} - Brgy. Bagong Bayan 1</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      House No. / Street / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 45 Mabini St. near Chapel"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Customer Preferences / Fit Notes / Remarks
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Prefers relaxed fit, wears Barong for Sunday church and barangay council sessions."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {activeStep === 'measurements' && (
            <MeasurementEditor
              measurements={formData.measurements || emptyMeasurements}
              onChange={(updated) => setFormData({ ...formData, measurements: updated })}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500">
            {activeStep === 'profile' ? (
              <span>Proceed to step 2 to record or view anatomical measurements.</span>
            ) : (
              <span>All measurements are securely saved and can be reused for future orders.</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeStep === 'profile' ? (
              <button
                type="button"
                onClick={() => {
                  if (validate()) setActiveStep('measurements');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
              >
                Next: Measurements →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveStep('profile')}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition"
              >
                ← Back to Profile
              </button>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg text-xs font-semibold shadow-sm flex items-center transition"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Save Customer & Measurements
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
