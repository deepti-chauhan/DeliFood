// services/service.js
const ServiceModel = require('../models/service');

const getServices = async () => {
  return await ServiceModel.find({});
};

module.exports = { getServices };
