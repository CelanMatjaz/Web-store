import React from 'react';
import { Route, Switch } from 'react-router-dom'; 

//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import UserAddresses from './components/cart/UserAddresses';
import Account from './components/account/Account';
import AddAddress from './components/account/AddAddress';
import Payment from './components/cart/Payment';
import Checkout from './components/cart/Checkout';
import UpdateAddress from './components/account/UpdateAddress';
import Orders from './components/account/Orders';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Products}/>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/accept-address" component={UserAddresses}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/account/add-address" component={AddAddress}/>
            <Route exact path="/account/update-address" component={UpdateAddress}/>
            <Route exact path="/payment" component={Payment}/>
            <Route exact path="/checkout" component={Checkout}/>
            <Route exact path="/account/orders" component={Orders}/>
        </Switch>
    );
};

export default Routes;