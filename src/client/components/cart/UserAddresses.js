import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

//Components
import Address from './Address';

//Actions
import { action_makeAddressActive, action_deleteAddress } from '../../store/actions/authActions';

class UserAddresses extends Component {
    render() {
        if(this.props.auth.isEmpty) return <Redirect to="/"/>

        
        const { addresses } = this.props.auth.userInfo;
        const { activeAddressID } = this.props.auth;
        let addressComponents;

        if(addresses) addressComponents = addresses.map(address => 
            <Address 
                key={address.id}  
                active={activeAddressID === address.id} 
                select={true} 
                address={address}
                makeActive={this.props.action_makeAddressActive}
                delete={this.props.action_deleteAddress}
            />
        );

        return (
            <div className="addresses">
                {!addresses || addresses.length === 0  ? <h3>No addresses saved</h3> : addressComponents} <br/>
                <Link to="/account/add-address">Add new address</Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { action_makeAddressActive, action_deleteAddress })(UserAddresses);