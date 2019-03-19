import { Schema } from 'mongoose';
import mongoose from '../index';

const productSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: 0,
        min: 0
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;