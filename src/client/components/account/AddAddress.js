import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Components
import ErrorMessage from '../layout/ErrorMessage';
import Message from '../layout/Message';

//Actions
import { action_addNewAddress } from '../../store/actions/authActions';
import { addAddress } from '../../store/actions/action_creators/auth';

class AddAddress extends Component {

    state = {
        street: '',
        zipCode: '',
        number: '',
        city: '',
        country: '',
        error: null
    }

    componentDidMount(){
        this.props.resetErrors();
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
            this.props.action_addNewAddress({street, zipCode, number, city, country});
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
        const { addressError, addressMsg } = this.props;

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
                    <button>Add address</button>
                    <button onClick={this.props.history.goBack}>Go back</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    addressError: state.auth.addressError,
    addressMsg: state.auth.addressMsg
});

const resetErrors = () => dispatch => dispatch(addAddress());

export default withRouter(connect(mapStateToProps, { action_addNewAddress, resetErrors })(AddAddress));