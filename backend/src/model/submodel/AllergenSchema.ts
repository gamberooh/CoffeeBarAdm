const mongoose = require('mongoose');

const AllergenSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: [
            'gluten',       // Cereals containing gluten (wheat, rye, barley, oats)
            'crustaceans',  // Prawns, crabs, lobster, crayfish
            'eggs',
            'fish',
            'peanuts',
            'soy',          // Soybeans
            'milk',         // Dairy (including lactose)
            'tree_nuts',    // Almonds, walnuts, cashews, pecans, Brazil nuts, etc.
            'celery',
            'mustard',
            'sesame',
            'sulfites',     // Sulfur dioxide and sulfites
            'lupin',
            'molluscs'      // Mussels, oysters, squid, snails
        ]
    }
}, { _id: false });

export default AllergenSchema;