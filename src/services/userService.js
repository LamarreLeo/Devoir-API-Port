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

const getAllUsers = async () => {
    return await User.find().select("-password");
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email }).select("-password");
};

const updateUser = async (email, updateData) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Utilisateur non trouvé");
        error.statusCode = 404;
        throw error;
    }

    if (updateData.username) {
        user.username = updateData.username;
    }

    if (updateData.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (
            existingUser &&
            existingUser._id.toString() !== user._id.toString()
        ) {
            const error = new Error("Email déjà utilisé");
            error.statusCode = 409;
            throw error;
        }
        user.email = updateData.email;
    }

    if (updateData.password) {
        const hashedPassword = await hashPassword(updateData.password);
        user.password = hashedPassword;
    }

    if (!updateData.username && !updateData.email && !updateData.password) {
        return user.toObject({
            transform: (__, ret) => {
                delete ret.password;
                return ret;
            },
        });
    }

    const updatedUser = await user.save();

    const userOBJ = updatedUser.toObject();
    delete userOBJ.password;

    return userOBJ;
};

const deleteUser = async (email) => {
    const deletedUser = await User.findOneAndDelete({ email }).lean();
    if (!deletedUser) return null;

    delete deletedUser.password;
    return deletedUser;
};

const userLogin = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Email ou mot de passe incorrect");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe incorrect");
    }

    const userOBJ = user.toObject();
    delete userOBJ.password;
    return userOBJ;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    userLogin,
};
