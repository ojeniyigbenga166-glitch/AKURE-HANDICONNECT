export const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'Wrench', count: 124 },
  { id: 'electrical', name: 'Electrical & Wiring', icon: 'Zap', count: 28, popular: true },
  { id: 'plumbing', name: 'Plumbing & Water', icon: 'Droplets', count: 22, popular: true },
  { id: 'generator', name: 'Generator Repair', icon: 'Cpu', count: 19, popular: true },
  { id: 'ac', name: 'AC & Refrigeration', icon: 'Wind', count: 16, popular: true },
  { id: 'carpentry', name: 'Carpentry & Woodwork', icon: 'Hammer', count: 14 },
  { id: 'mechanic', name: 'Auto Mechanic', icon: 'Car', count: 12 },
  { id: 'painting', name: 'Painting & POP', icon: 'Paintbrush', count: 15 },
  { id: 'tiling', name: 'Tiling & Masonry', icon: 'Grid', count: 11 },
  { id: 'tailoring', name: 'Tailoring & Sewing', icon: 'Scissors', count: 9 },
  { id: 'cleaning', name: 'Cleaning Services', icon: 'Sparkles', count: 13 },
  { id: 'welding', name: 'Welding & Steel', icon: 'Shield', count: 8 },
  { id: 'tech', name: 'Phone & Laptop Fix', icon: 'Smartphone', count: 17 }
];

export const AKURE_DISTRICTS = [
  'All Akure Areas',
  'Alagbaka (GRA & Extension)',
  'Ijapo Estate',
  'Oba-Ile & Airport Road',
  'Fanibi & Ondo Road',
  'Oda Road & Housing Estate',
  'FUTA / South Gate / North Gate',
  'Oke-Aro & Stadium Road',
  'Arakale & Commercial Hub',
  'Isinkan & High Court Area',
  'Danjuma & Champion Junction',
  'Express Road & Oyemekun',
  'Araromi & General Hospital Area'
];

export const INITIAL_ARTISANS = [
  {
    id: 'art-1',
    name: 'Engr. Gbenga Adebayo',
    businessName: 'Gbenga Tech & Electricals',
    category: 'electrical',
    categoryName: 'Electrical & Inverter Systems',
    rating: 4.9,
    reviewsCount: 56,
    completedJobs: 112,
    badge: 'Gold Verified Pro',
    isVerified: true,
    experienceYears: 9,
    startingRate: 5000,
    phone: '+2348031234567',
    whatsapp: '2348031234567',
    districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate', 'Oba-Ile & Airport Road', 'FUTA / South Gate / North Gate'],
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    bio: 'Certified electrical engineer specializing in residential house wiring, circuit breaker troubleshooting, automatic generator changeover switches, and Solar/Inverter system installation in Akure.',
    responseTime: '< 15 minutes',
    portfolio: [
      { title: 'Full 4-Bedroom Duplex Wiring', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
      { title: 'Inverter & Battery Bank Setup', image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80' },
      { title: 'Automatic Changeover Panel', image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r1', name: 'Dr. Femi Ogundele', district: 'Alagbaka', rating: 5, date: '3 days ago', comment: 'Gbenga came to Alagbaka within 20 minutes of calling him. Fixed our main distribution box safely and neatly. Very transparent pricing.' },
      { id: 'r2', name: 'Blessing Akinwande', district: 'Ijapo Estate', rating: 5, date: '1 week ago', comment: 'Installed our 3.5kVA Inverter setup flawlessly. Explained how to manage battery usage. 100% recommended!' }
    ]
  },
  {
    id: 'art-2',
    name: 'Sunday "Sumec" Ojo',
    businessName: 'Ojo Generator Specialist',
    category: 'generator',
    categoryName: 'Generator Repair & Servicing',
    rating: 4.8,
    reviewsCount: 43,
    completedJobs: 89,
    badge: 'Fast Responder',
    isVerified: true,
    experienceYears: 12,
    startingRate: 4000,
    phone: '+2348059876543',
    whatsapp: '2348059876543',
    districts: ['Fanibi & Ondo Road', 'Oke-Aro & Stadium Road', 'Alagbaka (GRA & Extension)', 'Arakale & Commercial Hub'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Master generator mechanic across Akure. Repairs all petrol & diesel generators (Tiger, Sumec Firman, Elepaq, Lutian, Mikano, Perkins). Carburetor cleaning, coil rewinding, oil service, and automatic starter repairs.',
    responseTime: '< 20 minutes',
    portfolio: [
      { title: 'Mikano Diesel Generator Overhaul', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' },
      { title: 'Firman Generator Engine Servicing', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r3', name: 'Chief Olumide', district: 'Fanibi', rating: 5, date: 'Yesterday', comment: 'Our 7.5kVA generator refused to start during power outage. Ojo arrived swiftly, changed the AVR and cleaned the carburetor. Running like new now.' }
    ]
  },
  {
    id: 'art-3',
    name: 'Kelvin "Cooling" Amadi',
    businessName: 'Arctic Freeze AC & Refrigeration',
    category: 'ac',
    categoryName: 'AC Servicing & Refrigeration',
    rating: 4.9,
    reviewsCount: 62,
    completedJobs: 130,
    badge: 'Gold Verified Pro',
    isVerified: true,
    experienceYears: 7,
    startingRate: 6000,
    phone: '+2348123456789',
    whatsapp: '2348123456789',
    districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate', 'Oba-Ile & Airport Road', 'Oda Road & Housing Estate'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Expert AC technician certified in split unit installation, gas top-ups (R22/R410), compressor replacements, leak fixing, and deep coil chemical cleaning. Servicing homes, churches, and offices in Akure.',
    responseTime: '< 10 minutes',
    portfolio: [
      { title: 'Commercial Inverter AC Installation', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80' },
      { title: 'Deep Chemical Coil Service', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r4', name: 'Engr. Yinka', district: 'Alagbaka', rating: 5, date: '4 days ago', comment: 'Kelvin serviced 5 office AC units in record time. Clean work, no mess left behind, and chilling effect is top notch!' }
    ]
  },
  {
    id: 'art-4',
    name: 'Paulus "Pipe Master" Akpan',
    businessName: 'Akpan Plumbing & Borehole Services',
    category: 'plumbing',
    categoryName: 'Plumbing & Water Systems',
    rating: 4.7,
    reviewsCount: 38,
    completedJobs: 74,
    badge: 'Reliable Pro',
    isVerified: true,
    experienceYears: 11,
    startingRate: 4500,
    phone: '+2348023456789',
    whatsapp: '2348023456789',
    districts: ['FUTA / South Gate / North Gate', 'Oke-Aro & Stadium Road', 'Isinkan & High Court Area', 'Express Road & Oyemekun'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    bio: 'Master plumber for high-pressure water piping, water heater repairs, septic tank inspection, modern bathroom shower fittings, and automatic water pump float switch installations in Akure.',
    responseTime: '< 30 minutes',
    portfolio: [
      { title: 'PPR Pipe Underground Installation', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80' },
      { title: 'Modern Bathroom & Water Heater Fitting', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r5', name: 'Samuel K.', district: 'FUTA South Gate', rating: 5, date: '2 weeks ago', comment: 'Fixed a stubborn pipe leak under our kitchen tile without damaging the floor. Very professional.' }
    ]
  },
  {
    id: 'art-5',
    name: 'Rasheed "Craftsman" Popoola',
    businessName: 'Popoola Fine Woodworks & Doors',
    category: 'carpentry',
    categoryName: 'Carpentry & Furniture',
    rating: 4.9,
    reviewsCount: 29,
    completedJobs: 52,
    badge: 'Master Artisan',
    isVerified: true,
    experienceYears: 15,
    startingRate: 7000,
    phone: '+2348067890123',
    whatsapp: '2348067890123',
    districts: ['Oba-Ile & Airport Road', 'Oda Road & Housing Estate', 'Alagbaka (GRA & Extension)'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Custom furniture maker and expert carpenter in Akure. Kitchen cabinet designs, modern wardrobes, security flush doors, roof truss framing, and upholstered executive bed frames.',
    responseTime: '< 25 minutes',
    portfolio: [
      { title: 'Modular Kitchen Cabinet Installation', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80' },
      { title: 'Hardwood Executive Office Desk', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r6', name: 'Mrs. Folake', district: 'Oba-Ile', rating: 5, date: '5 days ago', comment: 'Built beautiful custom wardrobes for my 3 bedrooms. High quality wood finish and solid doors.' }
    ]
  },
  {
    id: 'art-6',
    name: 'Babatunde "Colors" Arogundade',
    businessName: 'Royal POP Screeding & Painting',
    category: 'painting',
    categoryName: 'Painting & POP Ceiling',
    rating: 4.8,
    reviewsCount: 34,
    completedJobs: 67,
    badge: 'HandiConnect Verified',
    isVerified: true,
    experienceYears: 8,
    startingRate: 5000,
    phone: '+2348098765432',
    whatsapp: '2348098765432',
    districts: ['Ijapo Estate', 'Alagbaka (GRA & Extension)', 'Oda Road & Housing Estate', 'Danjuma & Champion Junction'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Interior and exterior wall painting specialist, wall putty/screeding, modern POP ceiling design with LED light channels, and damp-proof dampness treatment for buildings.',
    responseTime: '< 20 minutes',
    portfolio: [
      { title: 'Modern POP Ceiling with Ambient Lighting', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80' },
      { title: 'Exterior Weatherproof Paint Finish', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { id: 'r7', name: 'Arc. Kemi', district: 'Ijapo Estate', rating: 5, date: '1 week ago', comment: 'Babatunde handled the wall screeding and 3D painting for our showroom project. Extremely neat work.' }
    ]
  }
];

export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Urgent: Sounding Generator Repair & Oil Change',
    category: 'generator',
    categoryName: 'Generator Repair',
    district: 'Ijapo Estate',
    budgetType: 'Fixed Budget',
    budgetAmount: 12000,
    urgency: 'Today (Urgent)',
    postedBy: 'Mrs. Funke A.',
    timeAgo: '15 mins ago',
    status: 'Open for Quotes',
    offersCount: 3,
    description: 'My Sumec 7.5kVA generator started making a heavy knocking noise this morning and won’t carry load. Need an experienced technician in Ijapo Estate today.'
  },
  {
    id: 'job-2',
    title: 'Servicing & Gas Top-up for 3 Split AC Units',
    category: 'ac',
    categoryName: 'AC & Refrigeration',
    district: 'Alagbaka (GRA & Extension)',
    budgetType: 'Quotes Wanted',
    budgetAmount: 25000,
    urgency: 'Within 2 Days',
    postedBy: 'Dr. Tayo',
    timeAgo: '45 mins ago',
    status: 'Open for Quotes',
    offersCount: 5,
    description: 'Looking for a reliable AC technician to service 3 Panasonic inverter AC units in our office at Alagbaka GRA. 1 unit needs gas top-up.'
  },
  {
    id: 'job-3',
    title: 'Living Room Floor Tiling & Skirting (approx 45 sq.m)',
    category: 'tiling',
    categoryName: 'Tiling & Masonry',
    district: 'FUTA / South Gate / North Gate',
    budgetType: 'Fixed Budget',
    budgetAmount: 50000,
    urgency: 'Flexible',
    postedBy: 'Engr. David O.',
    timeAgo: '2 hours ago',
    status: 'Open for Quotes',
    offersCount: 2,
    description: 'Laying 60x60 vitrified floor tiles for a new living room near FUTA South gate. Tiles and cement already delivered to site.'
  },
  {
    id: 'job-4',
    title: 'Changeover Switch & Inverter Wiring Adjustment',
    category: 'electrical',
    categoryName: 'Electrical & Wiring',
    district: 'Oba-Ile & Airport Road',
    budgetType: 'Fixed Budget',
    budgetAmount: 18000,
    urgency: 'Today (Urgent)',
    postedBy: 'Pastor Emmanuel',
    timeAgo: '3 hours ago',
    status: 'Open for Quotes',
    offersCount: 4,
    description: 'Inverter changeover switch burnt during power surge. Need an electrician to install a heavy-duty 63A automatic changeover switch.'
  },
  {
    id: 'job-5',
    title: 'Custom Mahogany Security Door Framing & Installation',
    category: 'carpentry',
    categoryName: 'Carpentry & Woodwork',
    district: 'Oda Road & Housing Estate',
    budgetType: 'Quotes Wanted',
    budgetAmount: 35000,
    urgency: 'Within 3 Days',
    postedBy: 'Barr. Biodun',
    timeAgo: '5 hours ago',
    status: 'Open for Quotes',
    offersCount: 1,
    description: 'Need a carpenter to trim and fit two solid hardwood security doors into pre-existing frames at Oda Road estate.'
  }
];

export const LIVE_ACTIVITY = [
  { id: 'act-1', text: 'Engr. Gbenga was hired for Electrical Changeover in Alagbaka GRA', time: '10 mins ago', type: 'hire' },
  { id: 'act-2', text: 'Mrs. Funke posted a job: "Sounding Generator Repair in Ijapo Estate"', time: '15 mins ago', type: 'job' },
  { id: 'act-3', text: 'Sunday "Sumec" submitted a quote for Generator Repair', time: '22 mins ago', type: 'quote' },
  { id: 'act-4', text: 'Kelvin Amadi received a 5-star review from Dr. Femi in Alagbaka', time: '1 hour ago', type: 'review' }
];

export const AKURE_NEIGHBORHOOD_STATS = [
  { name: 'Alagbaka GRA', activePros: 42, topService: 'AC & Inverter Setup', avgResponse: '12 mins' },
  { name: 'Ijapo Estate', activePros: 35, topService: 'Generator Repair & Electrical', avgResponse: '15 mins' },
  { name: 'FUTA / South Gate', activePros: 48, topService: 'Plumbing & Laptop Repair', avgResponse: '10 mins' },
  { name: 'Oba-Ile', activePros: 29, topService: 'Carpentry & POP Painting', avgResponse: '18 mins' },
  { name: 'Oda Road Estate', activePros: 24, topService: 'Masonry & Tiling', avgResponse: '20 mins' },
  { name: 'Oke-Aro / Stadium', activePros: 31, topService: 'Auto Mechanics & Welding', avgResponse: '14 mins' }
];
