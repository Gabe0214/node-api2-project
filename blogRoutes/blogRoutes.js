const express = require('express')

const router = express.Router();

const postDataBase = require('../data/db')

router.get('/', ( req , res) => {
    res.status(200).send('This is the blog posts')
})

// GET List of posts 

router.get('/posts' , (req, res) => {
   postDataBase.find()
   .then( posts => {
       res.status(200).json(posts)
   })
   .catch(error => {
       res.status(500).json({errorMessage: "The Posts information could not be retrieved"})
   })
} )

module.exports = router 