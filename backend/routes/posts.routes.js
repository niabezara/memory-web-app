const express = require("express");
const posts = require("../controller/posts");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", posts.getPosts);
router.post("/", auth, posts.createPost);
router.patch("/:id", auth, posts.updatePost);
router.delete("/:id", auth, posts.deletePost);
router.patch("/:id/likePost", auth, posts.likePost);

module.exports = router;
