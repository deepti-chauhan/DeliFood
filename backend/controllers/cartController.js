const Cart = require('../models/cart')
const Item = require('../models/dishes')

//  @method   -  post
//  @access   -  private
//  @endpoint -  /cart/addItem
const addItem = async (req, res) => {
  const { email } = req.user
  const { productId, quantity } = req.body
  try {
    // Check if the product exists
    const product = await Item.findOne({ productId: productId })
    console.log("product to add" ,product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Check if the user's cart exists
    let cart = await Cart.findOne({ email })

    if (!cart) {
      cart = new Cart({ email, items: [] })
    }

    const existingItem = cart.items.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity || 1
    } else {
      cart.items.push({ productId, quantity: quantity || 1 })
    }

    let updatedTotal = cart.totalAmount + product.price * (quantity || 1)
    cart.totalAmount = updatedTotal.toFixed(2)
    const updatedQty = existingItem ? existingItem.quantity : 1
    await cart.save()

    return res.status(200).json({qty : updatedQty})
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Internal Server Error !!' })
  }
}

//  @method   -  get
//  @access   -  private
//  @endpoint -  /cart/items
const getItems = async (req, res) => {
  console.log(req.user)
  const { email } = req.user
  try {
    const cart = await Cart.findOne({ email })
    if (!cart) {
      return res.status(404).send({ cartItem : [] })
    }

    console.log(cart)
    const productIds = cart.items.map((item) => parseInt(item.productId))
    console.log(productIds)

    const cartItems = await Item.find({ productId: { $in: productIds } })
    console.log(cartItems)

    const itemsWithQuantity = cartItems.map((item) => ({
      ...item.toObject(),
      quantity: cart.items.find(
        (cartItem) => cartItem.productId === item.productId
      ).quantity,
    }))

    res.json({
      cartItem: itemsWithQuantity,
      cartTotal: cart.totalAmount.toFixed(2),
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server erorr' })
  }
}

//  @method   -  delete
//  @access   -  private
//  @endpoint -  /cart/removeItem
const removeItem = async (req, res) => {
  const { email } = req.user
  const { productId } = req.query
  try {
    // Check if the product exists
    const cart = await Cart.findOne({ email })

    if (!cart) {
      return res.status(404).json({ cartItem : [] })
    }
    const product = await Item.findOne({ productId: productId })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    )

    updatedTotal =  cart.totalAmount - product.price * (existingItem.quantity || 1)
    cart.totalAmount = updatedTotal.toFixed(2)

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    )

   
      await cart.save()
      res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messgae: 'Internal Server Error' })
  }
}

//  @method   -  delete
//  @access   -  private
//  @endpoint -  /cart/removeItemByOne
const decreaseItemCount = async (req, res) => {
  const { email } = req.user
  const { productId } = req.query

  try {
    const product = await Item.findOne({ productId: productId })

    if (!product) {
      return res.status(404).json({ message: 'product not found!!' })
    }

    const cart = await Cart.findOne({ email: email })

    if (!cart) {
      res.status(404).json({ message: 'cart not found!!' })
    }

    let existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    )

    if (existingItem.quantity === 1) {

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId.toString()
      )
    } else {
      existingItem.quantity -= 1
    }

    let updatedQty

      cart.totalAmount -= product.price
      cart.totalAmount = Math.max(0, cart.totalAmount).toFixed(2)
      updatedQty = existingItem ? existingItem.quantity : 0
      await cart.save()
      res.status(200).json(cart)


  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server error!!' })
  }
}

module.exports = { addItem, getItems, removeItem, decreaseItemCount }
