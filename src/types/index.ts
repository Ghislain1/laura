export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  category: 'fish' | 'chicken' | 'sides' | 'drinks';
  image: string;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  popular?: boolean;
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  nameEn: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  selectedOptions?: ProductOption[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  commentEn: string;
  date: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface DeliveryZone {
  name: string;
  price: number;
  minOrder: number;
  time: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation';

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  instructions: string;
  timeSlot: string;
}
