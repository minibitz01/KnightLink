const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({

    matchid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    User_id1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    User_id2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    MatchedAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "Match",
    matchSchema,
    "Matches"
);