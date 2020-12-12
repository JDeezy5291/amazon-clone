// reducer is how we are able to dispatch the action into the data layer
export const initialState = {
    basket: [],
    user: null
}

// Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0)

//state = state of application,action =  add to cart?/remove from cart?
const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'ADD_TO_BASKET': 
            return {
                // return what the state originally was
                ...state,
                // change basket from what it currently was plus whatever the user added
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_FROM_CART':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket]

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not on basket`
                )
            }
            return {
                ...state,
                basket: newBasket
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        default:
            return state
    }
}

export default reducer