// Mock data for Gamify gaming currency shop

export const games = [
  {
    id: 'valorant',
    name: 'Valorant',
    slug: 'valorant',
    description: 'Tactical 5v5 character-based shooter',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    gradient: 'from-red-500/20 to-pink-500/20',
    accentColor: '#FF4655',
    currencies: [
      { id: 'vp-475', name: '475 VP', price: 4.99, popular: false },
      { id: 'vp-1000', name: '1000 VP', price: 9.99, popular: true },
      { id: 'vp-2050', name: '2050 VP', price: 19.99, popular: false },
      { id: 'vp-3650', name: '3650 VP', price: 34.99, popular: true },
      { id: 'vp-5350', name: '5350 VP', price: 49.99, popular: false },
      { id: 'vp-11000', name: '11000 VP', price: 99.99, popular: false }
    ]
  },
  {
    id: 'mobile-legends',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    description: 'Ultimate 5v5 MOBA experience',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#00D4FF',
    currencies: [
      { id: 'ml-86', name: '86 Diamonds', price: 1.99, popular: false },
      { id: 'ml-172', name: '172 Diamonds', price: 3.99, popular: false },
      { id: 'ml-257', name: '257 Diamonds', price: 4.99, popular: true },
      { id: 'ml-706', name: '706 Diamonds', price: 14.99, popular: true },
      { id: 'ml-2195', name: '2195 Diamonds', price: 44.99, popular: false },
      { id: 'ml-4390', name: '4390 Diamonds', price: 89.99, popular: false }
    ]
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    description: 'Open-world action RPG adventure',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: '#FFB13B',
    currencies: [
      { id: 'gi-60', name: '60 Genesis Crystals', price: 0.99, popular: false },
      { id: 'gi-330', name: '330 Genesis Crystals', price: 4.99, popular: false },
      { id: 'gi-1090', name: '1090 Genesis Crystals', price: 14.99, popular: true },
      { id: 'gi-2240', name: '2240 Genesis Crystals', price: 29.99, popular: true },
      { id: 'gi-3880', name: '3880 Genesis Crystals', price: 49.99, popular: false },
      { id: 'gi-8080', name: '8080 Genesis Crystals', price: 99.99, popular: false }
    ]
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    slug: 'fortnite',
    description: 'Battle Royale phenomenon',
    image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=800&q=80',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accentColor: '#9D4DFF',
    currencies: [
      { id: 'fn-1000', name: '1000 V-Bucks', price: 7.99, popular: false },
      { id: 'fn-2800', name: '2800 V-Bucks', price: 19.99, popular: true },
      { id: 'fn-5000', name: '5000 V-Bucks', price: 31.99, popular: false },
      { id: 'fn-13500', name: '13500 V-Bucks', price: 79.99, popular: true }
    ]
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    slug: 'league-of-legends',
    description: 'Premier MOBA experience',
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&q=80',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    accentColor: '#C89B3C',
    currencies: [
      { id: 'lol-650', name: '650 RP', price: 5.00, popular: false },
      { id: 'lol-1380', name: '1380 RP', price: 10.00, popular: true },
      { id: 'lol-2800', name: '2800 RP', price: 20.00, popular: false },
      { id: 'lol-5600', name: '5600 RP', price: 35.00, popular: true },
      { id: 'lol-11000', name: '11000 RP', price: 65.00, popular: false }
    ]
  },
  {
    id: 'pubg-mobile',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    description: 'Intense battle royale action',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b46?w=800&q=80',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    accentColor: '#F2A900',
    currencies: [
      { id: 'pubg-60', name: '60 UC', price: 0.99, popular: false },
      { id: 'pubg-325', name: '325 UC', price: 4.99, popular: false },
      { id: 'pubg-660', name: '660 UC', price: 9.99, popular: true },
      { id: 'pubg-1800', name: '1800 UC', price: 24.99, popular: true },
      { id: 'pubg-3850', name: '3850 UC', price: 49.99, popular: false }
    ]
  }
];

export const features = [
  {
    id: 1,
    title: 'Instant Delivery',
    description: 'Get your game currency within minutes after purchase confirmation',
    icon: 'Zap'
  },
  {
    id: 2,
    title: 'Secure Payments',
    description: 'Your transactions are protected with industry-leading encryption',
    icon: 'Shield'
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'Our team is always ready to assist you with any questions',
    icon: 'Headphones'
  },
  {
    id: 4,
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts and promotions',
    icon: 'Tag'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'AC',
    game: 'Valorant',
    rating: 5,
    comment: 'Super fast delivery! Got my VP within 2 minutes. Will definitely buy again.'
  },
  {
    id: 2,
    name: 'Sarah Kim',
    avatar: 'SK',
    game: 'Genshin Impact',
    rating: 5,
    comment: 'Best prices I\'ve found for Genesis Crystals. The process was seamless.'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    avatar: 'MJ',
    game: 'Mobile Legends',
    rating: 5,
    comment: 'Customer support helped me instantly when I had a question. Amazing service!'
  }
];

export const stats = [
  { id: 1, value: '500K+', label: 'Happy Customers' },
  { id: 2, value: '2M+', label: 'Orders Completed' },
  { id: 3, value: '99.9%', label: 'Success Rate' },
  { id: 4, value: '24/7', label: 'Support Available' }
];