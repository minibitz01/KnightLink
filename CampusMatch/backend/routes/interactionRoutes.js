const express = require("express");
const router = express.Router();

const {
    createInteraction,
    getMyInteractions
} = require("../controllers/interactionController");

const authMiddleware = require("../middleware/authMiddleware");


// Create like/reject
router.post("/", authMiddleware, createInteraction);


// Get my interactions
router.get("/", authMiddleware, getMyInteractions);


module.exports = router;