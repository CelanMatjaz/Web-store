import React, { Component } from 'react';

class OrderItem extends Component {
    render() {
        const { name, image, quantity, cartQuantity, id, price } = this.props.data;
        return (
            <div className="cart-item">
                <div className="image">
                    <img src={`/${image}.jpg`} alt=""/>
                </div>
                <div  className="item-data">
                    <div className="product-name"><h3>{name}</h3></div>
                    <div className="product-quantity"><b>Price</b>: {price}€</div> 
                    <div>
                        <div className="cart-quantity">Items bought: {cartQuantity}, <b>Total: </b> {cartQuantity * price}€</div>
                    </div> 
                </div> 
            </div>
        );
    }
}

export default OrderItem;