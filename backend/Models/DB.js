const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      // trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

const petSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    animal: {
      type: String,
      required: true,
      // trim: true,
    },
    breed: {
      type: String,
    },

    tags: [
      {
        type: String,
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const postSchema = Schema(
  {
    // _id:{
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Pet",
    },
    resolved: {
      type: Boolean,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true,
      // trim: true,
    },
    location: {
      type: String,
    },
    photos: [
      {
        type: String,
      },
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const commentSchema = Schema(
  {
    // _id:{
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    body: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Pet = mongoose.model("Pet", petSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Comment, Post, Pet };
