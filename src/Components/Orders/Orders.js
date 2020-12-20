import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import Order from '../Order/Order'

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) { 
            db
            .collection('users') //access user collection
            .doc(user?.uid) //get specific user logged in
            .collection('orders') //get that specific users order
            .orderBy('created', 'desc') //order collection - recent purchases at the top
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({ // goes through the list of orders and putting it into an array
                    id: doc.id, //get id of doc and store it in an id key
                    data: doc.data() //get data of doc(amount,image, etc) and store it in a data key
                })))
            ))
        } else {
            setOrders([])
        }        
    }, [user])

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map( order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
