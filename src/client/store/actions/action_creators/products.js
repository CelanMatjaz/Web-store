export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCRMENT_PRODUCT = 'INCRMENT_PRODUCT';
export const DECRMENT_PRODUCT = 'DECRMENT_PRODUCT';
export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const RESET_ORDER_ERRORS = 'RESET_ORDER_ERRORS';

//Actions for getting products from server
export const getProducts = () => ({
    type: GET_PRODUCTS
});

export const getProductsSuccess = products => ({
    type: GET_PRODUCTS_SUCCESS,
    products
});

export const getProductsFailed = () => ({
    type: GET_PRODUCTS_FAILED,
    error: 'Could not get products from server'
});

//Action for adding item to cart
export const addToCart = (id, quantity) => ({
    type: ADD_TO_CART,
    quantity,
    id
});

//Action for removeing item from cart
export const removeFromCart = id => ({
    type: REMOVE_FROM_CART,
    id
});

//Action for incrementing cartQuantity of an item in cart
export const incrementProduct = id => ({
    type: INCRMENT_PRODUCT,
    id
});

//Action for decrementing cartQuantity of an item in cart
export const decrementProduct = id => ({
    type: DECRMENT_PRODUCT,
    id
});

//ACtions for placing order
export const placeOrder = () => ({
    type: PLACE_ORDER
});

export const placeOrderSuccess = () => ({
    type: PLACE_ORDER_SUCCESS
});

export const placeOrderFailed = () => ({
    type: PLACE_ORDER_FAILED
});

export const resetOrderErrors = () => ({
    type: RESET_ORDER_ERRORS
});



