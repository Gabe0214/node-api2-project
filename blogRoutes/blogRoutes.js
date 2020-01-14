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


// GET POST BY ID 

router.get('/posts/:id' , (req, res) => {
    const id = req.params.id
    
    postDataBase.findById(id)
        .then( userId=> {
        
        if(!userId[0]) {
            res.status(404).json({error: "Post with specified ID does not exist"})
        } else {
            res.status(201).json(userId)
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The Posts information could not be retrieved"})
    })
 } )

 // DELETE POST BY ID
 router.delete('/posts/:id', (req, res) => {
     const id = req.params.id

     postDataBase.remove(id)
     .then( result => {
           if(!result) {
               res.status(404).json({error: "Specified ID does not exist"})
           } else {
               res.status(201).json(4)
           }
     })
     .catch( error => {
        res.status(500).json({errorMessage: "The Posts information could not be retrieved"})
     })
 }) 

//  GET COMMENTS BY ID 

router.get('/posts/:id/comments' , (req , res) => {
    
    const id = req.params.id

    postDataBase.findPostComments(id)
     .then( userId => {
         if(!userId) {
             status(404).json({message: "Id does not exist"})
         } else {
             postDataBase.findCommentById(id)
             .then( comments => {
                 res.status(201).json(comments)
             })
             .catch(error => {
                 res.status(500).json({message: "Error when finding comments"})
             })
         }
     } )
     .catch( error => {
         res.status(500).json({message: "Error with server"})
     })
})

// POST A POST 


router.post('/posts' , (req, res) => {
    const post = req.body
   
    const { title, contents } = post
  
    if(!title || !contents){
        res.status(400).json({errorMessage: "Please provide title and contents"})
    }
    postDataBase.insert(post)
    .then( data => {
        res.status(201).json(data)
    })
    .catch( error => {
        res.status(500).json({message: "Error with server"})
    })
})


module.exports = router 