const UserModel = require('../models/user')
const uuid = require('uuid')
const currentDate = new Date()

//  @method   - post
//  @access   - private
//  @endpoint - /address/create
const setAddress = async (req, res) => {
  try {
    const { email } = req.user
    const { address } = req.body
    const newAddress = {
      addressId: uuid.v4(),
      ...address,
      createdAt: currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    }

    const filter = { email: email }
    console.log(address)
    console.log(email)
    const update = {
      $push: { address: newAddress },
    }
    options = {
      upsert: true,
    }

    console.log(UserModel)
    const updatedUser = await UserModel.updateOne(filter, update, options)

    console.log(`address: ${JSON.stringify(req.body)}`)
    console.log(`update user address: ${JSON.stringify(updatedUser)}`)
    return res.status(201).send({ address: newAddress })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'address cannot be updated!!' })
  }
}

//  @method   - get
//  @access   - private
//  @endpoint - /address/all
const getAllAddress = async (req, res) => {
  console.log(req.user)
  try {
    const { email } = req.user
    const allAddresses = await UserModel.find(
      { email: email },
      { _id: 0, address: true }
    )

    return res.status(200).send(allAddresses[0].address)
  } catch (error) {
    return res.status(400).send({ message: 'not able to fetch address' })
  }
}

//  @method   - put
//  @access   - private
//  @endpoint - /address?addressId=
const updateAddress = async (req, res) => {
  const { email } = req.user
  try {
  } catch (error) {}
}

//  @method   - delete
//  @access   - private
//  @endpoint - /address?addressId=
const deleteAddress = async (req, res) => {
  const { email } = req.user
  console.log(' email : ' + email)
  try {
    const { addressId } = req.query
    console.log('addressId : ' + addressId)

    const filter = { email: email }
    const user = await UserModel.findOne({ email })
    console.log('user : ' + user)

    if (!user) {
      return res.status(404).json({ message: 'user not found!' })
    }

    user.address = user.address.filter(
      (address) => address.addressId !== addressId
    )

    await user.save()

    return res.status(201).json(user.address)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'address cannot be deleted!!' })
  }
}

module.exports = {
  deleteAddress,
  setAddress,
  getAllAddress,
  updateAddress,
}
