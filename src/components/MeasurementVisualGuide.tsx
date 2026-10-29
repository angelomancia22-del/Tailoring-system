import React from 'react';

interface MeasurementVisualGuideProps {
  mode: 'upper' | 'lower' | 'dress';
  activeField?: string;
  onSelectField?: (fieldKey: string) => void;
}

export const MeasurementVisualGuide: React.FC<MeasurementVisualGuideProps> = ({
  mode,
  activeField,
  onSelectField
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Tailor's Anatomical Guide ({mode.toUpperCase()})
          </span>
        </div>
        <span className="text-[11px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
          Standard Philippine Tailoring Guide
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Silhouette representation */}
        <div className="relative h-56 flex items-center justify-center bg-slate-950/60 rounded-lg p-2 border border-slate-800/60">
          {mode === 'upper' && (
            <svg viewBox="0 0 200 240" className="w-full h-full max-h-52 text-slate-400">
              {/* Torso Silhouette */}
              <path
                d="M 85 20 Q 100 28 115 20 L 145 35 L 165 95 L 140 100 L 130 65 L 132 180 L 68 180 L 70 65 L 60 100 L 35 95 L 55 35 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Neck line */}
              <path
                d="M 85 20 Q 100 32 115 20"
                fill="none"
                stroke={activeField === 'neckCollar' ? '#10b981' : '#64748b'}
                strokeWidth={activeField === 'neckCollar' ? "3" : "1.5"}
                strokeDasharray={activeField === 'neckCollar' ? undefined : "3 2"}
              />
              {/* Shoulder line */}
              <line
                x1="55" y1="35" x2="145" y2="35"
                stroke={activeField === 'shoulderWidth' ? '#10b981' : '#f59e0b'}
                strokeWidth={activeField === 'shoulderWidth' ? "3" : "1.5"}
              />
              {/* Chest line */}
              <line
                x1="65" y1="80" x2="135" y2="80"
                stroke={activeField === 'chestBust' ? '#10b981' : '#0ea5e9'}
                strokeWidth={activeField === 'chestBust' ? "3" : "1.5"}
              />
              {/* Waist line */}
              <line
                x1="70" y1="130" x2="130" y2="130"
                stroke={activeField === 'waistStomach' ? '#10b981' : '#a855f7'}
                strokeWidth={activeField === 'waistStomach' ? "3" : "1.5"}
              />
              {/* Hip line */}
              <line
                x1="68" y1="180" x2="132" y2="180"
                stroke={activeField === 'hipBottom' ? '#10b981' : '#f43f5e'}
                strokeWidth={activeField === 'hipBottom' ? "3" : "1.5"}
              />
              {/* Front Length center */}
              <line
                x1="100" y1="26" x2="100" y2="180"
                stroke={activeField === 'frontLength' ? '#10b981' : '#64748b'}
                strokeWidth={activeField === 'frontLength' ? "3" : "1.5"}
                strokeDasharray="4 2"
              />
              {/* Sleeve length indicator */}
              <path
                d="M 145 35 L 165 95"
                stroke={activeField === 'sleeveLength' ? '#10b981' : '#eab308'}
                strokeWidth={activeField === 'sleeveLength' ? "3" : "1.5"}
              />
              {/* Armhole indicator */}
              <circle
                cx="60" cy="50" r="12"
                fill="none"
                stroke={activeField === 'armhole' ? '#10b981' : '#64748b'}
                strokeWidth={activeField === 'armhole' ? "3" : "1.5"}
              />
            </svg>
          )}

          {mode === 'lower' && (
            <svg viewBox="0 0 200 240" className="w-full h-full max-h-52 text-slate-400">
              {/* Pants Silhouette */}
              <path
                d="M 65 30 L 135 30 L 140 70 L 135 220 L 110 220 L 100 100 L 90 220 L 65 220 L 60 70 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Waist */}
              <line
                x1="65" y1="30" x2="135" y2="30"
                stroke={activeField === 'waist' ? '#10b981' : '#f59e0b'}
                strokeWidth={activeField === 'waist' ? "3" : "1.5"}
              />
              {/* High Hip */}
              <line
                x1="63" y1="50" x2="137" y2="50"
                stroke={activeField === 'highHip' ? '#10b981' : '#0ea5e9'}
                strokeWidth={activeField === 'highHip' ? "3" : "1.5"}
              />
              {/* Seat / Hips */}
              <line
                x1="60" y1="70" x2="140" y2="70"
                stroke={activeField === 'seatHip' ? '#10b981' : '#a855f7'}
                strokeWidth={activeField === 'seatHip' ? "3" : "1.5"}
              />
              {/* Crotch / Rise */}
              <line
                x1="100" y1="30" x2="100" y2="100"
                stroke={activeField === 'crotchRise' ? '#10b981' : '#f43f5e'}
                strokeWidth={activeField === 'crotchRise' ? "3" : "1.5"}
                strokeDasharray="3 2"
              />
              {/* Thigh */}
              <line
                x1="65" y1="110" x2="95" y2="110"
                stroke={activeField === 'thigh' ? '#10b981' : '#14b8a6'}
                strokeWidth={activeField === 'thigh' ? "3" : "1.5"}
              />
              {/* Knee */}
              <line
                x1="70" y1="160" x2="92" y2="160"
                stroke={activeField === 'knee' ? '#10b981' : '#64748b'}
                strokeWidth={activeField === 'knee' ? "3" : "1.5"}
              />
              {/* Bottom Cuff */}
              <line
                x1="65" y1="220" x2="88" y2="220"
                stroke={activeField === 'bottomCuff' ? '#10b981' : '#eab308'}
                strokeWidth={activeField === 'bottomCuff' ? "3" : "1.5"}
              />
              {/* Outseam */}
              <line
                x1="55" y1="30" x2="55" y2="220"
                stroke={activeField === 'outseamLength' ? '#10b981' : '#64748b'}
                strokeWidth={activeField === 'outseamLength' ? "3" : "1.5"}
                strokeDasharray="4 2"
              />
            </svg>
          )}

          {mode === 'dress' && (
            <svg viewBox="0 0 200 240" className="w-full h-full max-h-52 text-slate-400">
              {/* Dress / Filipiniana Silhouette */}
              <path
                d="M 85 20 Q 100 28 115 20 L 140 32 L 155 75 L 138 85 L 126 55 L 122 105 L 155 220 L 45 220 L 78 105 L 74 55 L 62 85 L 45 75 L 60 32 Z"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Butterfly sleeve wings */}
              <path
                d="M 45 75 C 30 50, 45 20, 65 32"
                fill="none"
                stroke={activeField === 'sleeveCrown' ? '#10b981' : '#f59e0b'}
                strokeWidth={activeField === 'sleeveCrown' ? "3" : "1.5"}
              />
              <path
                d="M 155 75 C 170 50, 155 20, 135 32"
                fill="none"
                stroke={activeField === 'sleeveCrown' ? '#10b981' : '#f59e0b'}
                strokeWidth={activeField === 'sleeveCrown' ? "3" : "1.5"}
              />
              {/* Bust distance */}
              <line
                x1="88" y1="75" x2="112" y2="75"
                stroke={activeField === 'bustDistance' ? '#10b981' : '#ec4899'}
                strokeWidth={activeField === 'bustDistance' ? "3" : "1.5"}
              />
              {/* Shoulder to Apex */}
              <line
                x1="80" y1="25" x2="88" y2="75"
                stroke={activeField === 'bustHeight' ? '#10b981' : '#0ea5e9'}
                strokeWidth={activeField === 'bustHeight' ? "3" : "1.5"}
              />
              {/* Waist to hem */}
              <line
                x1="100" y1="105" x2="100" y2="220"
                stroke={activeField === 'waistToFloorHem' ? '#10b981' : '#a855f7'}
                strokeWidth={activeField === 'waistToFloorHem' ? "3" : "1.5"}
                strokeDasharray="3 2"
              />
            </svg>
          )}
        </div>

        {/* Legend / Key guide */}
        <div className="space-y-1.5 text-xs">
          <p className="text-slate-400 text-[11px] mb-2">
            Click any dimension to focus the measurement input or verify exact measuring line:
          </p>
          {mode === 'upper' && (
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { key: 'neckCollar', label: 'Neck / Collar', tagalog: 'Leeg' },
                { key: 'shoulderWidth', label: 'Shoulder Width', tagalog: 'Balikat' },
                { key: 'chestBust', label: 'Chest / Bust', tagalog: 'Dibdib' },
                { key: 'frontLength', label: 'Front Length', tagalog: 'Haba sa Harap' },
                { key: 'sleeveLength', label: 'Sleeve Length', tagalog: 'Haba ng Manggas' },
                { key: 'armhole', label: 'Armhole', tagalog: 'Kili-kili' },
                { key: 'waistStomach', label: 'Waist / Stomach', tagalog: 'Tiyan / Bewang' },
                { key: 'hipBottom', label: 'Hip / Hem Bottom', tagalog: 'Balakang' },
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectField?.(item.key)}
                  className={`text-left px-2 py-1.5 rounded transition text-xs flex flex-col ${
                    activeField === item.key 
                      ? 'bg-emerald-600 text-white font-medium ring-1 ring-emerald-400' 
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="text-[10px] opacity-70">({item.tagalog})</span>
                </button>
              ))}
            </div>
          )}

          {mode === 'lower' && (
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { key: 'waist', label: 'Waist (Trousers)', tagalog: 'Bewang' },
                { key: 'highHip', label: 'High Hip', tagalog: 'Itaas ng Balakang' },
                { key: 'seatHip', label: 'Seat / Full Hip', tagalog: 'Puwit / Balakang' },
                { key: 'outseamLength', label: 'Outseam Length', tagalog: 'Buong Haba ng Pantalon' },
                { key: 'inseamLength', label: 'Inseam Length', tagalog: 'Haba sa Loob' },
                { key: 'crotchRise', label: 'Crotch / Rise', tagalog: 'Tiro' },
                { key: 'thigh', label: 'Thigh Width', tagalog: 'Pata / Hita' },
                { key: 'bottomCuff', label: 'Bottom / Leg Opening', tagalog: 'Laylayan ng Pantalon' },
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectField?.(item.key)}
                  className={`text-left px-2 py-1.5 rounded transition text-xs flex flex-col ${
                    activeField === item.key 
                      ? 'bg-emerald-600 text-white font-medium ring-1 ring-emerald-400' 
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="text-[10px] opacity-70">({item.tagalog})</span>
                </button>
              ))}
            </div>
          )}

          {mode === 'dress' && (
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { key: 'bustHeight', label: 'Shoulder to Apex', tagalog: 'Balikat pababa sa Utong' },
                { key: 'bustDistance', label: 'Apex to Apex (Bust Distance)', tagalog: 'Layo ng Dibdib' },
                { key: 'shoulderToWaist', label: 'Shoulder to Waist', tagalog: 'Balikat hanggang Bewang' },
                { key: 'waistToFloorHem', label: 'Waist to Hem / Floor', tagalog: 'Bewang hanggang Sayad' },
                { key: 'sleeveCrown', label: 'Butterfly Sleeve Crown', tagalog: 'Taas ng Butterfly Sleeve' },
                { key: 'backWidth', label: 'Across Back Width', tagalog: 'Lapad sa Likod' },
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectField?.(item.key)}
                  className={`text-left px-2 py-1.5 rounded transition text-xs flex flex-col ${
                    activeField === item.key 
                      ? 'bg-emerald-600 text-white font-medium ring-1 ring-emerald-400' 
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="text-[10px] opacity-70">({item.tagalog})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
