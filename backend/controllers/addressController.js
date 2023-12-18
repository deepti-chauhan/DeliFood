const addressService = require('../services/addressService');

// @method   - post
// @access   - private
// @endpoint - /address/create
const setAddress = async (req, res) => {
  try {
    const { email } = req.user;
    const { address } = req.body;
    const { newAddress, updatedUser } = await addressService.setAddress(
      email,
      address
    );

    console.log(`address: ${JSON.stringify(req.body)}`);
    console.log(`update user address: ${JSON.stringify(updatedUser)}`);
    return res.status(201).send({ address: newAddress });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Address cannot be updated!' });
  }
};

// @method   - get
// @access   - private
// @endpoint - /address/all
const getAllAddress = async (req, res) => {
  try {
    const { email } = req.user;
    const allAddresses = await addressService.getAllAddress(email);

    return res.status(200).send(allAddresses);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: 'Not able to fetch addresses' });
  }
};

// @method   - delete
// @access   - private
// @endpoint - /address?addressId=
const deleteAddress = async (req, res) => {
  try {
    const { email } = req.user;
    const { addressId } = req.query;
    const addresses = await addressService.deleteAddress(email, addressId);

    if (!addresses) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(201).json(addresses);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Address cannot be deleted!' });
  }
};

module.exports = { setAddress, getAllAddress, deleteAddress };
