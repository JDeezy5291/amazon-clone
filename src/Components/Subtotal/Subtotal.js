import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { ShoppingBasket } from '@material-ui/icons'
import { useStateValue } from '../../StateProvider'

function Subtotal() {
    const [{basket}, dispatch] = useStateValue()

    const basketTotal = () => {
        basket.forEach(basket => {
            // console.log(basket.price)
            basket += basket.price
            console.log(basket)
            return basket
        });

    }
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                    <p>
                        Subtotal ({basket.length} items):
                        <strong>{`${value}`}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/>This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={basketTotal()}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
