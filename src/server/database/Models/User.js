import { Schema } from 'mongoose';
import mongoose from '../index';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: {
        type: Array,
        required: true,
        default: []
    },
    orders: {
        type: Array,
        required: true,
        default: []
    }
});

const User = mongoose.model('User', userSchema);

export default User;