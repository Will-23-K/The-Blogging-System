const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/auth");

// ---- Multer setup for profile picture uploads ----
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ---- GET user profile + their posts ----
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const posts = await Post.find({ author: user._id })
            .populate("author", "username bio profilePic")
            .sort({ createdAt: -1 });

        res.json({ user, posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ---- PUT update bio/profilePic ----
router.put("/:username", protect, upload.single("profilePic"), async (req, res) => {
    try {
        // Only allow user to update their own profile
        if (req.user.username !== req.params.username && req.user.role !== "admin")
            return res.status(403).json({ message: "Not allowed" });

        const { bio } = req.body;
        const updateData = { bio };

        if (req.file) {
            updateData.profilePic = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { $set: updateData },
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
