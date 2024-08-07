const mongoose = require("mongoose");
const postSchema = require("../model/postModel");

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await postSchema.find();
    res.status(200).json(posts);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

// create post
const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new postSchema({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update posts
const updatePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "invalid id " });

  const updatePost = await postSchema.findByIdAndUpdate(
    _id,
    {
      ...req.body,
    },
    { new: true }
  );
  res.json(updatePost);
};

// delete post
const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "invalid id " });
  try {
    await postSchema.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  console.log("liked posts back", id);
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await postSchema.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index == -1) {
    //like post
    post.likes.push(req.userId);
  } else {
    // dislike post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await postSchema.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
