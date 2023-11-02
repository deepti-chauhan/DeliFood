const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8080

const product = require('./routes/productRouter')
const dish = require('./routes/dishRouter')
const service = require('./routes/serviceRouter')
const user = require('./routes/userRouter')

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
  product         -  /api/products
  dish            -  /api/dishes
  popular dishes  -  /api/dishes/popular
  service         -  /api/services
  -----------------------------------------
*/

app.use('/api', product)
app.use('/api', dish)
app.use('/api', service)
app.use('/api/user', user)

/*
  METHOD : POST
  -----------------------------------------
  registerUser           -  /api/user/register
  loginUser              -  /api/user/login
  placeOrder             -  /api/orders
  -----------------------------------------
*/

// JWT authentication middleware
// app.use(
//   ejwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
//     path: [
//       '/api/register',
//       '/api/orders',
//       // Exempt the login route from JWT authentication
//       // Add more exempted routes if needed
//     ],
//   })
// )

app.use('/api/orders', require('./routes/orderRouter'))

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})
