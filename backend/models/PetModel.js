import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    }, 
    age: {
        type: Number
    },
    species: {
        type: String
    }
});

const Pet = mongoose.model('Pet', PetSchema);
export default Pet;