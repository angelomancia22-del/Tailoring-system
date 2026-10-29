import React, { useState } from 'react';
import { Order, ShopSettings } from '../types/tailoring';
import { MessageSquare, Copy, Check, Send, X, Phone } from 'lucide-react';

interface SmsNotificationModalProps {
  order: Order | null;
  settings: ShopSettings;
  onClose: () => void;
}

export const SmsNotificationModal: React.FC<SmsNotificationModalProps> = ({
  order,
  settings,
  onClose
}) => {
  if (!order) return null;

  const [templateType, setTemplateType] = useState<'fitting' | 'ready' | 'received' | 'balance'>('ready');
  const [copied, setCopied] = useState(false);

  const getMessageContent = () => {
    if (templateType === 'fitting') {
      return `Magandang araw po ${order.customerName}!\n\nIto po ay paalala mula sa ${settings.shopName} sa Brgy. Bagong Bayan 1 para sa inyong Job Order #${order.orderNumber} (${order.garmentType}).\n\nNakatakda po ang inyong FIRST FITTING sa:\nPetsa: ${order.fittingDate || 'Bukas'}\nOras: ${settings.operatingHours}\n\nMaaari po kayong pumunta sa aming shop sa ${settings.purok}. Kung may tanong o nais i-reschedule, tumawag lamang sa ${settings.contactNumber}. Maraming salamat po!`;
    }

    if (templateType === 'ready') {
      return `Magandang araw po ${order.customerName}!\n\nHanda na po para sa PICKUP ang inyong ${order.garmentType} (Job Order #${order.orderNumber}) dito sa ${settings.shopName}, ${settings.purok}, Brgy. Bagong Bayan 1.\n\nDetalye:\n- Bilang: ${order.quantity} pc(s)\n- Natitirang Balanse: ${settings.currencySymbol}${order.balance.toLocaleString()}\n- GCash: ${settings.gcashNumber} (${settings.gcashAccountName})\n\nMaaari po itong kunin tuwing ${settings.operatingHours}. Paki-dala po ang inyong Job Order slip. Salamat po sa inyong tiwala!`;
    }

    if (templateType === 'received') {
      return `Magandang araw po ${order.customerName}!\n\nKumpirmado na po ang inyong order para sa ${order.garmentType} (Job Order #${order.orderNumber}) sa ${settings.shopName}.\n\n- Paunang Bayad (Downpayment): ${settings.currencySymbol}${order.downpayment.toLocaleString()} (${order.paymentMethod})\n- Natitirang Balanse: ${settings.currencySymbol}${order.balance.toLocaleString()}\n- Target Deadline: ${order.promisedDeadline}\n\nIte-text po namin kayo para sa inyong fitting schedule. Maraming salamat po!`;
    }

    return `Magandang araw po ${order.customerName}!\n\nMagiliw na paalala lamang po mula sa ${settings.shopName} ukol sa natitirang balanse na ${settings.currencySymbol}${order.balance.toLocaleString()} para sa inyong ${order.garmentType} (Order #${order.orderNumber}).\n\nMaaari pong magbayad via GCash sa ${settings.gcashNumber} o pumunta sa shop sa Brgy. Bagong Bayan 1. Salamat po!`;
  };

  const messageText = getMessageContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSmsLink = () => {
    const encodedBody = encodeURIComponent(messageText);
    window.location.href = `sms:${order.customerPhone}?body=${encodedBody}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-700 dark:text-emerald-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Customer SMS & Notification Dispatch
              </h3>
              <p className="text-xs text-slate-500">
                Direct SMS / Messaging to: <strong className="text-emerald-700 dark:text-emerald-400">{order.customerName} ({order.customerPhone})</strong>
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

        {/* Template Selectors */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Select Message Scenario (Tagalog / Filipino Tailoring Format):
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTemplateType('ready')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  templateType === 'ready'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                🎉 1. Ready for Pickup
                <span className="block text-[10px] opacity-70 font-normal">Inform customer garment is finished</span>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('fitting')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  templateType === 'fitting'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                ✂️ 2. Fitting Schedule
                <span className="block text-[10px] opacity-70 font-normal">Remind date for measurement fitting</span>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('received')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  templateType === 'received'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                📋 3. Order & Downpayment Confirmation
                <span className="block text-[10px] opacity-70 font-normal">Send receipt acknowledgement</span>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('balance')}
                className={`p-2.5 rounded-lg border text-left transition ${
                  templateType === 'balance'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                💵 4. Balance Reminder
                <span className="block text-[10px] opacity-70 font-normal">Friendly reminder with GCash details</span>
              </button>
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                SMS Message Content Preview:
              </span>
              <span className="text-[11px] text-slate-400">
                {messageText.length} characters
              </span>
            </div>
            <textarea
              readOnly
              rows={8}
              value={messageText}
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center justify-center transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 text-emerald-600" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" /> Copy Message Text
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSmsLink}
              className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center shadow transition"
            >
              <Send className="w-4 h-4 mr-1.5" /> Open in Phone SMS App
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
