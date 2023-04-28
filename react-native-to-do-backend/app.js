const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/login");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// LIMIT REQUESTS 15 MIN | MAX - 100
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors());

app.use("/api", limiter, authRoutes);

// HANDLE incoming errors from routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error!");
});

mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB!");
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
