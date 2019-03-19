import React from 'react';

//Components
import Address from '../cart/Address';
import OrderItem from './OrderItem';

const Order = props => {
    const cartItems = props.data.products.map(item => <OrderItem key={item.id} data={item} dontShowButtons={true}/>);
    const date = props.data.date.slice(0, 10);
    let value = 0;
    props.data.products.forEach(item => {
        value += item.price;
    });
    return (
        <div>
            <h2 style={hStyle}>Address</h2>
            <Address address={props.data.address} dontShowButtons={true}/>
            <h2 style={hStyle}>Items</h2>
            {cartItems}
            <small>{date}</small> <h2>Total value: {value}€</h2>
            <hr/>
        </div>
    );
};

export default Order;

const hStyle = {
    marginBottom: '6px'
}
