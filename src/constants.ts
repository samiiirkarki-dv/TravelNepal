export interface Destination {
  id: string;
  name: string;
  image: string;
  category: 'Mountains' | 'Jungle' | 'Culture' | 'Spiritual' | 'Adventure';
  description: string;
  price: number;
  rating: number;
}

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'PHEWA LAKE POKHARA',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
    category: 'Mountains',
    description: 'The city of lakes and gateway to the Annapurna range. Experience the serenity of Phewa Lake and the majesty of Machhapuchhre (Fishtail).',
    price: 899,
    rating: 4.9
  },
  {
    id: '2',
    name: 'CHITWAN NATIONAL PARK',
    image: 'https://images.unsplash.com/photo-1529927066849-79b791a69825?q=80&w=1600&auto=format&fit=crop',
    category: 'Jungle',
    description: 'Explore the dense subtropical jungles of the Terai. Home to the rare one-horned rhinoceros and the elusive Royal Bengal tiger.',
    price: 650,
    rating: 4.7
  },
  {
    id: '3',
    name: 'LUMBINI SACRED GARDEN',
    image: 'https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=1600&auto=format&fit=crop',
    category: 'Spiritual',
    description: 'The sacred birthplace of Lord Buddha. A UNESCO World Heritage site of profound peace, ancient monasteries, and spiritual enlightenment.',
    price: 450,
    rating: 4.8
  },
  {
    id: '4',
    name: 'KATHMANDU DURBAR SQUARE',
    image: 'https://images.unsplash.com/photo-1582650859079-ee6391318a45?q=80&w=1600&auto=format&fit=crop',
    category: 'Culture',
    description: 'The historic heart of Nepal. A valley of ancient temples, vibrant squares, and a rich tapestry of Newari traditions and architecture.',
    price: 550,
    rating: 4.6
  },
  {
    id: '5',
    name: 'EVEREST BASE CAMP TREK',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1600&auto=format&fit=crop',
    category: 'Mountains',
    description: 'The ultimate trekking destination. Stand at the foot of the world\'s highest peak, Sagarmatha, and witness the grandeur of the Khumbu.',
    price: 1899,
    rating: 5.0
  },
  {
    id: '6',
    name: 'LO MANTHANG MUSTANG',
    image: 'https://images.unsplash.com/photo-1518118014377-ce94f3ba964e?q=80&w=1600&auto=format&fit=crop',
    category: 'Adventure',
    description: 'The forbidden kingdom of Lo. A remote trans-Himalayan region with a unique Tibetan-influenced culture and desert-like landscape.',
    price: 2500,
    rating: 5.0
  }
];

export const GALLERY_IMAGES = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200', category: 'Nature' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1526716173434-a2b5ad15368a?auto=format&fit=crop&w=1200', category: 'Nature' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&w=1200', category: 'Spiritual' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1582650859079-ee6391318a45?auto=format&fit=crop&w=1200', category: 'Culture' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200', category: 'Adventure' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200', category: 'Culture' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1526716173434-a2b5ad15368a?auto=format&fit=crop&w=1200', category: 'Adventure' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1506191652687-0237b1f24c81?auto=format&fit=crop&w=1200', category: 'Nature' },
  { id: 'g9', url: 'https://images.unsplash.com/photo-1518118014377-ce94f3ba964e?auto=format&fit=crop&w=1200', category: 'Culture' },
  { id: 'g10', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200', category: 'Spiritual' },
  { id: 'g11', url: 'https://images.unsplash.com/photo-1526716173434-a2b5ad15368a?auto=format&fit=crop&w=1200', category: 'Nature' },
  { id: 'g12', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200', category: 'Adventure' },
];


