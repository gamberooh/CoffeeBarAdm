import mongoose from 'mongoose';

export interface IBeverageIngredient {
    id: string;
    name: string;
    description: string;
    brand: string;
}

const IngredientSchema = new mongoose.Schema<IBeverageIngredient>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
}, { _id: false });

export { IngredientSchema };
export default IngredientSchema;
