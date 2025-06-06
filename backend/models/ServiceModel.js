import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
})

const Service = mongoose.model("Service", ServiceSchema);
export default Service;