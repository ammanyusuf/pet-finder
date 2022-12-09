const express = require('express')
const upload = require("../utils/multer.js");

const {getUser, updateUser, registerUser, loginUser, getProfile, addPet, getMyPosts, getMyPets, addProfilePic, addPetPic, verifyJWT} = require('../apiCommands/userFunctions')

const router = express.Router()


/*
    register and login routes
*/
router.post('/register',registerUser)

router.post('/login', loginUser)


//test route for getting user who is logged in
router.get('/getUser', verifyJWT, (req, res) =>{
    console.log("I have made it back here :)")
    res.send("Welcome")
})



router.get('/myPosts', verifyJWT, getMyPosts)

router.get('/myPets', verifyJWT, getMyPets)

//router.patch('/myPets/:id', verifyJWT, upload.array("image", 10), addPetPic)

router.get('/:id', getUser)

router.get('/', verifyJWT, getProfile)

router.post('/addPet', verifyJWT, upload.array("image", 10), addPet)

router.patch('/addPicture', verifyJWT, upload.single("image"), addProfilePic)

router.patch('/', verifyJWT, updateUser)



module.exports = router
