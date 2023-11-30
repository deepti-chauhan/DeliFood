const User = require('../models/user')
const Dish = require('../models/dishes')
const Order = require('../models/order')
const Cart = require('../models/cart')
const uuid = require('uuid')

// @method     - post
// @access     - private
// @endpoint   - /order/history
const orderHisory = async (req, res) => {
  try {
    const { email } = req.user
    const orders = await Order.find({ email: email }, { _id: 0 })
    return res.status(200).send(orders)
  } catch (error) {
    return res.status(400).send({ message: 'order history not found!!' })
  }
}

//  @method     - post
//  @access     - private
//  @endpoint   - /order/create
const createOrder = async (req, res) => {
  const { email } = req.user
  const { addressId } = req.body
  try {
    //check if cart exist for user
    const cart = await Cart.findOne({ email: email })
    if (!cart) {
      return res.status(404).json({ message: 'cart not found!!' })
    }
    //if cart exist
    const productIds = cart.items.map((item) => item.productId)
    const cartItems = await Dish.find({ productId: { $in: productIds } })
    const orderedItems = cartItems.map((item) => ({
      ...item.toObject(),
      quantity: cart.items.find(
        (cartItem) =>
          cartItem.productId.toString() === item.productId.toString()
      ).quantity,
    }))

    const cartTotal = cart.totalAmount.toFixed(2)
    const shippingAddress = await User.find(
      { 'address.addressId': addressId },
      {
        _id: 0,
        address: {
          $elemMatch: { addressId: addressId },
        },
      }
    )
    const orderId = uuid.v4()
    const newOrder = new Order({
      orderId: orderId,
      email: email,
      orderedItems: orderedItems,
      shippingAddress: shippingAddress,
      orderTotal: cartTotal,
    })

    await newOrder.save()
    await Cart.deleteOne({ email: email })

    return res
      .status(200)
      .json({ orderId: orderId, message: 'order placed !!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "order can't be placed!!" })
  }
}

//  @method     - get
//  @access     - private
//  @endpoint   - /order/summary
const orderSummary = async (req, res) => {
  try {
    const { orderId } = req.query
    const currentOrderSummary = await Order.findOne({ orderId: orderId })
    console.log(currentOrderSummary)
    res.status(200).json({ orderSummary: currentOrderSummary })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  createOrder,
  orderHisory,
  orderSummary,
}
