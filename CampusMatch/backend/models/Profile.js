const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    photos: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("Profile", profileSchema, "Profiles");