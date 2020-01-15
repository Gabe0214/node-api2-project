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
    
    postDataBase.findCommentById(req.params.id)
    .then(hub => {
        console.log(hub)
        if(hub.length === 0){
            res.status(404).json({message: 'Post not found'})
        }else{
            res.status(200).json(hub)
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding comment'})
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


// POST A COMMENT TO A POST


router.post('/posts/:id/comments', (req, res) => {
    postDataBase.findById(req.params.id)
        .then(post => {
           !post[0] ?
            res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            req.body.text ?
            postDataBase.insertComment(req.body)
                .then(post => res.status(201).json(post)) :
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        })
        .catch(error => {
            res.status(500).json({message: "Error with comment database"})
        })
})


// DELETE 

router.delete('/posts/:id' , (req, res) =>{
    const id = req.params.id

    postDataBase.remove(id)
    .then(result => {
        if(!result) {
            res.status(404).json({error: "Specified Id does not exist"})
        } else {
            res.status(201).json(4)
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Something went wrong with deleting user"})
    })

})


// PUT update a post


router.put('/posts/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
 
  const { title, contents} = data

    if(!title || !contents){
        res.status(400).json({errorMessage: "Please provide title and contents"})
    }
    postDataBase.update(id , data)
    .then( info => {
        info ? 
        res.status(200).json(info) : 
        res.status(404).json({errorMessage: "Specified Id does not exist"})
    })
    .catch( error => {
        res.status(500).json({message: "Error with server"})
    })
} )

// const id = req.params.id
//     const info = req.body
 
//    const { text } = info

//      if(text){
//         postDataBase.findById(id)
//         .then(info => {
//             if(!id) {
//                 res.status(404).json({error: "ID does not exist"})
//            } else {
//                postDataBase.insertComment(info)
//                .then( result => {
//                    res.status(201).json(result)
//                })
//                .catch( error => {
//                    res.status(500).json({errorMessage: "Error with comments "})
//                })
     
//            }
//         })
//      } else {
//          res.status(500).json({message: "error with comment server"})
//      }



module.exports = router 