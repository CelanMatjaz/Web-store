import Product from './Models/Product';
import Order from '../database/Models/Order';
import User from '../database/Models/User';

import products from './products';

const ResetDB = () => {
    Order.deleteMany({}, () => console.log('Wiped Order'));
    User.deleteMany({}, () => console.log('Wiped User'));
    Product.deleteMany({}, () => console.log('Wiped Product'));
    //Add products to product table
    products.forEach(product => {
        const prod = new Product({
            name: product.name,
            image: product.image,
            quantity: product.quantity,
            id: product.ID,
            price: product.price
        })
        prod.save();
    });

    return;
}

export default ResetDB;
