import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Payment = props => {
    const { isEmpty, cartItemNumber } = props;
    if(isEmpty || cartItemNumber <= 0) return <Redirect to="/"/>

    return (
        <div className="payment">
            <form>
                <h3>Fake payment(doesn't do anything)</h3>
                <label htmlFor="card-num">Card number</label>
                <input type="text" id="card-num"/>
                <Link to="checkout">Proceed</Link>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty,
    cartItemNumber: state.products.cartItems.length
});

export default connect(mapStateToProps)(Payment);