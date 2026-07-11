const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const express = require("express");
const cors = require("cors");


require("dotenv").config();

const connectDB = require("./config/db");
const geminiRoutes = require("./routes/geminiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/gemini", geminiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("CampusMatch API is running!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});