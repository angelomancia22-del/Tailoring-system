import React, { useState } from 'react';
import { ShopSettings, StaffUser, AuditLog, StaffRole } from '../types/tailoring';
import { 
  ShieldCheck, 
  Store, 
  Users, 
  Download, 
  Upload, 
  Database, 
  FileSpreadsheet, 
  RotateCcw, 
  Check, 
  UserPlus, 
  Key, 
  Lock, 
  Activity,
  AlertOctagon,
  FileText
} from 'lucide-react';

interface ShopAdminProps {
  settings: ShopSettings;
  staff: StaffUser[];
  auditLogs: AuditLog[];
  onSaveSettings: (settings: ShopSettings) => void;
  onSaveStaff: (staff: StaffUser[]) => void;
  onExportBackup: () => void;
  onExportCsv: () => void;
  onResetData: () => void;
  onRestoreBackup: (jsonData: any) => void;
}

export const ShopAdmin: React.FC<ShopAdminProps> = ({
  settings,
  staff,
  auditLogs,
  onSaveSettings,
  onSaveStaff,
  onExportBackup,
  onExportCsv,
  onResetData,
  onRestoreBackup
}) => {
  const [formSettings, setFormSettings] = useState<ShopSettings>(settings);
  const [staffList, setStaffList] = useState<StaffUser[]>(staff);
  const [activeTab, setActiveTab] = useState<'shop' | 'staff' | 'security' | 'audit'>('shop');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New staff modal
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<StaffRole>('Master Tailor');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffPin, setNewStaffPin] = useState('1234');

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddStaffMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;

    const newStaff: StaffUser = {
      id: `staff-${Date.now()}`,
      name: newStaffName,
      role: newStaffRole,
      phone: newStaffPhone || '0900-000-0000',
      pin: newStaffPin || '1234',
      isActive: true
    };

    const updated = [...staffList, newStaff];
    setStaffList(updated);
    onSaveStaff(updated);
    setIsAddingStaff(false);
    setNewStaffName('');
    setNewStaffPhone('');
  };

  const handleToggleStaffActive = (staffId: string) => {
    const updated = staffList.map(s => s.id === staffId ? { ...s, isActive: !s.isActive } : s);
    setStaffList(updated);
    onSaveStaff(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.customers && json.orders) {
          onRestoreBackup(json);
          alert('Database restored successfully from backup!');
        } else {
          alert('Invalid backup file format. Please upload a valid COMM-BB1 backup file.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-emerald-600" />
            Shop Administration & Data Security Controls
          </h2>
          <p className="text-xs text-slate-500">
            Fulfills Study Objectives 3 & 4: Intuitive access control, Barangay Bagong Bayan 1 configuration, and anti-loss backup safeguards
          </p>
        </div>

        {/* Quick Backup button */}
        <button
          onClick={onExportBackup}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center shadow-sm transition"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export JSON Database Backup
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-2">
        <button
          onClick={() => setActiveTab('shop')}
          className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
            activeTab === 'shop'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Store className="w-4 h-4 mr-1.5" />
          1. Shop Profile & Barangay Info
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
            activeTab === 'staff'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4 mr-1.5" />
          2. User Access Control (RBAC)
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
            activeTab === 'security'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4 mr-1.5" />
          3. Backup & Record Preservation
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center transition ${
            activeTab === 'audit'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 mr-1.5" />
          4. Security Audit Log
        </button>
      </div>

      {/* Tab 1: Shop Settings */}
      {activeTab === 'shop' && (
        <form onSubmit={handleSettingsSubmit} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Tailoring Shop Profile & Receipt Customization
              </h3>
              <p className="text-xs text-slate-500">
                Appears on printed Job Order slips, fabric bundle tags, and SMS notifications sent to customers.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center animate-fade-in">
                <Check className="w-3.5 h-3.5 mr-1" /> Settings Saved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Shop Business Name
              </label>
              <input
                type="text"
                value={formSettings.shopName}
                onChange={(e) => setFormSettings({ ...formSettings, shopName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Barangay Jurisdiction
              </label>
              <input
                type="text"
                value={formSettings.barangay}
                onChange={(e) => setFormSettings({ ...formSettings, barangay: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Purok / Specific Location in BB1
              </label>
              <input
                type="text"
                value={formSettings.purok}
                onChange={(e) => setFormSettings({ ...formSettings, purok: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City / Municipality
              </label>
              <input
                type="text"
                value={formSettings.cityMunicipality}
                onChange={(e) => setFormSettings({ ...formSettings, cityMunicipality: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Shop Hotline / Mobile Number
              </label>
              <input
                type="text"
                value={formSettings.contactNumber}
                onChange={(e) => setFormSettings({ ...formSettings, contactNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GCash Downpayment Number
              </label>
              <input
                type="text"
                value={formSettings.gcashNumber}
                onChange={(e) => setFormSettings({ ...formSettings, gcashNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GCash Registered Account Name
              </label>
              <input
                type="text"
                value={formSettings.gcashAccountName}
                onChange={(e) => setFormSettings({ ...formSettings, gcashAccountName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Order Prefix Code
              </label>
              <input
                type="text"
                value={formSettings.orderPrefix}
                onChange={(e) => setFormSettings({ ...formSettings, orderPrefix: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formSettings.operatingHours}
                onChange={(e) => setFormSettings({ ...formSettings, operatingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Claim Stub Footer Message (Tagalog / English)
              </label>
              <textarea
                rows={2}
                value={formSettings.receiptFooterMessage}
                onChange={(e) => setFormSettings({ ...formSettings, receiptFooterMessage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center shadow-sm transition"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Save Shop Profile
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: User Access Control (RBAC) */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                  Role-Based User Access Control (Objective 4)
                </h3>
                <p className="text-xs text-slate-500">
                  Protects customer body measurements and sensitive shop financial data from unauthorized tampering
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingStaff(true)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg text-xs font-semibold flex items-center transition"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> + Add Staff Member
              </button>
            </div>

            {/* Add staff form modal / expander */}
            {isAddingStaff && (
              <form onSubmit={handleAddStaffMember} className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  Create Staff Account
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mang Danilo Cruz"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Assigned Role
                    </label>
                    <select
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value as StaffRole)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    >
                      <option value="Shop Owner / Admin">Shop Owner / Admin</option>
                      <option value="Master Tailor">Master Tailor</option>
                      <option value="Cutter & Sewer">Cutter & Sewer</option>
                      <option value="Front Desk & Reception">Front Desk & Reception</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="0917-xxx-xxxx"
                      value={newStaffPhone}
                      onChange={(e) => setNewStaffPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Security PIN (4-Digits)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={newStaffPin}
                      onChange={(e) => setNewStaffPin(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingStaff(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                  >
                    Save Staff Account
                  </button>
                </div>
              </form>
            )}

            {/* Staff Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Staff Name</th>
                    <th className="py-2.5 px-3">Assigned Role</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {staffList.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                        {member.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          member.role === 'Shop Owner / Admin' ? 'bg-amber-100 text-amber-800' :
                          member.role === 'Master Tailor' ? 'bg-emerald-100 text-emerald-800' :
                          member.role === 'Cutter & Sewer' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        {member.phone}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${member.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleStaffActive(member.id)}
                          className="text-[11px] text-slate-600 hover:text-emerald-600 underline font-medium"
                        >
                          {member.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Matrix Guide */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
              Role Permissions Matrix:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border">
                <span className="font-bold text-amber-700 block">Shop Owner / Admin</span>
                <p className="text-slate-500 mt-1">Full database export, financial balances, staff management, shop profile configuration.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border">
                <span className="font-bold text-emerald-700 block">Master Tailor</span>
                <p className="text-slate-500 mt-1">Calibrate & update body measurements, alter patterns, advance garment stages.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border">
                <span className="font-bold text-blue-700 block">Cutter & Sewer</span>
                <p className="text-slate-500 mt-1">View cutting specifications & measurements snapshot, mark sewing completion.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border">
                <span className="font-bold text-purple-700 block">Front Desk / Clerk</span>
                <p className="text-slate-500 mt-1">Book customer orders, record downpayment receipts, dispatch customer pickup SMS.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Backup & Record Preservation (Objective 4) */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
              <Database className="w-4 h-4 mr-2 text-emerald-600" />
              Centralized Data Preservation & Disaster Safeguards
            </h3>
            <p className="text-xs text-slate-500">
              Directly resolves the study's problem: "Paper records can easily be lost, damaged by moisture or pests, or filed incorrectly."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* JSON Export */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 w-fit rounded-lg mb-2">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Full System Backup (.JSON)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Downloads all customers, body measurements, job orders, and staff roles in a single encrypted JSON file for external safekeeping.
                </p>
              </div>
              <button
                onClick={onExportBackup}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center justify-center"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Backup
              </button>
            </div>

            {/* Restore from JSON */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 w-fit rounded-lg mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Restore from Backup File
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Recover lost records instantly if changing computers, tablets, or in the event of hardware failure.
                </p>
              </div>
              <label className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center justify-center cursor-pointer text-center">
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Select Backup File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* CSV Sales Export */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 w-fit rounded-lg mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Spreadsheet Report (.CSV)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Export orders, client names, balances, and deadlines directly for Microsoft Excel or Google Sheets accounting.
                </p>
              </div>
              <button
                onClick={onExportCsv}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center justify-center"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" /> Export Excel CSV
              </button>
            </div>

          </div>

          {/* Reset Demo Data Danger Zone */}
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-red-800 dark:text-red-300 flex items-center">
                <AlertOctagon className="w-4 h-4 mr-1.5" /> Reset to Initial Demonstration Data
              </span>
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">
                Restores the standard sample data for Barangay Bagong Bayan 1 (Kagawad Eddie, Sir Ramon, Tina Mendoza, etc.)
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data back to the default demonstration seed for Barangay Bagong Bayan 1?')) {
                  onResetData();
                }
              }}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center transition"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Sample Data
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Security Audit Activity Log */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-emerald-600" />
                System Activity & Security Audit Trail
              </h3>
              <p className="text-xs text-slate-500">
                Timestamped logging of who accessed or modified measurements, orders, and payment records
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {auditLogs.length} events logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Operator / User</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target Record</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                      {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {log.userName}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">
                      {log.target}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
