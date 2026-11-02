export type CategoryId = 'all' | 'beverages' | 'cakes' | 'cookies' | 'sandwiches';

export interface Allergen {
  id: string;
  label: string;
  isWarning?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  brand: string;
}

// export interface ProductCustomizationOption {
//   id: string;
//   label: string;
//   priceExtra?: number;
// }

// export interface ProductCustomizationGroup {
//   id: string;
//   title: string;
//   options: ProductCustomizationOption[];
//   selectedOptionId: string;
// }

export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryId;
  categoryLabel: string;
  ingredients: Ingredient[];
  allergens: Allergen[];
}

export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: CategoryId;
  categoryLabel: string;
  ingredients: Ingredient[];
  allergens: Allergen[];  
}

// export interface Product {
//   id: string;
//   title: string;
//   subtitle?: string;
//   description: string;
//   price: number;
//   originalPrice?: number;
//   imageUrl: string;
//   thumbnails?: string[];
//   category: CategoryId;
//   categoryLabel: string;
//   rating: number;
//   reviewCount: number;
//   isAlcoholic: boolean;
//   alcoholicDetails?: string;
//   allergens: Allergen[];
//   tags: string[];
//   tastingNotes?: {
//     description: string;
//     roastLevel?: string;
//     brewTemp?: string;
//     caffeineMg?: number;
//   };
//   ingredients?: Ingredient[];
//   customizationGroups?: ProductCustomizationGroup[];
// }

export interface CategoryFilter {
  id: CategoryId;
  label: string;
  icon: string;
  count: number;
}