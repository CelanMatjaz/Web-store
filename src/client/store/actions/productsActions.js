import { 
    getProducts,
    getProductsSuccess,
    getProductsFailed,
    addToCart,
    removeFromCart,
    incrementProduct,
    decrementProduct,
    placeOrder,
    placeOrderSuccess,
    placeOrderFailed,
    resetOrderErrors
} from './action_creators/products';

//Gets products from server
export const GetProducts = () => {
    return dispatch => {
        dispatch(getProducts());
        fetch('/products')
            .then(res => res.json())
            .then(data => {
                if(data.length > 0)
                    dispatch(getProductsSuccess(data));
                else
                    dispatch(getProductsFailed());
            })
            .catch(err => {                 
                console.error(err);
                dispatch(getProductsFailed());                
            });
    }
}
//Adds product to cart
export const AddToCart = (id, quantity) => (dispatch => dispatch(addToCart(id, quantity)));
//Increments product quantity in cart
export const incrementProductQuantity = id => dispatch => dispatch(incrementProduct(id));
//Decrements product quantity in cart
export const decrementProductQuantity = id => dispatch => dispatch(decrementProduct(id));
//Removes product from cart
export const RemoveFromCart = id => dispatch => dispatch(removeFromCart(id));
//Resets all order messages and errors
export const action_resetOrderErrors = () => dispatch => dispatch(resetOrderErrors());

//Sends order data to server
export const action_placeOrder = order => {
    return dispatch => {
        dispatch(placeOrder());
        const token = localStorage.getItem('token');
        fetch('/order', {
            method: 'POST',
            body: JSON.stringify({order}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'Order_confirmed')
                    dispatch(placeOrderSuccess());
                else
                    dispatch(placeOrderFailed());
            })
            .catch(err => {
                console.log(err);
                dispatch(placeOrderFailed());
            });
    }
}