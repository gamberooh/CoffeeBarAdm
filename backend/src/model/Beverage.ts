import mongoose from 'mongoose';
import { IngredientSchema } from './submodel/IngredientSchema';

export interface IBeverageIngredient {
    name: string;
    brand: string;
}

export interface IBeverageDocument {
    name: string;
    description?: string;
    price: number;
    alcoholic: boolean;
    ingredients: IBeverageIngredient[];
}

const beverageSchema = new mongoose.Schema<IBeverageDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    alcoholic: {
        type: Boolean,
        required: true
    },
    ingredients: [IngredientSchema]
});

export const Beverage = mongoose.model<IBeverageDocument>('Beverage', beverageSchema);
export default Beverage;
