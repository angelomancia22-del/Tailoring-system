import React from 'react';
import { StaffUser, ShopSettings } from '../types/tailoring';
import { 
  Scissors, 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Settings, 
  GraduationCap, 
  Plus, 
  UserCheck, 
  Shield, 
  MapPin 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: StaffUser;
  staffUsers: StaffUser[];
  onSwitchUser: (user: StaffUser) => void;
  settings: ShopSettings;
  onQuickNewOrder: () => void;
  onQuickNewCustomer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  staffUsers,
  onSwitchUser,
  settings,
  onQuickNewOrder,
  onQuickNewCustomer
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      {/* Top microbar for Barangay Bagong Bayan 1 identity */}
      <div className="bg-slate-950 px-4 py-1 text-[11px] text-slate-400 flex flex-wrap justify-between items-center border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">
            {settings.barangay}
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-slate-400 inline" />
            {settings.purok}
          </span>
        </div>

        {/* Current Active User / Access Control Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center">
            <Shield className="w-3 h-3 mr-1 text-emerald-400" /> Active Role:
          </span>
          <select
            value={currentUser.id}
            onChange={(e) => {
              const found = staffUsers.find(s => s.id === e.target.value);
              if (found) onSwitchUser(found);
            }}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-semibold rounded px-2 py-0.5 focus:outline-none focus:border-emerald-500"
          >
            {staffUsers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Brand identity */}
        <div 
          onClick={() => onTabChange('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/30 group-hover:scale-105 transition">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-sm sm:text-base tracking-tight text-white">
                COMM-BB1
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                TAILOR SYSTEM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide truncate max-w-[220px] sm:max-w-none">
              Barangay Bagong Bayan 1 Orders & Measurements
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Job Orders & Workshop', icon: ClipboardList },
            { id: 'customers', label: 'Customers & Measurements', icon: Users },
            { id: 'admin', label: 'Shop Admin & Security', icon: Settings },
            { id: 'evaluation', label: 'Study Evaluation', icon: GraduationCap },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center transition ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onQuickNewOrder}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center"
            title="Book new tailoring order"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">New Order</span>
          </button>
          
          <button
            onClick={onQuickNewCustomer}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-medium transition flex items-center"
            title="Register new customer and body measurements"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span className="hidden sm:inline">New Customer</span>
          </button>
        </div>

      </div>

      {/* Mobile Submenu Bar */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800 bg-slate-950/80 gap-1 text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'orders', label: 'Orders' },
          { id: 'customers', label: 'Customers' },
          { id: 'admin', label: 'Admin' },
          { id: 'evaluation', label: 'Evaluation' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
