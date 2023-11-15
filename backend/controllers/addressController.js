const mongoose = require('mongoose')
const UserModel = require('../models/user')
const uuid = require('uuid')

const deleteAddress = async (req, res) => {
  try {
    const { email, uuid } = req.body
    const filter = { email: email }

    // const updatedAddress = await UserModel.deleteOne({ 'uuid': uuid })
    console.log(
      `updated address array : ${JSON.stringify(updatedAddress.address)}`
    )
    return res.status(201).json({ message: 'address deleted!!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'address cannot be deleted!!' })
  }
}

module.exports = {
  deleteAddress,
}
