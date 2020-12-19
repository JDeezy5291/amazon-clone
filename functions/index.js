const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")('sk_test_51Hzq6DDgCLwFmBmIYugBTLEV5PXugQsqKzShZ9CXlI4ihrd2Q5StHvuh0R2eWoVeGtHP4u2SwJs627BfOEqVifLu005BYXB4HH')

// API


// App config 
const app = express()

// Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// API routes
app.get('/', (request, response) => response.status(200).send('Hello Josh'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total
    console.log('payment recieved >>>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "USD"
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// Listen command
exports.api = functions.https.onRequest(app)