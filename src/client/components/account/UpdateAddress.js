import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

//Components
import ErrorMessage from '../layout/ErrorMessage';
import Message from '../layout/Message';

//Actions
import { action_updateAddress } from '../../store/actions/authActions';
import { updateAddress } from '../../store/actions/action_creators/auth';
import { throws } from 'assert';

class UpdateAddress extends Component {

    state = {
        street: '',
        zipCode: '',
        number: '',
        city: '',
        country: '',
    }

    componentDidMount(){
        if(!this.props.addresses || !this.props.addressID) this.props.history.push('/');
        this.props.resetErrors();
        const address = this.props.addresses.find(address => address.id === this.props.addressID);
        const { street, zipCode, number, city, country } = address;
        this.setState({
            street,
            zipCode,
            number,
            city,
            country,
            error: null
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { street, zipCode, number, city, country } = this.state;
        if(street && zipCode && number && city && country){
            this.setState({
                street: '',
                zipCode: '',
                number: '',
                city: '',
                country: '',
                error: null
            });
            this.props.action_updateAddress({street, zipCode, number, city, country, addressID: this.props.addressID});
            this.props.history.goBack();
        }
        else{
            this.setState({error: 'One or more fields is empty'});
        }

    }

    handleChnage = e => {
        this.setState({[e.target.id]: e.target.value});
    }   

    render() {
        const { street, zipCode, number, city, country, error } = this.state;
        const { addressError, addressMsg, isEmpty } = this.props;

        if(isEmpty) return <Redirect to="/"/>
        
        return (
            <div className="add-address">
                <form onSubmit={this.handleSubmit} className="add-address-form">
                    {error ? <ErrorMessage message={error}/> : ''}
                    {addressError ? <ErrorMessage message={addressError}/> : ''}
                    {addressMsg ? <Message message={addressMsg}/> : ''}
                    <div className="input-grid">
                        <div className="input">
                            <label htmlFor="country">Country/State</label>
                            <input type="text" id="country" onChange={this.handleChnage} value={country}/>
                        </div>

                        <div className="input">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" onChange={this.handleChnage} value={city}/>
                        </div>
                        
                        <div className="input">
                            <label htmlFor="zipCode">ZIP code</label>
                            <input type="text" id="zipCode" onChange={this.handleChnage} value={zipCode}/>
                        </div>

                        <div className="input">
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" onChange={this.handleChnage} value={street}/>
                        </div>

                        <div className="input">
                            <label htmlFor="number">House no.</label>
                            <input type="text" id="number" onChange={this.handleChnage} value={number}/>
                        </div>
                    </div>
                    <button>Update address</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    addressID: state.auth.updateAddressID,
    addresses: state.auth.userInfo.addresses,
    isEmpty: state.auth.isEmpty
});

const resetErrors = () => dispatch => dispatch(updateAddress());

export default withRouter(connect(mapStateToProps, { action_updateAddress, resetErrors })(UpdateAddress));