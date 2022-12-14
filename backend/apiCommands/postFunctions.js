const Posts = require("../Models/DB");
const mongoose = require("mongoose");
const { response } = require("express");
const moment = require("moment");

const getPosts = async (req, res) => {
  //console.log("Hello from posts");
  const hello = { hello: "hello" };

  //get all posts, sorted by most recent
  const petPosts = await Posts.Post.find({})
    .sort({ createdAt: -1 })
    .populate("comments")
    .populate("author")
    .populate("pet");
  res.status(200).json(petPosts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  Posts.Post.countDocuments({ _id: id }, async function (err, count) {
    if (count > 0) {
      const post = await Posts.Post.findById({ _id: id })
        .populate({ path: "comments", populate: "author" })
        .populate("author")
        .populate("pet");

      res.status(200).json(post);
    } else {
      return res.status(400).json({ error: "No such post" });
    }
  });
};

const makePost = async (req, res) => {
  //input fields will be populated into json object to be used to create post
  const { title, description, pet, resolved, dateLost, location } = req.body;
  // const thepet =
  console.log(req.body);
  const pet1 = await Posts.Pet.findOne({ _id: pet });
  console.log(pet1);
  let photos = null;
  if (pet1.photos.length > 0) {
    photos = pet1.photos;
  } else {
    photos =
      "https://res.cloudinary.com/dpcevmfx3/image/upload/v1668630626/lost_pet_cartoon_ildgji.jpg";
  }

  // add to the database
  let author = req.user.id;

  console.log(author);
  try {
    const newPost = await Posts.Post.create({
      title,
      description,
      author,
      pet,
      resolved,
      dateLost: moment(dateLost).format(),
      location,
      photos,
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  //post id will be appended to params when clicked (button press)
  const { id } = req.params;

  Posts.Post.countDocuments({ _id: id }, async function (err, count) {
    if (count > 0) {
      const postCheck = await Posts.Post.findOne({ _id: id });

      if (postCheck.author != req.user.id) {
        return res
          .status(400)
          .json({ error: "Not Your Post to update playyya" });
      }

      const postToUpdate = await Posts.Post.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );

      if (!postToUpdate) {
        return res.status(400).json({ error: "No such post" });
      }

      res.status(200).json(postToUpdate);
    } else {
      return res.status(400).json({ error: "No such post" });
    }
  });

  //console.log("We are updating this post to resolve or comment", id)
  //res.send("We have updated your post, happy pet finding " + id + "!")
};

const searchPost = async (req, res) => {
  //inputs coming from frontend will populate this json object
  //populated fields will be used to search and filter db results
  //const { resolved, animal, breed, date, tag, location } = req.body;

  const searchQuery = {
    // resolved: req.body.resolved,
    // Location: req.body.Location,
    animal: req.body.animal,
    breed: req.body.breed,
    name: req.body.name,
    tags: req.body.tags,
    // tags: req.body.tags
  };
  // console.log(searchQuery.tags);
  searchQuery.tags = searchQuery.tags.split(",");
  if (searchQuery.breed == "") {
    searchQuery.breed = /./;
  } else {
    breed = req.body.breed;
  }

  let post2;
  console.log(searchQuery.tags);

  // const tagArray = Array.from(searchQuery.tags);
  for (let j = 0; j < searchQuery.tags.length; j++) {
    searchQuery.tags[j] = searchQuery.tags[j].replace(/\s/g, "");
    console.log(searchQuery.tags[j]);

    // }
  }
  const tagArray = JSON.stringify(searchQuery.tags);
  console.log(tagArray);

  if (searchQuery.tags[0] === "") {
    post2 = await Posts.Post.find(searchQuery)
      .populate({
        path: "pet",
        match: {
          animal: { $regex: searchQuery.animal },
          breed: { $regex: searchQuery.breed },
          name: { $regex: searchQuery.name },
        },
      })
      .populate({ path: "comments", populate: "author" })
      .populate("author")
      .then((orders) => orders.filter((order) => order.pet != null));
  } else {
    post2 = await Posts.Post.find(searchQuery)
      .populate({
        path: "pet",
        match: {
          animal: { $regex: searchQuery.animal },
          breed: { $regex: searchQuery.breed },
          name: { $regex: searchQuery.name },
          tags: { $in: searchQuery.tags },
        },
      })
      .populate({ path: "comments", populate: "author" })
      .populate("author")
      .then((orders) => orders.filter((order) => order.pet != null));
  }
  res.status(200).json(post2);
};

const deletePost = async (req, res) => {
  //when delete button pressed, append id of post to url so it can be used to delete from db
  Posts.Post.countDocuments({ _id: id }, async function (err, count) {
    if (count > 0) {
      const { id } = req.params;

      const person = await Posts.Post.findOne({ _id: id });

      if (person.author != req.user.id) {
        return res.status(400).json({ error: "Not Your Post" });
      }

      const post = await Posts.Post.findOneAndDelete({ _id: id });

      res.status(200).json(post);
    } else {
      return res.status(400).json({ error: "No such post" });
    }
  });
};

const updateComment = async (req, res) => {
  //in frontend the id of the post and comment will be appended to the url.
  //Do this when user clicks a update button and this api function is called

  const { id, cid } = req.params;
  Posts.Comment.countDocuments({ _id: cid }, async function (err, count) {
    if (count > 0) {
      const { upvote } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such post" });
      }

      // let comment = '';

      if (upvote) {
        const comment = await Posts.Comment.findOneAndUpdate(
          { _id: cid },
          { $inc: { upvotes: 1 } },
          { new: true }
        );
        res.status(200).json(comment);
      } else {
        console.log("negative");
        const comment = await Posts.Comment.findOneAndUpdate(
          { _id: cid },
          { $inc: { upvotes: -1 } },
          { new: true }
        );
        res.status(200).json(comment);
      }
    } else {
      return res.status(400).json({ error: "No such Comment" });
    }
  });
};

const deleteComment = async (req, res) => {
  //in frontend the id of the post and comment will be appended to the url. Do this when user clicks a delete button and this is called
  const { id, cid } = req.params;

  Posts.Comment.countDocuments({ _id: cid }, async function (err, count) {
    if (count > 0) {
      const commentCheck = await Posts.Comment.findById({ _id: cid });
      console.log(commentCheck);

      if (commentCheck.author != req.user.id) {
        res.send("what you doing dawg, this ain't your comment to delete");
      }

      const comment = await Posts.Comment.findOneAndDelete({ _id: cid });

      const post = await Posts.Post.findById({ _id: id });

      for (var i = 0; i < post.comments.length; i++) {
        temp = JSON.stringify(post.comments[i]);

        if (temp == `"${cid}"`) {
          console.log("I'm here. Delete me");

          post.comments.splice(i, 1);
        }
      }

      await post.save();
      res.status(200).json(post);
      //res.status(200).json(comment)
    } else {
      return res.status(400).json({ error: "No such Comment" });
    }
  });
};

const makeComment = async (req, res) => {
  //make comment will have post id appeneded to params
  //this will be done through a make comment button or when a text box is clicked on frontend
  const { id } = req.params;

  //retrieve info from inputs in JSON format
  const { body, upvotes } = req.body;

  //get author from token
  let author = req.user.id;

  //make comment and update post to attach it to the comment
  try {
    const newComment = await Posts.Comment.create({ body, upvotes, author });
    // const curpost = await Posts.Post.findById(postId);
    console.log(id);
    const curpost = await Posts.Post.findById({ _id: id });
    console.log(newComment._id);
    console.log(curpost);
    curpost.comments.push(newComment._id);
    await curpost.save();
    res.status(200).json(curpost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//exports
module.exports = {
  getPosts,
  getPost,
  makePost,
  updatePost,
  searchPost,
  deletePost,
  makeComment,
  deleteComment,
  updateComment,
};
