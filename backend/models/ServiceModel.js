import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staff: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
})

const Service = mongoose.model("Service", ServiceSchema);
export default Service;