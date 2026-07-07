const authRoutes = require("./src/routes/authRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

const createSuperAdmin = require("./src/utils/createSuperAdmin");

const testRoutes = require("./src/routes/testRoutes");

const questionRoutes = require("./src/routes/questionRoutes");

const attemptRoutes = require("./src/routes/attemptRoutes");

const resultRoutes = require("./src/routes/resultRoutes");



dotenv.config();

connectDB();

createSuperAdmin();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tests", testRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/attempts", attemptRoutes);

app.use("/api/results", resultRoutes);

app.get("/", (req, res) => {
  res.send("WKF True-False API Running");
});

const PORT = process.env.PORT||5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});