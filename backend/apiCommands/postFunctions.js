const Posts = require('../Models/DB')
const mongoose = require('mongoose')
const { response } = require('express')

const getPosts = async (req, res) => {
    console.log("Hello from posts")
    const hello = {'hello' : "hello"}

    //get all posts, sorted by most recent
    const petPosts = await Posts.Post.find({}).sort({createdAt: -1}).populate('comments').populate('author')

    res.status(200).json(petPosts)

    //res.status(200).json(hello)
    }

const getPost = async (req, res) =>
{
    const { id } = req.params

    const post = await Posts.Post.findById({_id: id}).populate({path :'comments', populate : 'author'}).populate('author')
   
    res.status(200).json(post)
    
}


const makePost = async (req, res) => {

    //input fields will be populated into json object to be used to create post
    const {title, description, pet, resolved, dateLost, Location} = req.body


    // add to the database
    let author = req.user.id
    console.log(author)
    try {
        const newPost = await Posts.Post.create({title, description, author, pet, resolved, dateLost, Location})
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    // const {username, pet, PID, description, location, picture} = req.body
    // console.log(req.body)
    // res.status(200).json(req.body)
    
    

}




const updatePost = async (req, res) => {

    //post id will be appended to params when clicked (button press)
    const { id } = req.params

    const postCheck = await Posts.Post.findOne({_id : id})
       
    
    if(postCheck.author != req.user.id){
        return res.status(400).json({error: 'Not Your Post to update playyya'})
    }

    

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({error: 'No such post'})
    // }

    const postToUpdate = await Posts.Post.findOneAndUpdate({_id: id}, {
         ...req.body
    })

    if (!postToUpdate) {
        return res.status(400).json({error: 'No such post'})
    }

    res.status(200).json(postToUpdate)

    //console.log("We are updating this post to resolve or comment", id)
    //res.send("We have updated your post, happy pet finding " + id + "!")
}

const searchPost = async (req, res) => {
    
    //inputs coming from frontend will populate this json object
    //populated fields will be used to search and filter db results
    const {resolved, animal, breed, date, tag, location} = req.body

    console.log(JSON.stringify(req.body))

    var searchQuery = {
        resolved: resolved, 
        Location: location
    };

    let filter = req.body
    console.log(searchQuery)

    const post2 = await Posts.Post.find( searchQuery  )//.populate({path : 'pet',
                                                       // match : {animal : { $eq : animal}}})
                                                        //.then((orders)=>orders.filter((order=>order.pet !=null)));
    // const { id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({error: 'No such post'})
    // }

    // const post = await Posts.Post.findById({_id: id})
    //const post = await Posts.Post.find({ resolved: false}).exec();
    const post = await Posts.Post.find( { } ).populate({path : 'pet',
                                                        match : {animal : { $eq : animal}}})
                                                        .then((orders)=>orders.filter((order=>order.pet !=null)));

    res.status(200).json(post2)
    // const post2 = await Posts.Post.find({ Location : location}).populate('pet').select('_id');
    // // const post = await Posts.Post.find({}).populate('pet').find({resolved : false})
    // //const {_id} = post[0]
    // results = [post, post2]
    // console.log(results)
    // filterResults = []
    // //console.log(_id)

    

    // for(let i = 0; i < results.length; i++)
    // {
    //     for(let j = 0; j < results[i].length; j++)
    //     {
    //         console.log(results[i][j])
    //         const {_id} = results[i][j][0]
    //         const temp = JSON.stringify(_id)
    //         // const {_id} = results[i][0]
    //         console.log(typeof temp,temp, i)
    //         //filterResults.push(_id)
    //         //console.log(results[j][0][0])
    //         if(filterResults.includes(temp) === false)
    //         {
    //             console.log("adding")
    //             filterResults.push(temp)
    //         }
    //     }
    
    // }
    // theFinalList = []
    // for(let i = 0; i < filterResults.length; i++)
    // {
    //     // filterResults[i] = `{'_id' : ${filterResults[i]}}`
        
    //     filterResults[i] = filterResults[i].replace(/['‘’"“”]/g, '')
    //     console.log(filterResults[i])
    //     // filterResults[i] = JSON.parse(filterResults[i])
    //     theFinalList[i] = await Posts.Post.findById({_id: filterResults[i]}).populate('comments').populate('author')
    // }

    // if (results.length == 0) {
    //     return res.status(400).json({error: 'No posts match search'})
    // }

    // res.status(200).json(theFinalList)

    

    //console.log("We are finding your post " + id + ". But it's hard! So give us a sec")
    //res.send("We have found your post, happy pet finding " + id + "!")
}

const deletePost = async (req, res) => {

    //when delete button pressed, append id of post to url so it can be used to delete from db
    const { id } = req.params

    const person = await Posts.Post.findOne({_id : id})
       
    
    if(person.author != req.user.id){
        return res.status(400).json({error: 'Not Your Post'})
    }
    

    const post = await Posts.Post.findOneAndDelete({_id : id})

    res.status(200).json(post)

    // console.log("We are deleting your post " + id + ". One moment please")
    // res.send("We have deleted your doge post dog, happy pet finding " + id + "!")
}

const updateComment = async (req, res) => {

    //in frontend the id of the post and comment will be appended to the url. 
    //Do this when user clicks a update button and this api function is called
    const { id, cid } = req.params


    const { upvote } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such post'})
    }

    // let comment = '';

    if (upvote) {
        const comment = await Posts.Comment.findOneAndUpdate(
            {_id: cid}, 
            {$inc : {'upvotes' : 1}}, 
            { new: true }
            );
        res.status(200).json(comment)
    } else {
        console.log('negative')
        const comment = await Posts.Comment.findOneAndUpdate(
            {_id: cid}, 
            {$inc : {'upvotes' : -1}}, 
            { new: true }
            );
        res.status(200).json(comment)
    }

    // res.status(200).json(comment)

    //console.log("We are updating this post to resolve or comment", id)
    //res.send("We have updated your post, happy pet finding " + id + "!")
}


const deleteComment = async (req, res) => {
    
    //in frontend the id of the post and comment will be appended to the url. Do this when user clicks a delete button and this is called
    const { id, cid } = req.params

    const commentCheck = await Posts.Comment.findById({_id : cid})
    console.log(commentCheck)

    if(commentCheck.author != req.user.id){
        res.send("what you doing dawg, this ain't your comment to delete")
    }



    const comment = await Posts.Comment.findOneAndDelete({_id : cid})

    const post = await Posts.Post.findById({_id : id})

  

    for( var i = 0; i < post.comments.length; i++){ 
        temp = JSON.stringify(post.comments[i])

        if ( temp == `"${cid}"`) { 
            csonsole.log("I'm here. Delete me")
    
            post.comments.splice(i, 1); 
        }
    
    }
    // const index = post.comments.indexOf(`new ObjectId("${cid}")`);
    // if (index > -1) { // only splice array when item is found
    //     post.comments.splice(index, 1); // 2nd parameter means remove one item only
    // }
    await post.save();
    res.status(200).json(post)
    //res.status(200).json(comment)

    // console.log("We are deleting your post " + id + ". One moment please")
    // res.send("We have deleted your doge post dog, happy pet finding " + id + "!")
}

const makeComment = async (req, res) => 
{
    //make comment will have post id appeneded to params 
    //this will be done through a make comment button or when a text box is clicked on frontend
    const {id} = req.params


    //retrieve info from inputs in JSON format
    const {body, upvotes} = req.body

    //get author from token
    let author = req.user.id


    //make comment and update post to attach it to the comment
    try {
        const newComment = await Posts.Comment.create({body, upvotes, author})
        // const curpost = await Posts.Post.findById(postId);
        console.log(id)
        const curpost = await Posts.Post.findById({_id: id})
        console.log(newComment._id)
        console.log(curpost)
        curpost.comments.push(newComment._id)
        await curpost.save();
        res.status(200).json(curpost)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

//     const postToUpdate = await Posts.Post.findOneAndUpdate({_id: postId}, {
//         "comments" : newComment._id
//    })


//    if (!postToUpdate) {
//        return res.status(400).json({error: 'No such workout'})
//    }

//    res.status(200).json(postToUpdate)


}




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
    updateComment
    }