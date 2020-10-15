const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  Comment = require("../../db/models/comment"),
  Post = require("../../db/models/post"),
  User = require("../../db/models/user");

// ***********************************************//
// Create a user
// ***********************************************//
router.post("/api/users/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({
      username,
      email,
      password,
    });

    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

// ***********************************************//
// Login a user
// ***********************************************//
router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

// GET POSTS
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.sendStatus(404);
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET POST BY ID
router.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendStatus(404);
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET POSTS BY AUTHOR ID
router.get("/api/users/:id/posts", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.sendStatus(404);
    } else {
      const posts = await Post.find({ _id: { $in: user.posts } });
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET COMMENTS BY POST ID
router.get("/api/posts/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.sendStatus(404);
    } else {
      const comments = await Comment.find({ _id: { $in: post.comments } });
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// ADD COMMENT TO POST
router.post("/api/posts/:id/comments", async (req, res) => {
  const { text } = req.body;
  const name = req.body.name || "anonymous";
  try {
    const newComment = new Comment({
      name,
      text,
      post: req.params.id,
    });
    await newComment.save();
    const post = await Post.findById(newComment.post);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
