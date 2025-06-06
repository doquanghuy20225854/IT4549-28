import mongoose from 'mongoose';

const IsAssignedToSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }
});

const IsAssignedTo = mongoose.model('IsAssignedTo', IsAssignedToSchema);

export default IsAssignedTo;
