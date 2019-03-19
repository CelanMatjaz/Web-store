export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const CHECK_IF_LOGGED_IN = 'CHECK_IF_LOGGED_IN';
export const CHECK_IF_LOGGED_IN_SUCCESS = 'CHECK_IF_LOGGED_IN_SUCCESS';
export const CHECK_IF_LOGGED_IN_FAILED = 'CHECK_IF_LOGGED_IN_FAILED';
export const RESET_ERRORS = 'RESET_ERRORS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_FAILED = 'ADD_ADDRESS_FAILED';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILED = 'UPDATE_ADDRESS_FAILED';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILED = 'DELETE_ADDRESS_FAILED';
export const MAKE_ADDRESS_ACTIVE = 'MAKE_ADDRESS_ACTIVE';
export const SET_UPDATE_ADDRESS = 'SET_UPDATE_ADDRESS';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';

//Actions for registering a user
export const register = () => ({
    type: REGISTER
});

export const registerSuccess = msg => ({
    type: REGISTER_SUCCESS,
    msg
});

export const registerFailed = (errors) => ({
    type: REGISTER_FAILED,
    errors
});

//Actions for logging user in
export const login = () => ({
    type: LOGIN
});

export const loginSuccess = (userInfo, token ,msg) => ({
    type: LOGIN_SUCCESS,
    userInfo,
    token,
    msg
});

export const loginFailed = errors => ({
    type: LOGIN_FAILED,
    errors
});

export const logout = () => ({
    type: LOGOUT
});

//Actions for checking if user is logged in already
export const checkIfLoggedIn = () => ({
    type: CHECK_IF_LOGGED_IN
});

export const checkIfLoggedInSuccess = userInfo => ({
    type: CHECK_IF_LOGGED_IN_SUCCESS,
    userInfo
});

export const checkIfLoggedInFailed = () => ({
    type: CHECK_IF_LOGGED_IN_FAILED
});

//Action for reseting all errors
export const resetErrors = () => ({
    type: RESET_ERRORS
});

//Actions for adding an address
export const addAddress = () => ({
    type: ADD_ADDRESS
});

export const addAddressSuccess = userInfo => ({
    type: ADD_ADDRESS_SUCCESS,
    userInfo
});

export const addAddressFailed = error => ({
    type: ADD_ADDRESS_FAILED,
    error
});

//Actions for updating an address
export const updateAddress = () => ({
    type: UPDATE_ADDRESS
});

export const updateAddressSuccess = userInfo => ({
    type: UPDATE_ADDRESS_SUCCESS,
    userInfo
});

export const updateAddressFailed = () => ({
    type: UPDATE_ADDRESS_FAILED
});

//Actions for deleting an address
export const deleteAddress = () => ({
    type: DELETE_ADDRESS
});

export const deleteAddressSuccess = userInfo => ({
    type: DELETE_ADDRESS_SUCCESS,
    userInfo
});

export const deleteAddressFailed = () => ({
    type: DELETE_ADDRESS_FAILED
});

//Action for setting activeAddressID in authReducer.js
export const makeAddressActive = id => ({
    type: MAKE_ADDRESS_ACTIVE,
    id
});

//Action for setting updateAddressID in authReducer.js
export const setAddressIdToUpdate = id => ({
    type: SET_UPDATE_ADDRESS,
    id
});

//Action for getting a users orders
export const getUserOrders = orders => ({
    type: GET_USER_ORDERS,
    orders
});

