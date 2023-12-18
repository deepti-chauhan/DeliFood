// controllers/serviceController.js
const service = require('../services/serviceService')

// @method     - get
// @access     - public
// @endpoint   - /services
const getServices = async (req, res) => {
  try {
    const result = await service.getServices()
    return res.status(200).send(result)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Internal Server Error')
  }
}

module.exports = { getServices }
