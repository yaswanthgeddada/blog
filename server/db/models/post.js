const mongoose = require("mongoose"),
  Comment = require("./comment"),
  User = require("./user");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    comments: [
      {
        type: Object,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// postSchema.methods.toJSON = function () {
//   const post = this;
//   const postObject = post.toObject();
//   if (postObject.createdAt) {
//     postObject.createdAt = moment(postObject.createdAt).format("YYYY-MM-DD");
//   }
//   return postObject;
// };

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
