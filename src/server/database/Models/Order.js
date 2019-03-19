import { Schema } from 'mongoose';
import mongoose from '../index';

const orderSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    //Products should be stored only with their IDs, but i'm storing the whole objects
    products: {
        type: Array,
        required: true,
        default: []
    },
    //Address should be stored with only the ID, but i'm storing the whole address
    address: {
        type: Object,
        required: true,
        default: {}
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;