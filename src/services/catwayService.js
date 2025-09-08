const Catway = require("../models/catwayModel");

const createCatway = async (catwayData) => {
    return await Catway.create(catwayData);
};

const getAllCatways = async () => {
    return await Catway.find();
};

module.exports = { createCatway, getAllCatways };
