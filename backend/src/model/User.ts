import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: { type: String, default: '' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  surname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  gender: {
    type: String,
    enum: ['m', 'f', 'other'],
    default: 'other'
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest',
    required: true
  },
  
  purchasedBeverage: [{   // Per tenere traccia delle visite acquistate dall'utente 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beverage'
  }],

  assets: {
    profilePicture: ImageSchema
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export default User;
