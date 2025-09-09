const Catway = require("../models/catwayModel");

const createCatway = async (catwayData) => {
    return await Catway.create(catwayData);
};

const getAllCatways = async () => {
    return await Catway.find();
};

const getCatwayById = async (catwayNumber) => {
    return await Catway.findOne({ catwayNumber });
};

module.exports = { createCatway, getAllCatways, getCatwayById };
