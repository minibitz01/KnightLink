const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    action: {
        type: String,
        enum: ["liked", "rejected"],
        required: true
    },

    matched: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate interactions between the same two users
interactionSchema.index(
    { fromUserId: 1, toUserId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "Interaction",
    interactionSchema,
    "Interactions"
);