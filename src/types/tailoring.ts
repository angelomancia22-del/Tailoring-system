export type GarmentCategory = 
  | 'Barong Tagalog'
  | 'Polo Barong'
  | 'Formal Suit / Coat'
  | 'Slacks / Trousers'
  | 'School Uniform'
  | 'Barangay & Office Uniform'
  | 'Filipiniana / Terno'
  | 'Evening Gown / Dress'
  | 'Blouse & Skirt'
  | 'Alteration & Repair';

export type OrderStatus = 
  | 'Pending'
  | 'Cutting'
  | 'Sewing'
  | 'Fitting'
  | 'Finishing'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid';
export type PaymentMethod = 'Cash' | 'GCash' | 'Maya' | 'Bank Transfer';

export interface UpperBodyMeasurements {
  neckCollar: number | ''; // e.g. 15.5"
  chestBust: number | '';  // e.g. 38"
  shoulderWidth: number | ''; // e.g. 17.5"
  frontLength: number | ''; // e.g. 29"
  backLength: number | '';  // e.g. 28.5"
  armhole: number | '';    // e.g. 19"
  sleeveLength: number | ''; // e.g. 24" (long) or 9.5" (short)
  bicep: number | '';      // e.g. 14"
  wristCuff: number | '';  // e.g. 9"
  waistStomach: number | ''; // e.g. 34"
  hipBottom: number | '';    // e.g. 39"
}

export interface LowerBodyMeasurements {
  waist: number | '';       // e.g. 32"
  highHip: number | '';     // e.g. 36"
  seatHip: number | '';     // e.g. 39"
  outseamLength: number | ''; // e.g. 40"
  inseamLength: number | '';  // e.g. 30"
  crotchRise: number | '';    // e.g. 11"
  thigh: number | '';       // e.g. 23"
  knee: number | '';        // e.g. 17"
  bottomCuff: number | '';  // e.g. 15"
}

export interface DressMeasurements {
  bustHeight: number | '';    // Shoulder to apex
  bustDistance: number | '';  // Apex to apex
  shoulderToWaist: number | '';
  waistToFloorHem: number | '';
  sleeveCrown: number | '';
  backWidth: number | '';
}

export interface CustomerMeasurements {
  unit: 'inches' | 'cm';
  upper: UpperBodyMeasurements;
  lower: LowerBodyMeasurements;
  dress: DressMeasurements;
  specialPostureNotes: string; // e.g. "Sloping left shoulder", "Erect posture", "Prefers loose fit"
  lastUpdated: string;
}

export interface Customer {
  id: string;
  customerCode: string; // e.g. CUST-001
  fullName: string;
  nickname?: string;
  contactNumber: string;
  email?: string;
  purok: string; // e.g. "Purok 1", "Purok 2", "Purok 3", etc.
  streetAddress: string;
  barangay: string; // "Barangay Bagong Bayan 1"
  gender: 'Male' | 'Female' | 'Other';
  notes: string;
  measurements: CustomerMeasurements;
  createdAt: string;
  updatedAt: string;
  totalOrdersCount: number;
}

export interface OrderHistoryItem {
  id: string;
  timestamp: string;
  stage: OrderStatus;
  updatedBy: string;
  notes: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. BB1-2026-001
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerPurok: string;
  garmentType: GarmentCategory;
  quantity: number;
  priority: 'Normal' | 'Rush' | 'High Priority';
  
  // Fabric details
  fabricSource: 'customer_provided' | 'shop_inventory';
  fabricName: string;
  fabricColorPattern: string;
  fabricYards: string;
  fabricNotes?: string;

  // Design & Specifications
  collarStyle: string;
  pocketStyle: string;
  ventStyle: string;
  liningStyle: string;
  embroideryDetail?: string; // especially for Barong Tagalog / Filipiniana
  specialInstructions: string;

  // Measurements snapshot taken for this specific job
  measurementsSnapshot: CustomerMeasurements;

  // Assignment & Workflow
  assignedTailor: string;
  status: OrderStatus;
  orderDate: string;
  fittingDate?: string;
  promisedDeadline: string;
  completedDate?: string;

  // Financials
  totalLabor: number;
  fabricCost: number;
  additionalCost: number; // e.g. rush fee, special embroidery
  totalAmount: number;
  downpayment: number;
  balance: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  referenceNumber?: string; // GCash ref or Official Receipt #

  history: OrderHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = 
  | 'Shop Owner / Admin'
  | 'Master Tailor'
  | 'Cutter & Sewer'
  | 'Front Desk & Reception';

export interface StaffUser {
  id: string;
  name: string;
  role: StaffRole;
  phone: string;
  pin: string;
  isActive: boolean;
}

export interface ShopSettings {
  shopName: string;
  barangay: string;
  purok: string;
  cityMunicipality: string;
  contactNumber: string;
  gcashNumber: string;
  gcashAccountName: string;
  currencySymbol: string;
  orderPrefix: string;
  operatingHours: string;
  receiptFooterMessage: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  action: string;
  target: string;
  details: string;
}
