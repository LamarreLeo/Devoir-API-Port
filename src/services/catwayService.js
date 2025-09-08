const Catway = require("../models/catwayModel");

const createCatway = async (catwayData) => {
    return await Catway.create(catwayData);
};
