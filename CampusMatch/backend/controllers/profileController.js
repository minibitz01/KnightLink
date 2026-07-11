const Profile = require("../models/Profile");

// Create profile
const createProfile = async (req, res) => {
    try {
        const { name, age, major, bio, photos } = req.body;

        // Check if user already has a profile
        const existingProfile = await Profile.findOne({
            userId: req.user.userId
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists"
            });
        }

        const profile = await Profile.create({
            userId: req.user.userId,
            name,
            age,
            major,
            bio,
            photos
        });

        res.status(201).json({
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get logged-in user's profile
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            userId: req.user.userId
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(profile);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update profile
const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            {
                userId: req.user.userId
            },
            req.body,
            {
                new: true
            }
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createProfile,
    getProfile,
    updateProfile
};