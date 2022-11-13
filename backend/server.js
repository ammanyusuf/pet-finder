require('dotenv').config();


const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const petRoutes = require('./routes/petPosts.js')
const userRoutes = require('./routes/userRoutes.js')


//express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api/posts', petRoutes);
app.use('/api/user', userRoutes);



//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('listenening on port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error + "I am error");
    })



