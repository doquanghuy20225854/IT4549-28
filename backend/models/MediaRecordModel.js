import mongoose from "mongoose";

const MediaRecordSchema = new mongoose.Schema({
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String
    }
});

const MediaRecord = mongoose.model("MediaRecord", MediaRecordSchema);
export default MediaRecord;