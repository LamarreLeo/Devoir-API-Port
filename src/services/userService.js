const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/password");

const createUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        const error = new Error("Email déjà utilisé");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    const userOBJ = newUser.toObject();
    delete userOBJ.password;

    return userOBJ;
};

module.exports = {
    createUser,
};
