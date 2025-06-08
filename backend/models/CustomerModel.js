import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  email: { type: String }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;