import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Actions
import { action_logout } from '../../store/actions/authActions';

class SignedInLinks extends Component{

    handleLogout = e => {
        e.preventDefault();
        this.props.action_logout();
    }

    render(){
        return (
            <>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li><a onClick={this.handleLogout}to="/logout">Logout</a></li>
            </>
        );
    }
}

export default connect(null, { action_logout })(SignedInLinks);