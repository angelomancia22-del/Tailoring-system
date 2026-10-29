import { Customer, Order, StaffUser, ShopSettings, AuditLog } from '../types/tailoring';

export const initialShopSettings: ShopSettings = {
  shopName: "Bagong Bayan 1 Master Tailors & Dressmaking",
  barangay: "Barangay Bagong Bayan 1",
  purok: "Purok 3 (Near Barangay Hall)",
  cityMunicipality: "San Jose",
  contactNumber: "0917-845-2190",
  gcashNumber: "0917-845-2190",
  gcashAccountName: "Roberto M. Santos (Master Lito)",
  currencySymbol: "₱",
  orderPrefix: "BB1-2026",
  operatingHours: "Monday - Saturday: 8:00 AM - 6:30 PM",
  receiptFooterMessage: "Salamat po sa pagtitiwala! Please present this job order slip upon fitting or pickup."
};

export const initialStaffUsers: StaffUser[] = [
  {
    id: "staff-1",
    name: "Mang Roberto 'Lito' Santos",
    role: "Shop Owner / Admin",
    phone: "0917-845-2190",
    pin: "1234",
    isActive: true
  },
  {
    id: "staff-2",
    name: "Aling Corazon 'Cora' Reyes",
    role: "Master Tailor",
    phone: "0918-332-9011",
    pin: "2345",
    isActive: true
  },
  {
    id: "staff-3",
    name: "Kuya Jun-Jun Morales",
    role: "Cutter & Sewer",
    phone: "0920-551-7782",
    pin: "3456",
    isActive: true
  },
  {
    id: "staff-4",
    name: "Andrea 'Drea' Bautista",
    role: "Front Desk & Reception",
    phone: "0927-440-8812",
    pin: "4567",
    isActive: true
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    customerCode: "CUST-001",
    fullName: "Kagawad Eduardo 'Eddie' Dizon",
    nickname: "Kap Eddie",
    contactNumber: "0919-445-8821",
    email: "edward.dizon@barangay.gov.ph",
    purok: "Purok 1",
    streetAddress: "Block 4, Lot 12, Sampaguita St.",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Male",
    notes: "Prefers comfort fit around waist. Regular customer for barangay session barongs.",
    totalOrdersCount: 4,
    createdAt: "2026-08-10T09:30:00Z",
    updatedAt: "2026-10-25T14:20:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 16.5,
        chestBust: 42,
        shoulderWidth: 18.5,
        frontLength: 30,
        backLength: 29.5,
        armhole: 20,
        sleeveLength: 24.5,
        bicep: 15,
        wristCuff: 9.5,
        waistStomach: 38,
        hipBottom: 42
      },
      lower: {
        waist: 36,
        highHip: 40,
        seatHip: 42,
        outseamLength: 39.5,
        inseamLength: 29,
        crotchRise: 11.5,
        thigh: 24,
        knee: 18,
        bottomCuff: 16
      },
      dress: {
        bustHeight: '',
        bustDistance: '',
        shoulderToWaist: '',
        waistToFloorHem: '',
        sleeveCrown: '',
        backWidth: ''
      },
      specialPostureNotes: "Slight forward shoulder posture; add 0.5\" ease to front chest.",
      lastUpdated: "2026-10-25"
    }
  },
  {
    id: "cust-2",
    customerCode: "CUST-002",
    fullName: "Maria Cristina 'Tina' Mendoza",
    nickname: "Tina",
    contactNumber: "0928-331-5544",
    email: "tina.mendoza@gmail.com",
    purok: "Purok 4",
    streetAddress: "78 Ilang-Ilang Road",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Female",
    notes: "Needs Filipiniana Modern Terno for niece's November wedding at Bagong Bayan Parish.",
    totalOrdersCount: 2,
    createdAt: "2026-09-02T11:15:00Z",
    updatedAt: "2026-10-20T16:00:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 14,
        chestBust: 36,
        shoulderWidth: 15.5,
        frontLength: 23,
        backLength: 22.5,
        armhole: 17,
        sleeveLength: 10,
        bicep: 12.5,
        wristCuff: 7,
        waistStomach: 29,
        hipBottom: 37
      },
      lower: {
        waist: 29,
        highHip: 34,
        seatHip: 38,
        outseamLength: 38,
        inseamLength: 28,
        crotchRise: 10,
        thigh: 21,
        knee: 15,
        bottomCuff: 14
      },
      dress: {
        bustHeight: 9.5,
        bustDistance: 7.2,
        shoulderToWaist: 15,
        waistToFloorHem: 41,
        sleeveCrown: 6.5,
        backWidth: 14
      },
      specialPostureNotes: "Butterfly sleeve requires structured organdy interfacing.",
      lastUpdated: "2026-10-20"
    }
  },
  {
    id: "cust-3",
    customerCode: "CUST-003",
    fullName: "Principal Ramon 'Mon' Gutierrez",
    nickname: "Sir Ramon",
    contactNumber: "0917-552-1980",
    email: "ramon.g@deped.gov.ph",
    purok: "Purok 2",
    streetAddress: "12 Rosal Street, Bagong Bayan 1",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Male",
    notes: "School Principal at Bagong Bayan Elementary. Orders teachers' uniform polos & Barong.",
    totalOrdersCount: 5,
    createdAt: "2026-07-14T08:00:00Z",
    updatedAt: "2026-10-18T10:30:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 16,
        chestBust: 40,
        shoulderWidth: 18,
        frontLength: 29,
        backLength: 28.5,
        armhole: 19.5,
        sleeveLength: 10, // Short sleeve polo barong
        bicep: 14.5,
        wristCuff: 13,
        waistStomach: 36,
        hipBottom: 40
      },
      lower: {
        waist: 34,
        highHip: 38,
        seatHip: 40,
        outseamLength: 39,
        inseamLength: 29.5,
        crotchRise: 11,
        thigh: 23,
        knee: 17.5,
        bottomCuff: 16
      },
      dress: {
        bustHeight: '',
        bustDistance: '',
        shoulderToWaist: '',
        waistToFloorHem: '',
        sleeveCrown: '',
        backWidth: ''
      },
      specialPostureNotes: "Prefers Mandarin collar, slightly stiffened neckline.",
      lastUpdated: "2026-10-18"
    }
  },
  {
    id: "cust-4",
    customerCode: "CUST-004",
    fullName: "Jasmin Claire Villanueva",
    nickname: "Jas",
    contactNumber: "0998-112-9903",
    purok: "Purok 5",
    streetAddress: "55 Camia Street",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Female",
    notes: "Graduation ball gown & Senior High uniform alteration.",
    totalOrdersCount: 1,
    createdAt: "2026-10-22T13:45:00Z",
    updatedAt: "2026-10-22T14:10:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 13.5,
        chestBust: 34,
        shoulderWidth: 15,
        frontLength: 21,
        backLength: 20.5,
        armhole: 16,
        sleeveLength: 21,
        bicep: 11.5,
        wristCuff: 6.5,
        waistStomach: 26,
        hipBottom: 35
      },
      lower: {
        waist: 26,
        highHip: 32,
        seatHip: 36,
        outseamLength: 37,
        inseamLength: 27.5,
        crotchRise: 9.5,
        thigh: 19.5,
        knee: 14,
        bottomCuff: 13
      },
      dress: {
        bustHeight: 9,
        bustDistance: 6.8,
        shoulderToWaist: 14.5,
        waistToFloorHem: 39,
        sleeveCrown: 5.5,
        backWidth: 13.5
      },
      specialPostureNotes: "Hourglass shape, tailor waist snug with inner boning for gown.",
      lastUpdated: "2026-10-22"
    }
  },
  {
    id: "cust-5",
    customerCode: "CUST-005",
    fullName: "Police Cpl. Mark Anthony Galvez",
    nickname: "Cpl. Mark",
    contactNumber: "0917-664-3201",
    purok: "Purok 3",
    streetAddress: "29 Dama de Noche St.",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Male",
    notes: "Police Gala GOA uniform & Slacks. Strict regulation specifications.",
    totalOrdersCount: 3,
    createdAt: "2026-09-15T15:20:00Z",
    updatedAt: "2026-10-12T09:10:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 16.5,
        chestBust: 41,
        shoulderWidth: 19,
        frontLength: 30,
        backLength: 29,
        armhole: 20,
        sleeveLength: 24,
        bicep: 15.5,
        wristCuff: 9.5,
        waistStomach: 34,
        hipBottom: 39
      },
      lower: {
        waist: 33,
        highHip: 37,
        seatHip: 39,
        outseamLength: 41,
        inseamLength: 31,
        crotchRise: 10.5,
        thigh: 23,
        knee: 17,
        bottomCuff: 16.5
      },
      dress: {
        bustHeight: '',
        bustDistance: '',
        shoulderToWaist: '',
        waistToFloorHem: '',
        sleeveCrown: '',
        backWidth: ''
      },
      specialPostureNotes: "Athletic drop, broad shoulders.",
      lastUpdated: "2026-10-12"
    }
  },
  {
    id: "cust-6",
    customerCode: "CUST-006",
    fullName: "Gng. Remedios 'Medy' Alcantara",
    nickname: "Aling Medy",
    contactNumber: "0908-771-4432",
    purok: "Purok 6",
    streetAddress: "104 Waling-Waling Court",
    barangay: "Barangay Bagong Bayan 1",
    gender: "Female",
    notes: "Senior citizen. Senior Citizen Club President. Likes soft cotton linen dresses.",
    totalOrdersCount: 2,
    createdAt: "2026-08-28T10:00:00Z",
    updatedAt: "2026-10-24T11:00:00Z",
    measurements: {
      unit: "inches",
      upper: {
        neckCollar: 15,
        chestBust: 40,
        shoulderWidth: 16.5,
        frontLength: 26,
        backLength: 25.5,
        armhole: 18.5,
        sleeveLength: 12,
        bicep: 14,
        wristCuff: 8,
        waistStomach: 36,
        hipBottom: 43
      },
      lower: {
        waist: 35,
        highHip: 39,
        seatHip: 43,
        outseamLength: 36,
        inseamLength: 26,
        crotchRise: 11,
        thigh: 23.5,
        knee: 17,
        bottomCuff: 15
      },
      dress: {
        bustHeight: 10.5,
        bustDistance: 8,
        shoulderToWaist: 16,
        waistToFloorHem: 37,
        sleeveCrown: 6,
        backWidth: 15
      },
      specialPostureNotes: "Slight rounded upper back; give ease across upper back yoke.",
      lastUpdated: "2026-10-24"
    }
  }
];

export const initialOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "BB1-2026-0041",
    customerId: "cust-1",
    customerName: "Kagawad Eduardo 'Eddie' Dizon",
    customerPhone: "0919-445-8821",
    customerPurok: "Purok 1",
    garmentType: "Barong Tagalog",
    quantity: 1,
    priority: "High Priority",
    fabricSource: "customer_provided",
    fabricName: "Piña Organza w/ Cocoon Silk Lining",
    fabricColorPattern: "Natural Ecru / Off-white",
    fabricYards: "3.5 yards",
    fabricNotes: "Customer brought original Lumban embroidered cut fabric panel",
    collarStyle: "Traditional Pointed Collar",
    pocketStyle: "No Pocket (Formal Barong)",
    ventStyle: "Side Vents w/ gusset",
    liningStyle: "Half-lined with soft cotton habotai",
    embroideryDetail: "Hand-embroidered Calado pechera design on chest",
    specialInstructions: "For Barangay Bagong Bayan 1 Annual Fiesta inauguration. Need perfect fitting.",
    measurementsSnapshot: initialCustomers[0].measurements,
    assignedTailor: "Mang Roberto 'Lito' Santos",
    status: "Fitting",
    orderDate: "2026-10-20",
    fittingDate: "2026-10-29", // TODAY
    promisedDeadline: "2026-11-02",
    totalLabor: 2800,
    fabricCost: 0,
    additionalCost: 300, // special delicate fabric handling
    totalAmount: 3100,
    downpayment: 1500,
    balance: 1600,
    paymentStatus: "Partial",
    paymentMethod: "GCash",
    referenceNumber: "GCASH-980124881",
    history: [
      {
        id: "h-1",
        timestamp: "2026-10-20T10:00:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Order logged, downpayment ₱1,500 received via GCash."
      },
      {
        id: "h-2",
        timestamp: "2026-10-21T14:30:00Z",
        stage: "Cutting",
        updatedBy: "Aling Corazon 'Cora' Reyes",
        notes: "Pattern drafted according to measurements with 1.5\" seam allowance."
      },
      {
        id: "h-3",
        timestamp: "2026-10-24T16:00:00Z",
        stage: "Sewing",
        updatedBy: "Kuya Jun-Jun Morales",
        notes: "Basting done for 1st fitting. Collars and cuffs assembled."
      },
      {
        id: "h-4",
        timestamp: "2026-10-28T11:00:00Z",
        stage: "Fitting",
        updatedBy: "Mang Roberto 'Lito' Santos",
        notes: "Scheduled for client trial fit today Oct 29."
      }
    ],
    createdAt: "2026-10-20T10:00:00Z",
    updatedAt: "2026-10-28T11:00:00Z"
  },
  {
    id: "ord-2",
    orderNumber: "BB1-2026-0042",
    customerId: "cust-2",
    customerName: "Maria Cristina 'Tina' Mendoza",
    customerPhone: "0928-331-5544",
    customerPurok: "Purok 4",
    garmentType: "Filipiniana / Terno",
    quantity: 1,
    priority: "Normal",
    fabricSource: "shop_inventory",
    fabricName: "Duchess Satin with Champagne Organza Overlay",
    fabricColorPattern: "Champagne Gold with subtle shimmer",
    fabricYards: "5 yards",
    fabricNotes: "Stock from Shop Inventory #DS-09",
    collarStyle: "Sweetheart Neckline with Butterfly Sleeves",
    pocketStyle: "Hidden side seam pocket",
    ventStyle: "Center back kick pleat",
    liningStyle: "Full inner lining w/ boning support",
    embroideryDetail: "Beaded corded lace applique on sleeve cuffs and bodice",
    specialInstructions: "Sleeve butterfly shape must stand firm. Client requested 2 fitting sessions.",
    measurementsSnapshot: initialCustomers[1].measurements,
    assignedTailor: "Aling Corazon 'Cora' Reyes",
    status: "Sewing",
    orderDate: "2026-10-22",
    fittingDate: "2026-10-31",
    promisedDeadline: "2026-11-06",
    totalLabor: 3500,
    fabricCost: 1800,
    additionalCost: 500, // hand beadwork
    totalAmount: 5800,
    downpayment: 3000,
    balance: 2800,
    paymentStatus: "Partial",
    paymentMethod: "Cash",
    referenceNumber: "OR-2026-088",
    history: [
      {
        id: "h-11",
        timestamp: "2026-10-22T11:15:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Order recorded with ₱3,000 cash downpayment."
      },
      {
        id: "h-12",
        timestamp: "2026-10-24T09:00:00Z",
        stage: "Cutting",
        updatedBy: "Aling Corazon 'Cora' Reyes",
        notes: "Fabric cut and stay-stitched."
      },
      {
        id: "h-13",
        timestamp: "2026-10-27T15:30:00Z",
        stage: "Sewing",
        updatedBy: "Kuya Jun-Jun Morales",
        notes: "Bodice assembly and boning insertion ongoing."
      }
    ],
    createdAt: "2026-10-22T11:15:00Z",
    updatedAt: "2026-10-27T15:30:00Z"
  },
  {
    id: "ord-3",
    orderNumber: "BB1-2026-0040",
    customerId: "cust-3",
    customerName: "Principal Ramon 'Mon' Gutierrez",
    customerPhone: "0917-552-1980",
    customerPurok: "Purok 2",
    garmentType: "Polo Barong",
    quantity: 2,
    priority: "Normal",
    fabricSource: "shop_inventory",
    fabricName: "Peach Twill & Linen Blend",
    fabricColorPattern: "Light Sage Green & Beige Cream",
    fabricYards: "4 yards",
    collarStyle: "Mandarin Chinese Collar",
    pocketStyle: "Single patch chest pocket",
    ventStyle: "Side slits with reinforcement triangle",
    liningStyle: "Unlined, lightweight for tropical weather",
    embroideryDetail: "Tone-on-tone machine floral geometric front embroidery",
    specialInstructions: "Short sleeve length exactly 10 inches. Loose armhole for classroom comfort.",
    measurementsSnapshot: initialCustomers[2].measurements,
    assignedTailor: "Kuya Jun-Jun Morales",
    status: "Ready for Pickup",
    orderDate: "2026-10-18",
    fittingDate: "2026-10-24",
    promisedDeadline: "2026-10-28", // Yesterday - ready!
    completedDate: "2026-10-27",
    totalLabor: 2200,
    fabricCost: 1200,
    additionalCost: 0,
    totalAmount: 3400,
    downpayment: 3400,
    balance: 0,
    paymentStatus: "Paid",
    paymentMethod: "GCash",
    referenceNumber: "GCASH-771920381",
    history: [
      {
        id: "h-21",
        timestamp: "2026-10-18T10:30:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Full payment received via GCash."
      },
      {
        id: "h-22",
        timestamp: "2026-10-20T11:00:00Z",
        stage: "Cutting",
        updatedBy: "Aling Corazon 'Cora' Reyes",
        notes: "2 pcs polo cut."
      },
      {
        id: "h-23",
        timestamp: "2026-10-24T14:00:00Z",
        stage: "Fitting",
        updatedBy: "Mang Roberto 'Lito' Santos",
        notes: "Fitting passed with minor 0.5\" sleeve hem tweak."
      },
      {
        id: "h-24",
        timestamp: "2026-10-27T17:00:00Z",
        stage: "Ready for Pickup",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Pressed, hung on garment bag, customer notified via SMS."
      }
    ],
    createdAt: "2026-10-18T10:30:00Z",
    updatedAt: "2026-10-27T17:00:00Z"
  },
  {
    id: "ord-4",
    orderNumber: "BB1-2026-0043",
    customerId: "cust-5",
    customerName: "Police Cpl. Mark Anthony Galvez",
    customerPhone: "0917-664-3201",
    customerPurok: "Purok 3",
    garmentType: "Slacks / Trousers",
    quantity: 2,
    priority: "Rush",
    fabricSource: "shop_inventory",
    fabricName: "Wool Blend Gabardine",
    fabricColorPattern: "Midnight Navy Blue",
    fabricYards: "3 yards",
    collarStyle: "N/A",
    pocketStyle: "Quarter-top front slant pockets, double welt back pockets with button",
    ventStyle: "N/A",
    liningStyle: "Pocket bags and crotch lining reinforced",
    specialInstructions: "Rush for PNP command inspection on Nov 1! Trousers must have sharp permanent crease.",
    measurementsSnapshot: initialCustomers[4].measurements,
    assignedTailor: "Mang Roberto 'Lito' Santos",
    status: "Cutting",
    orderDate: "2026-10-26",
    fittingDate: "2026-10-30",
    promisedDeadline: "2026-10-31",
    totalLabor: 1600,
    fabricCost: 1400,
    additionalCost: 400, // rush fee
    totalAmount: 3400,
    downpayment: 2000,
    balance: 1400,
    paymentStatus: "Partial",
    paymentMethod: "Cash",
    referenceNumber: "OR-2026-092",
    history: [
      {
        id: "h-31",
        timestamp: "2026-10-26T14:00:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Rush job accepted for PNP inspection."
      },
      {
        id: "h-32",
        timestamp: "2026-10-28T09:00:00Z",
        stage: "Cutting",
        updatedBy: "Mang Roberto 'Lito' Santos",
        notes: "Cut on precision wool gabardine grain."
      }
    ],
    createdAt: "2026-10-26T14:00:00Z",
    updatedAt: "2026-10-28T09:00:00Z"
  },
  {
    id: "ord-5",
    orderNumber: "BB1-2026-0039",
    customerId: "cust-4",
    customerName: "Jasmin Claire Villanueva",
    customerPhone: "0998-112-9903",
    customerPurok: "Purok 5",
    garmentType: "Alteration & Repair",
    quantity: 1,
    priority: "Normal",
    fabricSource: "customer_provided",
    fabricName: "School Uniform Pleated Skirt",
    fabricColorPattern: "Navy Tartan Plaid",
    fabricYards: "N/A",
    collarStyle: "N/A",
    pocketStyle: "N/A",
    ventStyle: "N/A",
    liningStyle: "N/A",
    specialInstructions: "Take in waist by 1.5 inches, re-align zipper and hem length by 2 inches.",
    measurementsSnapshot: initialCustomers[3].measurements,
    assignedTailor: "Kuya Jun-Jun Morales",
    status: "Completed",
    orderDate: "2026-10-22",
    promisedDeadline: "2026-10-25",
    completedDate: "2026-10-25",
    totalLabor: 350,
    fabricCost: 0,
    additionalCost: 0,
    totalAmount: 350,
    downpayment: 350,
    balance: 0,
    paymentStatus: "Paid",
    paymentMethod: "Cash",
    referenceNumber: "OR-2026-085",
    history: [
      {
        id: "h-41",
        timestamp: "2026-10-22T14:15:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Alteration logged and paid."
      },
      {
        id: "h-42",
        timestamp: "2026-10-24T10:00:00Z",
        stage: "Sewing",
        updatedBy: "Kuya Jun-Jun Morales",
        notes: "Waist altered and re-stitched."
      },
      {
        id: "h-43",
        timestamp: "2026-10-25T15:00:00Z",
        stage: "Completed",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "Claimed and picked up by customer."
      }
    ],
    createdAt: "2026-10-22T14:15:00Z",
    updatedAt: "2026-10-25T15:00:00Z"
  },
  {
    id: "ord-6",
    orderNumber: "BB1-2026-0044",
    customerId: "cust-6",
    customerName: "Gng. Remedios 'Medy' Alcantara",
    customerPhone: "0908-771-4432",
    customerPurok: "Purok 6",
    garmentType: "Evening Gown / Dress",
    quantity: 1,
    priority: "Normal",
    fabricSource: "customer_provided",
    fabricName: "Handwoven Inabel & Brocade",
    fabricColorPattern: "Deep Royal Plum Purple",
    fabricYards: "4 yards",
    collarStyle: "Round Jewel Neckline",
    pocketStyle: "Two deep side pockets",
    ventStyle: "A-line silhouette with ease",
    liningStyle: "Breathable cotton voile lining",
    specialInstructions: "Senior citizen comfort cut. Roomy around arms and waist. Ankle length.",
    measurementsSnapshot: initialCustomers[5].measurements,
    assignedTailor: "Aling Corazon 'Cora' Reyes",
    status: "Pending",
    orderDate: "2026-10-28",
    fittingDate: "2026-11-04",
    promisedDeadline: "2026-11-10",
    totalLabor: 2500,
    fabricCost: 0,
    additionalCost: 0,
    totalAmount: 2500,
    downpayment: 1000,
    balance: 1500,
    paymentStatus: "Partial",
    paymentMethod: "GCash",
    referenceNumber: "GCASH-330198421",
    history: [
      {
        id: "h-51",
        timestamp: "2026-10-28T11:20:00Z",
        stage: "Pending",
        updatedBy: "Andrea 'Drea' Bautista",
        notes: "New order booked. Customer supplied Inabel fabric."
      }
    ],
    createdAt: "2026-10-28T11:20:00Z",
    updatedAt: "2026-10-28T11:20:00Z"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-10-29T08:15:00Z",
    userName: "Mang Roberto 'Lito' Santos",
    action: "Scheduled Fitting",
    target: "Order BB1-2026-0041 (Kagawad Eddie Dizon)",
    details: "Trial fitting booked for today Oct 29, 3:00 PM."
  },
  {
    id: "log-2",
    timestamp: "2026-10-28T16:45:00Z",
    userName: "Andrea 'Drea' Bautista",
    action: "Order Created",
    target: "Order BB1-2026-0044 (Gng. Remedios Alcantara)",
    details: "Downpayment ₱1,000 received via GCash #GCASH-330198421."
  },
  {
    id: "log-3",
    timestamp: "2026-10-27T17:05:00Z",
    userName: "Andrea 'Drea' Bautista",
    action: "Order Status Updated",
    target: "Order BB1-2026-0040 (Sir Ramon Gutierrez)",
    details: "Marked as Ready for Pickup. Automated SMS dispatch prepared."
  },
  {
    id: "log-4",
    timestamp: "2026-10-26T14:10:00Z",
    userName: "Mang Roberto 'Lito' Santos",
    action: "Updated Measurements",
    target: "Customer CUST-005 (Cpl. Mark Galvez)",
    details: "Waist updated from 34\" to 33\" for duty slacks."
  },
  {
    id: "log-5",
    timestamp: "2026-10-25T15:10:00Z",
    userName: "Andrea 'Drea' Bautista",
    action: "Order Completed",
    target: "Order BB1-2026-0039 (Jasmin Villanueva)",
    details: "Customer picked up altered skirt. Full payment settled."
  }
];
