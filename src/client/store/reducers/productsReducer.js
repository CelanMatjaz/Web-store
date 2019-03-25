import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCRMENT_PRODUCT,
    DECRMENT_PRODUCT,
    PLACE_ORDER,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILED,
    RESET_ORDER_ERRORS
} from '../actions/action_creators/products';

const initState = {
    products: [],
    cartItems: [],
    loading: true,
    error: null,
    checkoutLoading: false,
    orderMsg: null,
    orderError: null
}

const productsReducer = (state = initState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return {
                ...state,
                error: null
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products
            }

        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case ADD_TO_CART:
            const { id, quantity } = action;
            const foundItem = state.products.find(item => item.id === id);
            const newItem = {
                id: foundItem.id,
                cartQuantity: quantity,
                quantity: foundItem.quantity,
                image: foundItem.image,
                name: foundItem.name,
                price: foundItem.price
            }

            return {
                ...state,
                cartItems: [...state.cartItems, newItem]
            }

        case REMOVE_FROM_CART:{
            const newCartItems = state.cartItems.filter(item => item.id !== action.id);
            return {
                ...state,
                cartItems: newCartItems
            }
        }            

        case INCRMENT_PRODUCT:{
            const { id } = action;
            const newProducts = state.cartItems.map(item => {
                if(item.id === id && item.cartQuantity < item.quantity) {
                    item.cartQuantity++;
                    return item;
                }
                return item;
            });
            return {
                ...state,
                products: newProducts
            }
        }            

        case DECRMENT_PRODUCT:{
            const { id } = action;
            const newProducts = state.cartItems.map(item => {
                if(item.id === id && item.cartQuantity > 0) {
                    item.cartQuantity--;
                    return item;
                }
                return item;
            });
            return {
                ...state,
                products: newProducts
            }
        }      
        
        case PLACE_ORDER:
            return {
                ...state,
                checkoutLoading: true,
                orderError: null,
                orderMsg: null
            }

        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                checkoutLoading: false,
                cartItems: [],
                products: [],
                orderMsg: 'The order was accepted'
            }

        case PLACE_ORDER_FAILED:
            return {
                ...state,
                checkoutLoading: false,
                orderError: 'The order was not accepted'
            }

        case RESET_ORDER_ERRORS:
            return {
                ...state,
                orderError: null,
                orderMsg: null
            }

        default: 
            return state;
    }
}

export default productsReducer;
