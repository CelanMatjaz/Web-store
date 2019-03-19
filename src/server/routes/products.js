import express from 'express';
import Product from '../database/Models/Product';
import Order from '../database/Models/Order';
import User from '../database/Models/User';
import { getToken } from './middleware';
import jwt from 'jsonwebtoken';

const secret = 'secret'

const router = express.Router();

//Make new order
router.post('/order', getToken, (req, res) => {
    //Check token
    jwt.verify(req.token, secret, (err, decoded) => {
        if(err) res.json({status: 'Order_not_confirmed'});
        else{
            //Check for user with the id on the token
            User.findById(decoded.data.id, (err, user) => {
                //Check if user really exists
                if(err) res.json({status: 'Order_not_confirmed'});
                else{
                    const { address, cartItems } = req.body.order;
                    //Make new order
                    const newOrder = new Order({
                        date: new Date(),
                        address,
                        products: cartItems,
                        userID: decoded.data.id
                    });

                    var orderOK = true;
                    //Go through every item and check if the bought quantity isn't more than the quantity stored in db
                    cartItems.forEach(item => {
                        //Find a products the the items id
                        Product.findOne({id: item.id}, (err, product) => {
                            //Check if it doesn't find one or the bought quantity exceeds the db quantity
                            if(err || product.quantity - item.cartQuantity < 0){
                                orderOK = false;
                                return;
                            }
                            //New quantity to be stored in Product record
                            product.quantity -= item.cartQuantity;
                            //Saves the quantity in the record
                            Product.findOneAndUpdate({ id: product.id }, product, (err) => {
                                if(err) orderOK = false;
                            });
                        });
                    });
                    //Checks if there was anything wrong with the order
                    if(orderOK){
                        //If everything is OK, saves the user
                        newOrder.save(err => {
                            if(err) res.json({status: 'Order_not_confirmed'});
                            else{
                                res.json({status: 'Order_confirmed'});
                            }
                        });
                    }
                    else{
                        res.json({status: 'Order_not_confirmed'});
                    }                    
                }
            });
        }   
    });
});

export default router;