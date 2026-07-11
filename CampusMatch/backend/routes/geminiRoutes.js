const express = require("express");
const generateResponse = require("../services/geminiService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Prompt is required"
            });
        }

        const response = await generateResponse(prompt);

        res.json({
            response: response
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Gemini request failed"
        });
    }
});

module.exports = router;