import React, { useState } from 'react';
import { CustomerMeasurements, UpperBodyMeasurements, LowerBodyMeasurements, DressMeasurements } from '../types/tailoring';
import { MeasurementVisualGuide } from './MeasurementVisualGuide';
import { Ruler, Sparkles, RefreshCw, AlertCircle, Info } from 'lucide-react';

interface MeasurementEditorProps {
  measurements: CustomerMeasurements;
  onChange: (updated: CustomerMeasurements) => void;
  readOnly?: boolean;
}

export const MeasurementEditor: React.FC<MeasurementEditorProps> = ({
  measurements,
  onChange,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState<'upper' | 'lower' | 'dress'>('upper');
  const [activeField, setActiveField] = useState<string>('');

  const handleUnitToggle = (newUnit: 'inches' | 'cm') => {
    if (newUnit === measurements.unit) return;

    const factor = newUnit === 'cm' ? 2.54 : 1 / 2.54;
    const convert = (val: number | ''): number | '' => {
      if (val === '') return '';
      return Number((val * factor).toFixed(1));
    };

    const updatedUpper: UpperBodyMeasurements = {
      neckCollar: convert(measurements.upper.neckCollar),
      chestBust: convert(measurements.upper.chestBust),
      shoulderWidth: convert(measurements.upper.shoulderWidth),
      frontLength: convert(measurements.upper.frontLength),
      backLength: convert(measurements.upper.backLength),
      armhole: convert(measurements.upper.armhole),
      sleeveLength: convert(measurements.upper.sleeveLength),
      bicep: convert(measurements.upper.bicep),
      wristCuff: convert(measurements.upper.wristCuff),
      waistStomach: convert(measurements.upper.waistStomach),
      hipBottom: convert(measurements.upper.hipBottom),
    };

    const updatedLower: LowerBodyMeasurements = {
      waist: convert(measurements.lower.waist),
      highHip: convert(measurements.lower.highHip),
      seatHip: convert(measurements.lower.seatHip),
      outseamLength: convert(measurements.lower.outseamLength),
      inseamLength: convert(measurements.lower.inseamLength),
      crotchRise: convert(measurements.lower.crotchRise),
      thigh: convert(measurements.lower.thigh),
      knee: convert(measurements.lower.knee),
      bottomCuff: convert(measurements.lower.bottomCuff),
    };

    const updatedDress: DressMeasurements = {
      bustHeight: convert(measurements.dress.bustHeight),
      bustDistance: convert(measurements.dress.bustDistance),
      shoulderToWaist: convert(measurements.dress.shoulderToWaist),
      waistToFloorHem: convert(measurements.dress.waistToFloorHem),
      sleeveCrown: convert(measurements.dress.sleeveCrown),
      backWidth: convert(measurements.dress.backWidth),
    };

    onChange({
      ...measurements,
      unit: newUnit,
      upper: updatedUpper,
      lower: updatedLower,
      dress: updatedDress,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const handleUpperChange = (field: keyof UpperBodyMeasurements, val: string) => {
    const numVal = val === '' ? '' : parseFloat(val);
    onChange({
      ...measurements,
      upper: {
        ...measurements.upper,
        [field]: numVal
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const handleLowerChange = (field: keyof LowerBodyMeasurements, val: string) => {
    const numVal = val === '' ? '' : parseFloat(val);
    onChange({
      ...measurements,
      lower: {
        ...measurements.lower,
        [field]: numVal
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const handleDressChange = (field: keyof DressMeasurements, val: string) => {
    const numVal = val === '' ? '' : parseFloat(val);
    onChange({
      ...measurements,
      dress: {
        ...measurements.dress,
        [field]: numVal
      },
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'barong_m') {
      onChange({
        ...measurements,
        unit: 'inches',
        upper: {
          neckCollar: 16,
          chestBust: 40,
          shoulderWidth: 18,
          frontLength: 29.5,
          backLength: 29,
          armhole: 19.5,
          sleeveLength: 24.5,
          bicep: 14.5,
          wristCuff: 9,
          waistStomach: 35,
          hipBottom: 40
        },
        lower: {
          waist: 34,
          highHip: 38,
          seatHip: 40,
          outseamLength: 40,
          inseamLength: 30,
          crotchRise: 11,
          thigh: 23,
          knee: 17.5,
          bottomCuff: 16
        },
        specialPostureNotes: "Regular barong ease with side gussets.",
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    } else if (presetName === 'filipiniana_f') {
      onChange({
        ...measurements,
        unit: 'inches',
        upper: {
          neckCollar: 14,
          chestBust: 35,
          shoulderWidth: 15,
          frontLength: 22,
          backLength: 21.5,
          armhole: 16.5,
          sleeveLength: 9.5,
          bicep: 12,
          wristCuff: 7,
          waistStomach: 28,
          hipBottom: 37
        },
        lower: {
          waist: 28,
          highHip: 33,
          seatHip: 38,
          outseamLength: 39,
          inseamLength: 28,
          crotchRise: 10,
          thigh: 20.5,
          knee: 15,
          bottomCuff: 14
        },
        dress: {
          bustHeight: 9.5,
          bustDistance: 7,
          shoulderToWaist: 15,
          waistToFloorHem: 40,
          sleeveCrown: 6.5,
          backWidth: 13.5
        },
        specialPostureNotes: "Filipiniana structured bodice with boning support.",
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    } else if (presetName === 'school_uniform') {
      onChange({
        ...measurements,
        unit: 'inches',
        upper: {
          neckCollar: 14.5,
          chestBust: 36,
          shoulderWidth: 16,
          frontLength: 26,
          backLength: 25.5,
          armhole: 17.5,
          sleeveLength: 9,
          bicep: 12.5,
          wristCuff: 11,
          waistStomach: 30,
          hipBottom: 36
        },
        lower: {
          waist: 29,
          highHip: 34,
          seatHip: 36,
          outseamLength: 38,
          inseamLength: 28.5,
          crotchRise: 10,
          thigh: 21,
          knee: 16,
          bottomCuff: 15
        },
        specialPostureNotes: "School uniform standard comfort fit.",
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Bar: Unit switcher & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <Ruler className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Measuring Unit:</span>
          <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-600 p-0.5 bg-white dark:bg-slate-800">
            <button
              type="button"
              disabled={readOnly}
              onClick={() => handleUnitToggle('inches')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                measurements.unit === 'inches'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Inches (pulgas)
            </button>
            <button
              type="button"
              disabled={readOnly}
              onClick={() => handleUnitToggle('cm')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                measurements.unit === 'cm'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {!readOnly && (
          <div className="flex items-center space-x-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-amber-500" /> Quick Standard Presets:
            </span>
            <button
              type="button"
              onClick={() => applyPreset('barong_m')}
              className="text-xs px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              Barong Tagalog (M)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('filipiniana_f')}
              className="text-xs px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              Filipiniana / Terno (F)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('school_uniform')}
              className="text-xs px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              School Uniform
            </button>
          </div>
        )}
      </div>

      {/* Interactive Visual Guide */}
      <MeasurementVisualGuide
        mode={activeTab}
        activeField={activeField}
        onSelectField={(key) => setActiveField(key)}
      />

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 flex space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab('upper')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 transition ${
            activeTab === 'upper'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          1. Upper Body (Barong, Polo, Shirt, Blouse)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lower')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 transition ${
            activeTab === 'lower'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          2. Lower Body (Pants, Slacks, Skirt)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('dress')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 transition ${
            activeTab === 'dress'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
          }`}
        >
          3. Dress & Filipiniana Specific
        </button>
      </div>

      {/* Upper Body Fields */}
      {activeTab === 'upper' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { key: 'neckCollar' as keyof UpperBodyMeasurements, label: 'Neck / Collar', sub: 'Leeg', placeholder: '16' },
            { key: 'shoulderWidth' as keyof UpperBodyMeasurements, label: 'Shoulder Width', sub: 'Balikat', placeholder: '18' },
            { key: 'chestBust' as keyof UpperBodyMeasurements, label: 'Chest / Bust', sub: 'Dibdib', placeholder: '40' },
            { key: 'frontLength' as keyof UpperBodyMeasurements, label: 'Front Length', sub: 'Haba sa Harap', placeholder: '29' },
            { key: 'backLength' as keyof UpperBodyMeasurements, label: 'Back Length', sub: 'Haba sa Likod', placeholder: '28.5' },
            { key: 'armhole' as keyof UpperBodyMeasurements, label: 'Armhole', sub: 'Kili-kili', placeholder: '19' },
            { key: 'sleeveLength' as keyof UpperBodyMeasurements, label: 'Sleeve Length', sub: 'Haba ng Manggas', placeholder: '24' },
            { key: 'bicep' as keyof UpperBodyMeasurements, label: 'Bicep / Arm', sub: 'Braso', placeholder: '14' },
            { key: 'wristCuff' as keyof UpperBodyMeasurements, label: 'Wrist / Cuff', sub: 'Pulso', placeholder: '9' },
            { key: 'waistStomach' as keyof UpperBodyMeasurements, label: 'Waist / Stomach', sub: 'Tiyan', placeholder: '35' },
            { key: 'hipBottom' as keyof UpperBodyMeasurements, label: 'Hem / Bottom Hip', sub: 'Balakang Barong', placeholder: '40' },
          ].map(field => (
            <div
              key={field.key}
              onFocus={() => setActiveField(field.key)}
              className={`p-2 rounded-lg border transition ${
                activeField === field.key
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {field.label}
              </label>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>{field.sub}</span>
                <span className="font-mono text-slate-500">{measurements.unit}</span>
              </div>
              <input
                type="number"
                step="0.25"
                disabled={readOnly}
                placeholder={field.placeholder}
                value={measurements.upper[field.key] !== undefined ? measurements.upper[field.key] : ''}
                onChange={(e) => handleUpperChange(field.key, e.target.value)}
                className="w-full px-2 py-1.5 text-sm font-semibold rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lower Body Fields */}
      {activeTab === 'lower' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { key: 'waist' as keyof LowerBodyMeasurements, label: 'Pants Waist', sub: 'Bewang ng Pantalon', placeholder: '33' },
            { key: 'highHip' as keyof LowerBodyMeasurements, label: 'High Hip', sub: 'Itaas na Balakang', placeholder: '36' },
            { key: 'seatHip' as keyof LowerBodyMeasurements, label: 'Seat / Full Hip', sub: 'Puwit / Buong Balakang', placeholder: '39' },
            { key: 'crotchRise' as keyof LowerBodyMeasurements, label: 'Crotch / Rise', sub: 'Tiro', placeholder: '11' },
            { key: 'outseamLength' as keyof LowerBodyMeasurements, label: 'Outseam Length', sub: 'Buong Haba sa Labas', placeholder: '40' },
            { key: 'inseamLength' as keyof LowerBodyMeasurements, label: 'Inseam Length', sub: 'Haba sa Loob', placeholder: '30' },
            { key: 'thigh' as keyof LowerBodyMeasurements, label: 'Thigh Width', sub: 'Pata / Lapad ng Hita', placeholder: '23' },
            { key: 'knee' as keyof LowerBodyMeasurements, label: 'Knee Width', sub: 'Tuhod', placeholder: '17' },
            { key: 'bottomCuff' as keyof LowerBodyMeasurements, label: 'Bottom / Leg Opening', sub: 'Boka ng Pantalon', placeholder: '15.5' },
          ].map(field => (
            <div
              key={field.key}
              onFocus={() => setActiveField(field.key)}
              className={`p-2 rounded-lg border transition ${
                activeField === field.key
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {field.label}
              </label>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>{field.sub}</span>
                <span className="font-mono text-slate-500">{measurements.unit}</span>
              </div>
              <input
                type="number"
                step="0.25"
                disabled={readOnly}
                placeholder={field.placeholder}
                value={measurements.lower[field.key] !== undefined ? measurements.lower[field.key] : ''}
                onChange={(e) => handleLowerChange(field.key, e.target.value)}
                className="w-full px-2 py-1.5 text-sm font-semibold rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Dress & Filipiniana Fields */}
      {activeTab === 'dress' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { key: 'bustHeight' as keyof DressMeasurements, label: 'Shoulder to Apex (Bust Height)', sub: 'Balikat pababa sa Utong', placeholder: '9.5' },
            { key: 'bustDistance' as keyof DressMeasurements, label: 'Apex to Apex (Bust Distance)', sub: 'Layo ng Dibdib', placeholder: '7' },
            { key: 'shoulderToWaist' as keyof DressMeasurements, label: 'Shoulder to Natural Waist', sub: 'Balikat hanggang Bewang', placeholder: '15' },
            { key: 'waistToFloorHem' as keyof DressMeasurements, label: 'Waist to Floor / Hemline', sub: 'Bewang hanggang Sayad', placeholder: '40' },
            { key: 'sleeveCrown' as keyof DressMeasurements, label: 'Butterfly Sleeve Crown Height', sub: 'Taas ng Butterfly Sleeve', placeholder: '6.5' },
            { key: 'backWidth' as keyof DressMeasurements, label: 'Across Back Width', sub: 'Lapad sa Likod', placeholder: '14' },
          ].map(field => (
            <div
              key={field.key}
              onFocus={() => setActiveField(field.key)}
              className={`p-2 rounded-lg border transition ${
                activeField === field.key
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {field.label}
              </label>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>{field.sub}</span>
                <span className="font-mono text-slate-500">{measurements.unit}</span>
              </div>
              <input
                type="number"
                step="0.25"
                disabled={readOnly}
                placeholder={field.placeholder}
                value={measurements.dress[field.key] !== undefined ? measurements.dress[field.key] : ''}
                onChange={(e) => handleDressChange(field.key, e.target.value)}
                className="w-full px-2 py-1.5 text-sm font-semibold rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Special Posture & Tailor Fitting Notes */}
      <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
        <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1 flex items-center">
          <Info className="w-3.5 h-3.5 mr-1 text-amber-600" />
          Master Tailor Posture & Allowance Notes (Erect, Sloping Shoulder, Comfort Allowance):
        </label>
        <textarea
          disabled={readOnly}
          rows={2}
          value={measurements.specialPostureNotes}
          onChange={(e) => onChange({ ...measurements, specialPostureNotes: e.target.value })}
          placeholder="e.g. Sloping left shoulder, add 0.5-inch shoulder pad. Client prefers looser tummy cut for sitting down during church services."
          className="w-full text-xs p-2 rounded border border-amber-300 dark:border-amber-700/60 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <div className="mt-1 flex justify-between items-center text-[11px] text-amber-800/80 dark:text-amber-400/80">
          <span>Measurements last calibrated: {measurements.lastUpdated || 'Initial entry'}</span>
          <span className="font-medium text-emerald-700 dark:text-emerald-400">✓ Digital precision recorded</span>
        </div>
      </div>
    </div>
  );
};
