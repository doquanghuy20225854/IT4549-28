import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    time: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true, default: 'Chờ xử lý' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
