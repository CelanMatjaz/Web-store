import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

//Actions
import { action_checkIfLoggedIn } from '../../store/actions/authActions';

class Navbar extends Component{
    componentDidMount(){
        this.props.action_checkIfLoggedIn();
    }

    render(){
        return (
            <div className="navbar">
                <div className="title">Webstore project</div>
                <div className="links-row">
                    {this.props.auth.loginCheck ? 
                        '' : 
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            {this.props.auth.isEmpty ? <SignedOutLinks/> : <SignedInLinks/>}                    
                        </ul>  
                    }              
                </div>
                <div className="bottom-row"></div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { action_checkIfLoggedIn })(Navbar);