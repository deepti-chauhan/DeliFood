const { default: mongoose } = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {},
  ordereditems: [],
})

const Order = mongoose.model('Order', orderSchema)

const createOrder = async (req, res) => {
  try {
    const { user, ordereditems } = req.body
    const newOrder = new Order({ user, ordereditems })
    await newOrder.save()
    console.log(`order request: ${JSON.stringify(req.body)}`)
    res.status(201).json({ message: 'Order created' })
  } catch (error) {
    console.log(error)
  }
}

const getOrders = async (req, res) => {
  try {
    const { email } = req.body
    const orders = await Order.find(
      { 'user.email': email },
      { _id: 0, 'ordereditems': true, 'user.date':true }
    )
    return res.status(200).send(orders)
  } catch (error) {
    return res.status(400).send({ message: 'order history not found!!' })
  }
}
const getAddress = async (req, res) => {
  try {
    const { email } = req.body
    const orders = await Order.find(
      { 'user.email': email },
      { _id: 0, 'user.address': true }
    )
    return res.status(200).send(orders)
  } catch (error) {
    return res.status(400).send({ message: 'order history not found!!' })
  }
}

module.exports = { createOrder, getOrders, getAddress }
