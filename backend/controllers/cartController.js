const Cart = require('../models/cart')
const Item = require('../models/dishes')

const addItem = async (req, res) => {
  const { userId, productId, quantity } = req.body
  try {
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity || 1
    } else {
      cart.items.push({ productId, quantity: quantity || 1 })
    }

    await cart.save()

    return res.status(200).send(cart)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Internal Server Error !!' })
  }
}

const getItems = async (req, res) => {
  console.log('hello')
  console.log(req.query)
  const { userId } = req.query
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) {
      return res.status(404).send({ message: 'Cart not Found' })
    }

    console.log(cart)
    const productIds = cart.items.map((item) => parseInt(item.productId))
    console.log(productIds)

    const cartItems = await Item.find({ dishId: { $in: productIds } })
    console.log(cartItems)

    const itemsWithQuantity = cartItems.map((item) => {
      const orderItem = {
        quantity: cart.items.find(
          (cartItem) => cartItem.productId === item.dishId
        ).quantity,
        ...item.toObject(),
      }
      return orderItem
    })

    console.log(` Item : ${{ itemsWithQuantity }}`)
    res.json(itemsWithQuantity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server erorr' })
  }
}

const removeItem = async (req, res) => {
  const { userId, productId } = req.query
  console.log(req.query)
  try {
    const cart = await Cart.findOne({ userId })
    console.log(`cart : ${cart}`)
    
    if (!cart) {
      return res.status(404).json({ message: 'cart not found!' })
    }
    
    console.log(`cart items before  : ${cart.items}`)
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId)
    console.log(`cart items after  : ${cart.items}`)


    await cart.save()
    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messgae: 'Internal Server Error' })
  }
}

module.exports = { addItem, getItems, removeItem }
