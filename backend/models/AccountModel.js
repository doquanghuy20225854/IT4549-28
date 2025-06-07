import mongoose from 'mongoose';
import {genSalt, hash} from 'bcrypt';

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
        enum: ['admin', 'doctor', 'staff', 'user'],
        require: true,
        default: 'user'
    }
});

AccountSchema.pre('save', async function(next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

const Account = mongoose.model('Account', AccountSchema);
export default Account;

