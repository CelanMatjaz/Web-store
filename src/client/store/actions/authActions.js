import {
    register, registerSuccess, registerFailed,
    login, loginSuccess, loginFailed,
    logout,
    checkIfLoggedIn, checkIfLoggedInSuccess, checkIfLoggedInFailed,
    resetErrors,
    addAddress, addAddressSuccess, addAddressFailed,
    updateAddress, updateAddressSuccess, updateAddressFailed,
    deleteAddress, deleteAddressSuccess, deleteAddressFailed,
    makeAddressActive, setAddressIdToUpdate,
    getUserOrders
} from './action_creators/auth';

export const action_checkIfLoggedIn = () => {
    return dispatch => {
        dispatch(checkIfLoggedIn());
        const token = localStorage.getItem('token');
        if(!token) dispatch(checkIfLoggedInFailed());
        else{
            fetch('/check-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => res.json())
                .then(({ status, userInfo }) => {
                    if(status === 'Login_check_success'){
                        dispatch(checkIfLoggedInSuccess(userInfo));
                    }                    
                    else
                        dispatch(checkIfLoggedInFailed());
                })
                .catch(err => {                 
                    console.error(err);
                    dispatch(checkIfLoggedInFailed());                
                });
        }        
    }
}

//Register action
export const action_register = creds => {
    return dispatch => {
        dispatch(register());
        fetch('/register', {
            body: JSON.stringify(creds),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(({ msg, errors, status }) => {
                if(status === 'Register_success')
                    dispatch(registerSuccess(msg));                 
                else
                    dispatch(registerFailed(errors));
                
            })
            .catch(err => {                 
                console.error(err);
                dispatch(registerFailed([]));                
            });
    }
}

//Login action
export const action_login = creds => {
    return dispatch => {
        dispatch(login());
        fetch('/login', {
            body: JSON.stringify(creds),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(({ status, userInfo, token, msg, errors }) => {
                if(status === 'Login_success')
                    dispatch(loginSuccess(userInfo, token, msg));
                else
                    dispatch(loginFailed(errors));
            })
            .catch(err => {                 
                console.error(err);
                dispatch(loginFailed());                
            });
    }
}

//Action for logging out a user
export const action_logout = () => dispatch => dispatch(logout());

//Action for reseting all the errors on authReducer
export const action_resetErrors = () => dispatch => dispatch(resetErrors());

//Add new address action
export const action_addNewAddress = address => {
    return dispatch => {
        dispatch(addAddress());
        const token = localStorage.getItem('token');
        if(!token) dispatch(checkIfLoggedInFailed());
        fetch('/add-address', {
            body: JSON.stringify({address}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'Add_address_success')
                    dispatch(addAddressSuccess(data.userInfo));                 
                else
                    dispatch(addAddressFailed(data.error));                
            })
            .catch(err => {                 
                console.error(err);
                dispatch(addAddressFailed());                
            });
    }
}

//Update address action
export const action_updateAddress = address => {
    return dispatch => {
        dispatch(updateAddress());
        const token = localStorage.getItem('token');
        if(!token) dispatch(checkIfLoggedInFailed());
        fetch('/update-address', {
            body: JSON.stringify({address}),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'Update_address_success')
                    dispatch(updateAddressSuccess(data.userInfo));                 
                else
                    dispatch(updateAddressFailed());                
            })
            .catch(err => {                 
                console.error(err);
                dispatch(updateAddressFailed());                
            });
    }
}

//Delete address action
export const action_deleteAddress = id => {
    return dispatch => {
        dispatch(deleteAddress());
        const token = localStorage.getItem('token');
        if(!token) dispatch(checkIfLoggedInFailed());
        fetch('/delete-address', {
            body: JSON.stringify({addressID: id}),
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'Delete_address_success')
                    dispatch(deleteAddressSuccess(data.userInfo));                 
                else
                    dispatch(deleteAddressFailed());                
            })
            .catch(err => {                 
                console.error(err);
                dispatch(deleteAddressFailed());                
            });
    }
}

export const action_getUserOrders = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        fetch('/account-orders', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(getUserOrders(data));
            })
            .catch(err => {
                dispatch(getUserOrders([]));                
            });
    }
}

//Sets activeAddressID in reducer to the id parameter
export const action_makeAddressActive = id => dispatch => dispatch(makeAddressActive(id));

//Sets updateAddressID in reducer to the id parameter
export const action_setUpdateAddress = id => dispatch => dispatch(setAddressIdToUpdate(id));