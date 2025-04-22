
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'hoodie' | 'jeans' | 'accessory';
  image: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  stock: number;
  material?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Comfort Hoodie',
    description: 'Our bestselling hoodie made from premium cotton blend. Features a comfortable fit with a lined hood for extra warmth.',
    price: 59.99,
    category: 'hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1565693413579-8a448019f70b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    stock: 50,
    material: '80% Cotton, 20% Polyester',
    featured: true
  },
  {
    id: 2,
    name: 'Vintage Slim Jeans',
    description: 'Classic vintage-inspired jeans with a slim fit. Made from sustainable denim that gets better with age.',
    price: 89.99,
    category: 'jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Dark Blue', 'Black'],
    stock: 35,
    material: '99% Cotton, 1% Elastane',
    featured: true
  },
  {
    id: 3,
    name: 'Premium Watch',
    description: 'Elegant timepiece with a stainless steel case and premium leather band. Water-resistant up to 50 meters.',
    price: 149.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80',
    ],
    colors: ['Silver/Black', 'Gold/Brown'],
    stock: 15,
    featured: true
  },
  {
    id: 4,
    name: 'Oversized Hoodie',
    description: 'Trendy oversized hoodie with drop shoulders and a relaxed fit. Perfect for a casual, street-style look.',
    price: 64.99,
    category: 'hoodie',
    image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Off White', 'Sage Green'],
    stock: 40,
    material: '70% Cotton, 30% Polyester'
  },
  {
    id: 5,
    name: 'Distressed Skinny Jeans',
    description: 'Modern skinny jeans with distressed details. High-waisted design with stretch for ultimate comfort.',
    price: 79.99,
    category: 'jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80',
    ],
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Light Blue', 'Medium Blue'],
    stock: 25,
    material: '98% Cotton, 2% Elastane'
  },
  {
    id: 6,
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Slim profile fits comfortably in your pocket.',
    price: 49.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    ],
    colors: ['Brown', 'Black'],
    stock: 30
  },
  {
    id: 7,
    name: 'Tech Hoodie',
    description: 'Innovative hoodie with hidden pockets for your devices and headphone cable routing. Made with quick-dry fabric.',
    price: 89.99,
    category: 'hoodie',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black'],
    stock: 20,
    material: '65% Cotton, 35% Technical Polyester'
  },
  {
    id: 8,
    name: 'Relaxed Fit Jeans',
    description: 'Comfortable relaxed fit jeans with a straight leg. Perfect everyday jeans with just the right amount of stretch.',
    price: 69.99,
    category: 'jeans',
    image: 'https://images.unsplash.com/photo-1604176424472-9d0da55a1637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1604176424472-9d0da55a1637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Medium Wash', 'Dark Wash'],
    stock: 45,
    material: '99% Cotton, 1% Elastane'
  },
  {
    id: 9,
    name: 'Beanie Hat',
    description: 'Soft knit beanie hat made from premium wool blend. Keeps you warm while adding style to your winter outfit.',
    price: 24.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1599032909756-5deb82fea3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80',
    ],
    colors: ['Black', 'Gray', 'Burgundy', 'Navy'],
    stock: 60,
    material: '60% Wool, 40% Acrylic'
  },
  {
    id: 10,
    name: 'Zip-Up Hoodie',
    description: 'Versatile zip-up hoodie with a modern fit. Features kangaroo pockets and ribbed cuffs for added comfort.',
    price: 54.99,
    category: 'hoodie',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80',
      'https://images.unsplash.com/photo-1613592141521-456ca7717e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Navy'],
    stock: 30,
    material: '75% Cotton, 25% Polyester'
  },
  {
    id: 11,
    name: 'Straight Leg Jeans',
    description: 'Classic straight leg jeans with a mid-rise waist. Timeless style that pairs well with any top.',
    price: 74.99,
    category: 'jeans',
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=789&q=80',
    images: [
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=789&q=80',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Dark Blue'],
    stock: 38,
    material: '100% Cotton'
  },
  {
    id: 12,
    name: 'Sunglasses',
    description: 'Stylish polarized sunglasses with UV protection. Lightweight frame with a classic design that suits most face shapes.',
    price: 39.99,
    category: 'accessory',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    ],
    colors: ['Black', 'Tortoise Shell'],
    stock: 50
  }
];
