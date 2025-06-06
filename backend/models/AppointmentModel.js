import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String
    },
    doctors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
