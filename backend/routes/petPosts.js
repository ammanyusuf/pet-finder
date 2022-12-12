const express = require('express')

const { getPosts, getPost, makePost, updatePost, searchPost, deletePost, makeComment, deleteComment, updateComment} = require('../apiCommands/postFunctions')
const { verifyJWT } = require('../apiCommands/userFunctions')


const router = express.Router()


//search post route
router.post('/search', searchPost)

/*
    getting, making, updating, deleting post and comment routes
*/
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', verifyJWT, makePost)
router.post('/:id', verifyJWT, makeComment)  
router.delete('/:id/:cid', verifyJWT, deleteComment)
router.delete('/:id', verifyJWT, deletePost)
router.patch('/:id', verifyJWT, updatePost)
router.patch('/:id/:cid', verifyJWT, updateComment)



module.exports = router