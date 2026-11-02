import mongoose from 'mongoose';

export interface IBeverageAllergen {
    id: string;
    label: string;
    isWarning?: boolean;
}

const AllergenSchema = new mongoose.Schema<IBeverageAllergen>({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    isWarning: {
        type: Boolean
    }
}, { _id: false });

export default AllergenSchema;
