import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import BasketItem from '../BasketItem/BasketItem'
import './Payment.css'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../reducer'
import axios from '../../axios'
import { db } from '../../firebase'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue()
    const history = useHistory()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [clientSecret, setClientSecret] = useState(true)

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        // prevent refreshing
        e.preventDefault()
        // prevent user from clicking buy now button multiple times
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace('/orders')
        })
    }
    const handleChange = e => {
        // listen for changes in CardElement
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])

    // console.log('THE CLIENT SECRET >>>>', clientSecret)
    
    return (
        <div className="payment">
            <div className="payment__container">
            <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>209 React Lane</p>
                        <p>Philadelphia, PA</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <BasketItem 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                        <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now "}</span>
                                </button>
                            </div>
                            {/* Errors  */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
