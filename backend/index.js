const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = process.env.PORT || 8080

const dish = require('./routes/dishRouter')
const service = require('./routes/serviceRouter')
const user = require('./routes/userRouter')
const order = require('./routes/orderRouter')
const address = require('./routes/addressRouter')
const cart = require('./routes/cartRouter')

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

/*
  METHOD : GET
  -----------------------------------------
  dish            -  /api/dishes
  popular dishes  -  /api/dishes/popular
  service         -  /api/services
  -----------------------------------------
*/

app.use('/api', dish)
app.use('/api', service)

/*
  METHOD : POST
  -----------------------------------------
  registerUser           -  /api/user/register
  loginUser              -  /api/user/login
  deleteUser              -  /api/user/delete
  placeOrder             -  /api/orders
  -----------------------------------------
  */

app.use('/api/user', user)
app.use('/api', order)
app.use('/api', address)

app.use('/api',cart)

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})
