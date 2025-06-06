import mongoose from 'mongoose';

const CanPerformSchema = mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        require: true
    }
});

const CanPerform = mongoose.model('CanPerform', CanPerformSchema);
export default CanPerform;

