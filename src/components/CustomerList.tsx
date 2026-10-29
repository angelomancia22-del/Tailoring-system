import React, { useState, useMemo } from 'react';
import { Customer } from '../types/tailoring';
import { Search, UserPlus, Phone, MapPin, Ruler, ShoppingBag, Eye, Edit3, Trash2, Calendar, Filter } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  onAddCustomer: () => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
  onCreateOrderForCustomer: (customer: Customer) => void;
  onViewCustomerMeasurements: (customer: Customer) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onCreateOrderForCustomer,
  onViewCustomerMeasurements
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurok, setSelectedPurok] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchSearch =
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.nickname && c.nickname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.contactNumber.includes(searchTerm) ||
        c.customerCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPurok = selectedPurok === 'All' || c.purok === selectedPurok;
      const matchGender = genderFilter === 'All' || c.gender === genderFilter;

      return matchSearch && matchPurok && matchGender;
    });
  }, [customers, searchTerm, selectedPurok, genderFilter]);

  const puroks = ['All', 'Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6', 'Purok 7'];

  return (
    <div className="space-y-4">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-emerald-600" />
            Customer & Body Measurements Central Registry
          </h2>
          <p className="text-xs text-slate-500">
            Digitized customer directory for Barangay Bagong Bayan 1 tailoring clients ({customers.length} total profiles)
          </p>
        </div>
        <button
          onClick={onAddCustomer}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center shadow-sm transition"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          + Register Customer & Measurements
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, nickname, mobile number, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>

        <div className="sm:col-span-3 flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={selectedPurok}
            onChange={(e) => setSelectedPurok(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          >
            {puroks.map(p => (
              <option key={p} value={p}>{p === 'All' ? 'All Puroks (Bagong Bayan 1)' : p}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3 flex items-center space-x-1">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500 text-xs"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male Customers</option>
            <option value="Female">Female Customers</option>
          </select>
        </div>
      </div>

      {/* Customers List Cards */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
          <Ruler className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No customers found</p>
          <p className="text-xs text-slate-400 mt-1">Try searching a different name, phone, or change your Purok filter.</p>
          <button
            onClick={onAddCustomer}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
          >
            Register First Customer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((cust) => {
            const hasUpper = cust.measurements.upper.chestBust !== '';
            const hasLower = cust.measurements.lower.waist !== '';

            return (
              <div
                key={cust.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Code, Purok badge, gender */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {cust.customerCode}
                    </span>
                    <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                      {cust.purok}
                    </span>
                  </div>

                  {/* Name and nickname */}
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {cust.fullName}
                  </h3>
                  {cust.nickname && (
                    <p className="text-[11px] text-slate-500 italic">
                      "{cust.nickname}"
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-center">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
                      <span className="font-medium">{cust.contactNumber}</span>
                    </p>
                    <p className="flex items-start text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{cust.streetAddress || 'Brgy. Bagong Bayan 1'}</span>
                    </p>
                  </div>

                  {/* Measurement Snapshot Badges */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[11px]">
                    <div className="flex justify-between items-center text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center">
                        <Ruler className="w-3 h-3 mr-1 text-emerald-600" />
                        Measurements ({cust.measurements.unit})
                      </span>
                      <span className="text-[10px]">
                        {cust.measurements.lastUpdated || 'Saved'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                      <div>
                        Chest/Bust: <strong className="text-slate-900 dark:text-slate-100">{cust.measurements.upper.chestBust ? `${cust.measurements.upper.chestBust}"` : '-'}</strong>
                      </div>
                      <div>
                        Shoulder: <strong className="text-slate-900 dark:text-slate-100">{cust.measurements.upper.shoulderWidth ? `${cust.measurements.upper.shoulderWidth}"` : '-'}</strong>
                      </div>
                      <div>
                        Pants Waist: <strong className="text-slate-900 dark:text-slate-100">{cust.measurements.lower.waist ? `${cust.measurements.lower.waist}"` : '-'}</strong>
                      </div>
                      <div>
                        Length: <strong className="text-slate-900 dark:text-slate-100">{cust.measurements.upper.frontLength || cust.measurements.lower.outseamLength ? `${cust.measurements.upper.frontLength || cust.measurements.lower.outseamLength}"` : '-'}</strong>
                      </div>
                    </div>

                    {cust.measurements.specialPostureNotes && (
                      <p className="mt-1 text-[10px] text-amber-700 dark:text-amber-400 truncate">
                        • {cust.measurements.specialPostureNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => onViewCustomerMeasurements(cust)}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg flex items-center transition"
                    title="View & Edit Measurements"
                  >
                    <Ruler className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Measurements
                  </button>

                  <button
                    type="button"
                    onClick={() => onCreateOrderForCustomer(cust)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 rounded-lg flex items-center transition"
                    title="Start new tailoring order with saved measurements"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                    + Order
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => onEditCustomer(cust)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteCustomer(cust.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
