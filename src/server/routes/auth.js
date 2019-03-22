import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/Models/User';
import Order from '../database/Models/Order';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import { getToken } from './middleware';

const salt = bcrypt.genSaltSync(10);
const secret = 'secret'

const router = express.Router();

//Register user
router.post('/register', express.json(), (req, res) => {
    const { username, password, passwordRepeat } = req.body;
    //Check if all values don't exist
    if(!(username && password && passwordRepeat)) res.json({errors: ['One or more fields are empty'], status: 'Register_fail'});

    else{
        const errors = [];
        if(password !== passwordRepeat) errors.push('Passwords do not match');
        //Tries to find a user with that username
        User.find({username}, (err, arr) => {
            //If it finds none, makes new user object from username and password
            if(arr.length === 0 && errors.length === 0){
                const newUser = new User({
                    username,
                    password: bcrypt.hashSync(password, salt),
                    addresses: []
                });
                //Saves the new user object in db
                newUser.save(err => {
                    if(err){
                        res.json({errors: ['Could not add user'], status: 'Register_fail'});
                        console.log(err);
                    }
                    else{
                        res.json({msg: 'User successfully created', status: 'Register_success'});
                    }
                });
            } 
            //If it finds a user with that username, it sends an error that says username already exists
            else{
                errors.push('Username already exists');
                res.json({errors: errors.reverse(), status: 'Register_fail'});
            }
        });
    }
});

//User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    //Finds a user with the specific username
    User.findOne({username: username}, (err, user) => {
        //If it does not find any user with that username, sends error
        if(!user) res.json({errors: ['Username does not exist'], status: 'Login_fail'});
        //If it finds a user with the username, but the passwords do not match, sends error
        else if(!bcrypt.compareSync(password, user.password)) res.json({errors: ['Wrong password'], status: 'Login_fail'});
        //If none of the previous checks aren't true, logs user in and sends token
        else {
            const { _id, username, addresses } = user;
            const token = jwt.sign({
                data: { id: _id, username }
            }, secret, { expiresIn:  2592000});
            res.json({msg: 'User logged in', token, userInfo: {id: _id, username, addresses}, status: 'Login_success'});
        }
    });
});

//Checks if user is logged in
router.post('/check-login', getToken, (req, res) => {
    //Check if token is valid
    jwt.verify(req.token, secret, (err, decoded) => {
        //Check if the token really is valid
        if(err){
            res.json({status: 'Login_check_failed'});            
        }
        else{
            //Get user id from decoded data from token
            const { id } = decoded;
            //Find a user with the id
            User.findById(id, (err, user) => {
                //Check if the user exists
                if(err || !user){
                    res.json({status: 'Login_check_failed'});
                }
                else{
                    res.json({status: 'Login_check_success', userInfo: {id: user._id, username: user.username, addresses: user.addresses}});
                }
            });            
        }
    });
});

//Adds address to a user
router.post('/add-address', getToken, (req, res) => {
    const { address } = req.body;
    const { street, zipCode, number, city, country } = address;
    //Check if all the properties are filled
    if(street && zipCode && number && city && country)
        //Check if token is valid
        jwt.verify(req.token, secret, (err, decoded) => {
            //Check if the token really is valid
            if(err){
                res.json({status: 'Add_address_failed'});            
            }
            else{
                //Get user id from decoded data from token
                const { id } = decoded.data;
                //Find a user with the id
                User.findById(id, (err, user) => {
                    //Check if user really exists
                    if(err || !user){
                        res.json({status: 'Add_address_failed'});
                    }
                    else{
                        //Generation of id
                        address.id = shortid.generate();
                        //Add address to addresses array of user
                        user.addresses.push(address);
                        //Check if there are more than 5 addresses 
                        if(user.addresses.length > 5) res.json({status: 'Add_address_failed', error: 'You can only have at most 5 adresses saved at once'})
                        else
                            //Find the user record again and update it with new address
                            User.findByIdAndUpdate(id, user, err => {
                                if(err) res.json({status: 'Add_address_failed'});
                                else res.json({status: 'Add_address_success', userInfo: {id: user._id, username: user.username, addresses: user.addresses}});
                            });
                    }
                });            
            }
        });
    else res.json({status: 'Update_address_failed'});
});

//Updates a user's address
router.put('/update-address', getToken, (req, res) => {
    const { address } = req.body;
    const { addressID, street, zipCode, number, city, country } = address;
    //Check if all the properties are filled
    if(addressID && street && zipCode && number && city && country)
        //Check if token is valid
        jwt.verify(req.token, secret, (err, decoded) => {
            //Check if the token really is valid
            if(err){
                res.json({status: 'Update_address_failed'});            
            }
            else{
                //Get user id from decoded data from token
                const { id } = decoded.data;
                //Find a user with the id
                User.findById(id, (err, user) => {
                    //Check if user really exists
                    if(err || !user){
                        res.json({status: 'Update_address_failed'});
                    }
                    else{
                        let updated = false;
                        //Go through each address and find the one with the same id, then when it finds it it overriddes all the properties
                        user.addresses.forEach(address => {
                            if(address.id === addressID){
                                updated = true;
                                address.street = street;
                                address.zipCode = zipCode;
                                address.city = city;
                                address.country = country;
                                address.number = number;                            
                            }
                        });
                        //Find the user record again and update it with the updated address
                        User.findByIdAndUpdate(id, user, err => {
                            if(err || !updated) res.json({status: 'Update_address_failed'});
                            else res.json({status: 'Update_address_success', userInfo: {id: user._id, username: user.username, addresses: user.addresses}});
                        });
                    }
                });            
            }
        });
    else res.json({status: 'Update_address_failed'});
});

//Delete a user's address
router.delete('/delete-address', getToken, (req, res) => {
    const { addressID } = req.body;
    //Check if token is valid
    jwt.verify(req.token, secret, (err, decoded) => {
        //Check if the token really is valid
        if(err){
            res.json({status: 'Delete_address_failed'});            
        }
        else{
            //Get user id from decoded data from token
            const { id } = decoded.data;
            //Find a user with the id
            User.findById(id, (err, user) => {
                //Check if user really exists
                if(err || !user){
                    res.json({status: 'Delete_address_failed'});
                }
                else{
                    //Filters out the address with the id
                    user.addresses = user.addresses.filter(address => address.id !== addressID);
                    //Find the user record again and update it without the deleted address
                    User.findByIdAndUpdate(id, user, err => {
                        if(err) res.json({status: 'Delete_address_failed'});
                        else res.json({status: 'Delete_address_success', userInfo: {id: user._id, username: user.username, addresses: user.addresses}});
                    });
                }
            });
        }
    });
});

//Sends a users orders
router.get('/account-orders', getToken, (req, res) => {
    //Check if token is valid
    jwt.verify(req.token, secret, (err, decoded) => {
        //Check if the token really is valid
        if(err){
            res.status(401);
            res.json({error: 'Unauthorized'});            
        }
        else{
            //Find all orders with the user id and send them
            Order.find({ userID: decoded.data.id }, (err, orders) => {
                res.json(orders);
            });
        }           
    });
})

export default router;
