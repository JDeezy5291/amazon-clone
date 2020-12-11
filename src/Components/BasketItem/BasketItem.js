import React from 'react'
import { useStateValue } from '../../StateProvider'
import './BasketItem.css'

function BasketItem({id, title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue()
    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id  
        })
    }
    return (
        <div className="basketItem">
            <img src={image} className="basketItem__image"/>
            <div className="basketItem__info">
                <p className="basketItem__title">{title}</p>
                <p className="basketItem__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="basketItem__rating">
                    {Array(rating).fill().map((_,i) => (
                        <p>⭐</p>
                    ))}
                </div>
                <button onClick={removeFromCart}>Remove from Cart</button>
            </div> 
        </div>
    )
}

export default BasketItem
