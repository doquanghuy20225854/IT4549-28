import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    }
});

const Pet = mongoose.model('Pet', PetSchema);
export default Pet;