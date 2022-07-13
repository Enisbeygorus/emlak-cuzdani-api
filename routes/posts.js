const express = require("express");

const router = express.Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} = require("../controllers/posts");

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;
