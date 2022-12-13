require("dotenv").config();
const db = require("../Models/DB");
const mongoose = require("mongoose");
const { response } = require("express");
const cloudinary = require("cloudinary");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { Promise } = require("mongodb");

//User registration
const registerUser = async (req, res) => {
  //there are the fields needed to register a user
  //create a form with these fields for frontend
  console.log(req.body);
  let { username, name, email, password, dateOfBirth } = req.body;
  const picture =
    "https://res.cloudinary.com/dpcevmfx3/image/upload/v1668631403/nopp_dkvmzd.png";

  const userInDb = await db.User.findOne({ username: username });

  const emailInDb = await db.User.findOne({ email: email });
  dateOfBirth instanceof Date;

  const re = /.+\@.+\..+/;

  //email and username must be unique
  if (userInDb != null || emailInDb != null || !re.test(email)) {
    res.json({ validReg: false });
    console.log("Caught");
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    console.log(password);

    const newUser = new db.User({
      name: name,
      username: username,
      password: req.body.password,
      email: email,
      dateOfBirth: dateOfBirth,
      picture: picture,
    });

    newUser.save();
    // res.json(newUser);
    res.json({ validReg: true });
  }
};

//For login page checks for valid credentials then creates a JWT
//JWT is sent back and will need to be put in local storage to be used on all pages
const loginUser = async (req, res) => {
  //use username and password to login
  const { username, password } = req.body;

  db.User.findOne({ username: username }, function (err, person) {
    if (err) {
      res.send("Invalid login, get your info correct next time");
    } else {
      if (person == null) {
        res.json({
          message: "Incorrect Username",
          login: false,
        });
      } else {
        console.log(person.password, password);
        bcrypt.compare(password, person.password).then((isCorrect) => {
          console.log(isCorrect);
          if (isCorrect) {
            const user = {
              id: person._id,
              username: person.username,
            };
            jwt.sign(
              user,
              process.env.JWT_SECRET,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) {
                  console.log("oops!", err);
                  console.log(JSON.stringify(user));
                  return res.json({ message: err });
                }
                return res.json({
                  message: "Login Successfully",
                  token: "Bearer " + token,
                  username: person.username,
                  userId: person._id,
                  login: true,
                });
              }
            );
          } else {
            return res.json({ message: "Login Unsuccessful", login: false });
          }
        });
      }
    }
  });
};

//this verifys the logged in user.
//not important for frontend
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({
          isLoggedIn: false,
          message: "Failed to authenticate, she doesn't even go here",
        });
      }
      console.log("I am here");
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({
      message: "Incorrect token given, Who are you?",
      isLoggedIn: false,
    });
  }
}

//gets a user from id
//url: api/user/:id
//probably not super useful
const getUser = async (req, res) => {
  const { id } = req.params;

  const post = await db.User.findOne({ username: id }).populate("pets");

  res.status(200).json(post);
};

//gets the currently logged in users' profile
//url: api/user

const getProfile = async (req, res) => {
  const post = await db.User.findOne({ username: req.user.username }).populate(
    "pets"
  );

  res.status(200).json(post);
};

//allows a user ot add an adidtional pet to their profile
//this could be down right after registering or anytime in the profile page
//url: api/user/addPet
const addPet = async (req, res) => {
  //a new pet will need these fields to be created
  console.log("hi");
  let photos = [];
  let { name, animal, breed, tags, image } = req.body;
  tags = tags.split(",");
  const files = req.files;
  console.log(image);
  console.log(breed);
  for (const file of files) {
    console.log("hi there");
    await cloudinary.v2.uploader.upload(file.path, function (err, result) {
      if (err) {
        req.json(err.message);
      }
      console.log(result.secure_url);
      photos.push(result.secure_url);
    });
  }
  console.log(photos);

  try {
    const newPet = await db.Pet.create({ name, animal, breed, tags, photos });
    const petOwner = await db.User.findOne({ username: req.user.username });

    petOwner.pets.push(newPet._id);

    await petOwner.save();
    const returnUser = await db.User.findOne({
      username: req.user.username,
    }).populate("pets");

    res.status(200).json(returnUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a user profile
//url: api/user
//could use some work but currently just updates using the req body
const updateUser = async (req, res) => {
  // const { id } = req.params
  if (req.body.password != undefined) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body.password);
  }
  const re = /.+\@.+\..+/;
  if (req.body.email != undefined && !re.test(req.body.email)) {
    console.log("Fake Email");
    res.send("Invalid Email");
  } else {
    const userToUpdate = await db.User.findOneAndUpdate(
      { username: req.user.username },
      {
        ...req.body,
      }
    );

    if (!userToUpdate) {
      return res.status(400).json({ error: "No such User" });
    }

    const user = await db.User.findOne({ _id: req.user.id }).populate("pets");

    res.status(200).json(user);
  }
};

const addProfilePic = async (req, res) => {
  console.log(req.file);
  if (req.file == null) {
    return res.status(400);
  }
  // console.log(req);
  cloudinary.v2.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      req.json(err.message);
    }

    const update = { picture: result.secure_url };
    console.log(update);
    const userToUpdate = await db.User.findOneAndUpdate(
      { _id: req.user.id },
      { picture: result.secure_url },
      { new: true, strict: false }
    );
    console.log(result.secure_url);

    if (!userToUpdate) {
      return res.status(400).json({ error: "No such User" });
    }
  });
  const user = await db.User.findOne({ _id: req.user.id }).populate("pets");

  res.status(200).json(user);
};

//gets a list of all of the logged in user's posts.
//url: api/user/myPosts
//all fields are populated
const getMyPosts = async (req, res) => {
  console.log(req.user.username);
  const userPosts = await db.Post.find({ author: req.user.id })
    .populate("author")
    .populate("pet")
    .populate("comments");

  res.status(200).json(userPosts);
};

//gets a list of all of the logged in user's pets
//url: api/user/myPets
const getMyPets = async (req, res) => {
  console.log(req.user.username);

  const pets = await db.User.findOne({ username: req.user.username })
    .populate("pets")
    .select("pets -_id");

  res.status(200).json(pets);
};

const addPetPic = async (req, res) => {
  console.log(req.user.username);
  // let photos = []
  const files = req.files;
  const { id } = req.params;

  const pet = await db.Pet.findOne({ _id: id });

  for (const file of files) {
    console.log("hi there");
    await cloudinary.v2.uploader.upload(file.path, function (err, result) {
      if (err) {
        req.json(err.message);
      }
      console.log(result.secure_url);
      pet.photos.push(result.secure_url);
    });

    await pet.save();
  }

  const pets = await db.User.findOne({ username: req.user.username })
    .populate("pets")
    .select("pets -_id");

  res.status(200).json(pets);
};

module.exports = {
  getUser,
  updateUser,
  registerUser,
  loginUser,
  getProfile,
  addPet,
  getMyPosts,
  getMyPets,
  addProfilePic,
  addPetPic,
  verifyJWT,
};
