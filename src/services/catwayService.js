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

const updateCatwayState = async (catwayNumber, newState) => {
    return await Catway.findOneAndUpdate(
        { catwayNumber },
        { catwayState: newState },
        { new: true }
    );
};

const deleteCatway = async (catwayNumber) => {
    return await Catway.findOneAndDelete({ catwayNumber });
};

module.exports = {
    createCatway,
    getAllCatways,
    getCatwayById,
    updateCatwayState,
    deleteCatway,
};
