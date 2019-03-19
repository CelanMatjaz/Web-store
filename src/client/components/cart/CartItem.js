import React, { Component } from 'react';

class CartItem extends Component {
    render() {
        const { name, image, quantity, cartQuantity, id, price } = this.props.data;
        return (
            <div className="cart-item">
                <div className="image">
                    <img src={`/${image}.jpg`} alt=""/>
                </div>
                <div  className="item-data">
                    <div className="product-name"><h3>{name}</h3></div>
                    <div className="product-quantity"><b>Left in stock</b>: {quantity}, <b>Price</b>: {price}€ </div> 
                    <div>
                        <div className="cart-quantity">Quantity of the item in your cart: {cartQuantity}, <b>Total: </b> {cartQuantity * price}€</div>
                        {this.props.dontShowAllButtons ? '' :
                            <>
                                <button onClick={() => {if(quantity > cartQuantity) this.props.increment(id);}}>Add an item</button> 
                                <button onClick={() => {
                                    if(cartQuantity === 1) this.props.remove(id);
                                    else this.props.decrement(id);
                                }}>Remove an item</button>   
                                <button onClick={() => this.props.remove(id)}>Remove all</button> 
                            </>
                        }    
                    </div> 
                </div> 
            </div>
        );
    }
}

export default CartItem;