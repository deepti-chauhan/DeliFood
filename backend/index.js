const express = require('express')
const cors = require('cors')
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

const stripe = require('stripe')(
  'sk_test_51OH1UASAYSPowgwngyjjS8j8jMSCsqzCoPrisdHi9ZTFZQT9t1cdRwR2Lqr3ZFtOThMNFWVMau2P2saF9o90jPUY00TxwqAzZJ'
)

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

//checkout api
app.post('/api/create-checkout-session', async (req, res) => {
  const { products } = req.body
  console.log(products)

  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'INR',
      product_data: {
        name: product.name,
      },
      unit_amount: parseInt(product.price)  * 100,
    },
    quantity: product.quantity,
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
