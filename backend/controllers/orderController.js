const { default: mongoose } = require('mongoose')
const UserModel = require('../models/user')
const uuid = require('uuid')

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
      { _id: 0, ordereditems: true, 'user.date': true }
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

const getAllAddress = async (req, res) => {
  try {
    const { email } = req.body
    const allAddresses = await UserModel.find(
      { email: email },
      { _id: 0, address: true }
    )

    return res.status(200).send(allAddresses[0].address)
  } catch (error) {
    return res.status(400).send({ message: 'not able to fetch address' })
  }
}

const setAddress = async (req, res) => {
  try {
    const { email, address } = req.body
    const newAddress = { ...address, uuid: uuid.v4() }
    // const uuid = uuid()

    /*
     */

    const filter = { email: email }
    console.log(address)
    console.log(email)
    const update = {
      // $set : { 'address.uuid' : uuid.v4()},
      $push: { address: newAddress },

      // $setOnInsert:  address: address ,
    }
    options = {
      upsert : true
    }

    // const updatedUser = await UserModel.findOneAndUpdate(filter, update)
    console.log(UserModel)
    const updatedUser = await UserModel.updateOne(filter, update, options)

    console.log(`address: ${JSON.stringify(req.body)}`)
    console.log(`update user address: ${JSON.stringify(updatedUser)}`)
    return res.status(201).json({ message: 'address updated!!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'address cannot be updated!!' })
  }
}

module.exports = {
  createOrder,
  getOrders,
  getAddress,
  setAddress,
  getAllAddress,
}
