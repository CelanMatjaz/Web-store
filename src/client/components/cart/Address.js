import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Actions
import { action_setUpdateAddress } from '../../store/actions/authActions';

const Address = props => {
    const { street, zipCode, city, country, number, id } = props.address;

    return (
        <div className="address" style={props.active ? {borderColor: 'white'} : {}}>
            <div className="left">
                Country: {country}, {city}, {zipCode} <br/> Street: {street}, {number}
            </div>
            {props.dontShowButtons ? '' :
                <div className="right">
                    {props.select ? <Link to="/payment" onClick={() => props.makeActive(id)}>Select</Link> : ''}
                    <button onClick={() => {
                        props.setUpdateAddress(id);
                        props.history.push('/account/update-address');
                    }}>Edit</button>
                    <button onClick={() => {
                        props.delete(id);
                    }}>Delete</button>
                </div> 
            }            
        </div>
    );
}

export default withRouter(connect(null, { setUpdateAddress: action_setUpdateAddress })(Address));