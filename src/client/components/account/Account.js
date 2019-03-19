import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

//Componets
import Address from '../cart/Address';

//Actions
import { 
    action_updateAddress, 
    action_deleteAddress
} from '../../store/actions/authActions';

class Account extends Component {
    render() {
        if(this.props.auth.isEmpty) return <Redirect to="/"/>

        const addresses = this.props.auth.userInfo.addresses.map(address => {
            return <Address key={address.id} address={address} delete={this.props.action_deleteAddress}/>
        });

        return (
            <div className="account">
                <div className="account-details">
                    <div className="account-image">Spot for image</div>
                    <div className="account-description">
                        <h2>Username: {this.props.auth.userInfo.username}</h2>
                        other stuff...
                    </div>
                </div>
                <div className="account-addresses">
                    <h3>Addresses:</h3>

                    {addresses.length > 0 ? addresses : <p>You have no addresses saved</p>}
                    <Link to="/account/add-address">Add an address</Link> <br/>
                    <Link to="/account/orders">See past orders</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { action_updateAddress, action_deleteAddress })(Account);