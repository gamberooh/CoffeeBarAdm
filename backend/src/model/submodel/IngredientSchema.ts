import mongoose from 'mongoose';
import AllergenSchema from './AllergenSchema';

const IngredientSchema = new mongoose.Schema({
    name: String,
    brand: String,
    allergens: [AllergenSchema]
}, { _id: false });

export { IngredientSchema };
export default IngredientSchema;
