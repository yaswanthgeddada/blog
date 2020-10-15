const mongoose = require("mongoose"),
  validator = require("validator"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs"),
  Post = require("./post");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("can't be password.");
        }
        if (value.length < 6) {
          throw new Error("password must be at least 6 characters long.");
        }
      },
    },
    blogTitle: {
      type: String,
      trim: true,
    },
    blogDescription: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hide password & tokens for security
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// generate jwt token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await user.findOne({ email });
  if (!user) throw new Error("account doesn't exist");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("invalid credentials");
  return user;
};

// encrypt passwords
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete user entry when a user is removed.
userSchema.pre("remove", async function (next) {
  const user = this;
  await Post.deleteMany({
    owner: user._id,
  });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
