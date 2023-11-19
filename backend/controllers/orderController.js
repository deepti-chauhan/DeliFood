const { default: mongoose } = require('mongoose')
const UserModel = require('../models/user')
const DishesModel = require('../models/dishes')
const uuid = require('uuid')

// const orderSchema = new mongoose.Schema({
//   user: {},
//   ordereditems: [],
// })
// const Order = mongoose.model('Order', orderSchema)

const OrderSchema = new mongoose.Schema({
  dishes: [],
  address: [],
  email: String,
  date: String,
})
const Order = mongoose.model('newOrder', OrderSchema)

// const createOrder = async (req, res) => {
//   try {
//     const { user, ordereditems } = req.body
//     const newOrder = new Order({ user, ordereditems })
//     await newOrder.save()
//     console.log(`order request: ${JSON.stringify(req.body)}`)
//     res.status(201).json({ message: 'Order created' })
//   } catch (error) {
//     console.log(error)
//   }
// }

const orderHisory = async (req, res) => {
  try {
    const { email } = req.query
    const orders = await Order.find({ email: email }, { _id: 0 })
    return res.status(200).send(orders[0])
  } catch (error) {
    return res.status(400).send({ message: 'order history not found!!' })
  }
}


const placeOrder = async (req, res) => {
  const { addressId, email, orderedItems } = req.body
  const today = new Date()
  try {
    // const dishResult = await DishesModel.findOne({ id: dishId })
    const addressResult = await UserModel.find(
      { 'address.uuid': addressId },
      { _id: 0, 'address.$': 1 }
      // $and: [{ email: email }, { 'address.uuid': addressId }],
    )

    // const orderResult = {...orderedItems}

    // const order = {
    //   dish : dishResult,
    //   address : addressResult,
    //   email : email
    // }

    // console.log(`dish : ${dishResult}`)
    console.log(`address : ${addressResult}`)
    const newOrder = new Order({
      dishes: orderedItems,
      address: addressResult,
      email: email,
      date:
        today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate(),
    })
    await newOrder.save()
    console.log(`placed Order : ${newOrder}`)

    return res.status(200).send(newOrder)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "order can't be placed" })
  }
}

module.exports = {
  // createOrder,
  orderHisory,
 
  placeOrder,
}
