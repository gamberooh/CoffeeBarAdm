import type { Ingredient } from './submodel/ingredient.dto.schema'

export interface BeverageResponse {
    id: string;
    name: string;
    description?: string;
    price: number;
    alcoholic: boolean;
    ingredients: Ingredient[];
}

export interface BeverageRequest {
    name: string;
    description?: string;
    price: number;
    alcoholic: boolean;
    ingredients: Ingredient[];
}