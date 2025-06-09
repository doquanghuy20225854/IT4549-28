import mongoose from "mongoose";

const MediaRecordSchema = new mongoose.Schema({
    pet: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Chờ xử lý', 'Đã xác nhận', 'Hoàn tất', 'Đã hủy'],
        required: true
    }
});

const MediaRecord = mongoose.model("MediaRecord", MediaRecordSchema);
export default MediaRecord;