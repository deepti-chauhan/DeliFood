const UserModel = require('../models/user');
const uuid = require('uuid');
const currentDate = new Date();

const setAddress = async (email, address) => {
  const newAddress = {
    addressId: uuid.v4(),
    ...address,
    createdAt: currentDate.toISOString(),
    updatedAt: currentDate.toISOString(),
  };

  const filter = { email : email };
  const update = {
    $push: { address: newAddress },
  };
  const options = {
    upsert: true,
  };

  const updatedUser = await UserModel.updateOne(filter, update, options);

  return { address: newAddress, updatedUser: updatedUser };
};

const getAllAddress = async (email) => {
  const allAddresses = await UserModel.find(
    { email },
    { _id: 0, address: true }
  );

  return allAddresses[0].address;
};

const deleteAddress = async (email, addressId) => {
  const filter = { email };
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  user.address = user.address.filter(
    (address) => address.addressId !== addressId
  );

  await user.save();

  return user.address;
};

module.exports = { setAddress, getAllAddress, deleteAddress };
