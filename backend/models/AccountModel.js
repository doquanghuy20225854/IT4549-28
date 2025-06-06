import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String
    },
    fullname: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'staff', 'owner'],
        require: true,
        default: 'owner'
    }
});

const Account = mongoose.model('Account', AccountSchema);
export default Account;

