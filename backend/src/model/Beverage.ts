import mongoose from 'mongoose';
import { IngredientSchema } from './submodel/IngredientSchema';
import AllergenSchema, { type IBeverageAllergen } from './submodel/AllergenSchema';
import type { IBeverageIngredient } from './submodel/IngredientSchema';

export type CategoryId = 'all' | 'beverages' | 'cakes' | 'cookies' | 'sandwiches';

export interface IBeverageDocument {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CategoryId;
    categoryLabel: string;
    ingredients: IBeverageIngredient[];
    allergens: IBeverageAllergen[];
}

const beverageSchema = new mongoose.Schema<IBeverageDocument>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['all', 'beverages', 'cakes', 'cookies', 'sandwiches']
    },
    categoryLabel: {
        type: String,
        required: true
    },
    ingredients: {
        type: [IngredientSchema],
        required: true
    },
    allergens: {
        type: [AllergenSchema],
        required: true
    }
});

export const Beverage = mongoose.model<IBeverageDocument>('Beverage', beverageSchema);
export default Beverage;
