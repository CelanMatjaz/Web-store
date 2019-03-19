import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Components
import CartItem from './CartItem';

//Actions
import { incrementProductQuantity as increment } from '../../store/actions/productsActions';
import { decrementProductQuantity as decrement } from '../../store/actions/productsActions';
import { RemoveFromCart } from '../../store/actions/productsActions';


class Cart extends Component {
    render() {
        const { cartItems } = this.props;
        const items = cartItems.map((item) => 
            <CartItem 
                key={item.id} 
                data={item} 
                increment={this.props.increment} 
                decrement={this.props.decrement}
                remove={this.props.RemoveFromCart}
            />
        );

        let total = 0;
        cartItems.forEach(item => {
            total += item.cartQuantity * item.price;
        });
        
        return (
            <div className="cart">
                {items.length > 0 ? items : <h3>There are no items in your cart</h3>}
                <h2>Total: {total}€</h2>
                {items.length > 0 ? <Link className="proceed-button" to="/accept-address">Proceed</Link> : ''}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    cartItems: state.products.cartItems
});

export default connect(mapStateToProps, { increment, decrement, RemoveFromCart })(Cart);