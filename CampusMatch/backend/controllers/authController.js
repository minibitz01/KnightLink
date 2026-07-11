const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register user
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            email,
            passwordHash
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    register
};