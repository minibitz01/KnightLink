const express = require("express");
const {
    createProfile,
    getProfile,
    updateProfile
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create profile
router.post("/", authMiddleware, createProfile);

// Get logged-in user's profile
router.get("/", authMiddleware, getProfile);

// Update profile
router.put("/", authMiddleware, updateProfile);

module.exports = router;