const express = require('express')
const cors = require('cors')
// const {authenticateToken} = require('./middleware/authMiddleware')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 8080
const dish = require('./routes/dishRouter')
const service = require('./routes/serviceRouter')
const user = require('./routes/userRouter')
const order = require('./routes/orderRouter')
const address = require('./routes/addressRouter')
const cart = require('./routes/cartRouter')

const stripe = require('stripe')(process.env.STRIPE_KEY)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//checkout api
app.post('/api/create-checkout-session', async (req, res) => {
  const { products, total } = req.body
  console.log(products)

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'INR',
      product_data: {
        name: product.name,
      },
      unit_amount: parseInt(product.price) * 1000,
    },
    quantity: product.quantity,
    // total : total
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  })

  res.json({ id: session.id })
})

app.use('/api', dish)
app.use('/api', service)
app.use('/api/user', user)
app.use('/api', order)
app.use('/api', address)
app.use('/api', cart)

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`)
})
