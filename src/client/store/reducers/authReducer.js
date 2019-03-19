import {
	REGISTER,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	CHECK_IF_LOGGED_IN,
	CHECK_IF_LOGGED_IN_SUCCESS,
	CHECK_IF_LOGGED_IN_FAILED,
	RESET_ERRORS,
	ADD_ADDRESS,
	ADD_ADDRESS_SUCCESS,
	ADD_ADDRESS_FAILED,
	UPDATE_ADDRESS,
	UPDATE_ADDRESS_SUCCESS,
	UPDATE_ADDRESS_FAILED,
	DELETE_ADDRESS,
	DELETE_ADDRESS_SUCCESS,
	DELETE_ADDRESS_FAILED,
	MAKE_ADDRESS_ACTIVE,
	SET_UPDATE_ADDRESS,
	GET_USER_ORDERS
} from '../actions/action_creators/auth';

const initState = {
    userInfo: {},
	isEmpty: true,
	activeAddressID: null,
	updateAddressID: null,
	token: null,

	//Variable for checking if user is logged in when site loads
	loginCheck: true,

	//Register messages and errors
	regMsg: null,
	regErrors: [],

	//Login messages and errors
	logMsg: null,
	logErrors: [],

	//Address messages and errors
	addressMsg: null,
	addressError: null,

	//User orders
	userOrders: []
}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case REGISTER:
			return {
				...state,
				regErrors: []
			};

		case REGISTER_SUCCESS:
			return {
				...state,
				regMsg: action.msg
			};

		case REGISTER_FAILED:
			return {
				...state,
				regErrors: action.errors 
			};

		case LOGIN:
			return {
				...state,
				logErrors: []
			}

		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.token);
			return {
				...state,
				logMsg: action.msg,
				isEmpty: false,
				userInfo: action.userInfo,
				token: action.token
			};

		case LOGIN_FAILED:
			return {
				...state,
				logErrors: action.errors
			};

		case LOGOUT:{
			localStorage.removeItem('token');
			return {
				...state,
				userInfo: {},
				isEmpty: true
			}
		}

		case CHECK_IF_LOGGED_IN: 
			return {
				...state,
				loginCheck: true
			}

		case CHECK_IF_LOGGED_IN_SUCCESS:
			return {
				...state,
				loginCheck: false,
				userInfo: action.userInfo,
				isEmpty: false
			}

		case CHECK_IF_LOGGED_IN_FAILED:
			return {
				...state,
				loginCheck: false
			}

		case RESET_ERRORS:
			return {
				...state,
				regMsg: null,
				regErrors: [],
				logMsg: null,
				logErrors: []
			}

		case ADD_ADDRESS:
			return {
				...state,
				addressMsg: null,
				addressError: null
			}

		case ADD_ADDRESS_SUCCESS:
			return {
				...state,
				userInfo: action.userInfo,
				addressMsg: 'New address added'
			}

		case ADD_ADDRESS_FAILED:
			return {
				...state,
				addressError: action.error || 'Could not add new address'
			}

		case UPDATE_ADDRESS:
			return {
				...state,
				addressMsg: null,
				addressError: null
			}

		case UPDATE_ADDRESS_SUCCESS:
			return {
				...state,
				userInfo: action.userInfo,
				addressMsg: 'New address added'
			}

		case UPDATE_ADDRESS_FAILED:
			return {
				...state,
				addressError: 'Could not update address'
			}

		case DELETE_ADDRESS:
			return {
				...state,
				addressMsg: null,
				addressError: null
			}

		case DELETE_ADDRESS_SUCCESS:
			return {
				...state,
				userInfo: action.userInfo,
				addressMsg: 'Address deleted'
			}

		case DELETE_ADDRESS_FAILED:
			return {
				...state,
				addressError: 'Could not delete address'
			}

		case MAKE_ADDRESS_ACTIVE:
			return {
				...state,
				activeAddressID: action.id
			}

		case SET_UPDATE_ADDRESS:
			return {
				...state,
				updateAddressID: action.id
			}

		case GET_USER_ORDERS:
			return {
				...state,
				userOrders: action.orders
			}

		default: 
			return state;
	}
}

export default authReducer;