import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

//Components
import CartItem from './CartItem';
import Address from './Address';
import ErrorMessage from '../layout/ErrorMessage';
import Message from '../layout/Message';

//Actions
import { incrementProductQuantity as increment } from '../../store/actions/productsActions';
import { decrementProductQuantity as decrement } from '../../store/actions/productsActions';
import { RemoveFromCart, action_placeOrder, action_resetOrderErrors } from '../../store/actions/productsActions';

class Checkout extends Component {
    state = {
        cartItems: []
    }

    componentDidMount(){
        this.props.action_resetOrderErrors();
        this.setState({
            cartItems: this.props.cartItems
        });
    }

    handlePlaceOrder = () => {
        const address = this.props.addresses.filter(address => address.id === this.props.activeAddressID)[0];
        const { cartItems } = this.props;
        const order = { address, cartItems };
        this.props.action_placeOrder(order);
    }

    render() {        
        if(!this.props.cartItems || !this.props.addresses || !this.props.activeAddressID)
            return <Redirect to="/"/>

        if(this.props.cartItems.length === 0 && !this.props.checkoutLoading)
            return <Redirect to="/cart"/>

        const cartItems = this.state.cartItems.map(item => 
            <CartItem 
                key={item.id} 
                data={item} 
                increment={this.props.increment} 
                decrement={this.props.decrement}
                remove={this.props.RemoveFromCart}
                dontShowAllButtons={true}
            />
        );
        
        const address = this.props.addresses.filter(address => address.id === this.props.activeAddressID)[0];
        return (
            <div className="checkout">
                {this.props.orderMsg ? <Message message={this.props.orderMsg}/> : ''}
                {this.props.orderError ? <ErrorMessage message={this.props.orderError}/> : ''}
                {this.props.orderMsg ? '' : <button onClick={this.handlePlaceOrder} style={{marginBottom: '10px'}}>Order</button>}
                <h3>Delivery address:</h3>
                <Address address={address} dontShowButtons={true}/>
                <h3 style={{marginBottom: '10px '}}>Items:</h3>
                {cartItems}
                {this.props.orderMsg ? '' : <button onClick={this.handlePlaceOrder}>Order</button>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cartItems: state.products.cartItems,
    addresses: state.auth.userInfo.addresses,
    activeAddressID: state.auth.activeAddressID,
    checkoutLoading: state.products,
    orderMsg: state.products.orderMsg,
    orderError: state.products.orderError
});

export default withRouter(connect(mapStateToProps, { increment, decrement, RemoveFromCart, action_placeOrder, action_resetOrderErrors })(Checkout));
