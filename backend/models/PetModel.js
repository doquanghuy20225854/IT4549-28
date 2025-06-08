import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    checkIn: {
        type: String
    },
    checkOut: {
        type: String
    }
});

const Pet = mongoose.model('Pet', PetSchema);
export default Pet;