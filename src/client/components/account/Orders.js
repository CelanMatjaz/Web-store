import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
 
//Components
import Order from './Order';

//Actions
import { action_getUserOrders } from '../../store/actions/authActions';

class Orders extends Component {
    componentDidMount(){
        this.props.action_getUserOrders();
    }

    render() {
        const orders = this.props.orders.map(order => <Order data={order} key={order._id}/>);
        if(this.props.isEmpty) return <Redirect to="/"/>
        console.log(this.props.orders);

        return (
            <div className="account">
                {orders.length > 0 ? orders : 'You have no past orders'}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.auth.userOrders,
    isEmpty: state.auth.isEmpty
});

export default withRouter(connect(mapStateToProps, { action_getUserOrders })(Orders));

