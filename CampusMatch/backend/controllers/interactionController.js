const Interaction = require("../models/Interaction");
const Match = require("../models/Match");


// Create an interaction (like or reject)
const createInteraction = async (req, res) => {
    try {
        const { toUserId, action } = req.body;

        const fromUserId = req.user.userId;


        // Prevent interacting with yourself
        if (fromUserId === toUserId) {
            return res.status(400).json({
                message: "You cannot interact with yourself"
            });
        }


        // Validate action
        if (!["liked", "rejected"].includes(action)) {
            return res.status(400).json({
                message: "Action must be liked or rejected"
            });
        }


        // Check if user already made a decision
        const existingInteraction = await Interaction.findOne({
            fromUserId,
            toUserId
        });

        if (existingInteraction) {
            return res.status(400).json({
                message: "You already interacted with this user"
            });
        }


        // Create interaction
        const interaction = await Interaction.create({
            fromUserId,
            toUserId,
            action
        });


        // If it is a like, check for mutual like
        if (action === "liked") {

            const mutualLike = await Interaction.findOne({
                fromUserId: toUserId,
                toUserId: fromUserId,
                action: "liked"
            });


            if (mutualLike) {

                interaction.matched = true;
                mutualLike.matched = true;

                await interaction.save();
                await mutualLike.save();


                // Create match record
                const match = await Match.create({
                    matchid: interaction._id,
                    User_id1: fromUserId,
                    User_id2: toUserId
                });


                return res.status(201).json({
                    message: "It's a match!",
                    interaction,
                    match
                });
            }
        }


        res.status(201).json({
            message: "Interaction created successfully",
            interaction
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get my interactions
const getMyInteractions = async (req, res) => {
    try {

        const interactions = await Interaction.find({
            fromUserId: req.user.userId
        });

        res.json(interactions);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createInteraction,
    getMyInteractions
};