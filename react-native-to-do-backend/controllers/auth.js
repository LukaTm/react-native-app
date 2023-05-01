const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const Post = require("../models/Todo");

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // COMPARE
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                // Generate a new JWT for the authenticated user. This allows requests made by the authenticated user to be associated with their account.
                userId: user._id.toString(),
            },
            // user to verify and ONLY server knows it
            process.env.JWT_SECRET
            // { expiresIn: "1h" }
        );

        res.status(200).json({
            token: token,
            userId: user._id.toString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

exports.postSignup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
        });

        await user.save();

        res.status(201).json({
            message: "User created!",
            userId: user._id.toString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

exports.postTodo = async (req, res) => {
    const { enteredName } = req.body;
    let creator;

    try {
        const post = new Post({
            content: enteredName,
            creator: req.userId,
        });

        await post.save();

        const findUser = await User.findById(req.userId);
        findUser.posts.push(post);
        const savePushedPost = await findUser.save();

        res.status(201).json({ message: "Post created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create post" });
    }
};
