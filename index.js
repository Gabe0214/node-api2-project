const express = require('express')

const blogRoutes = require('./blogRoutes/blogRoutes.js') 

const server = express();

server.use('/blogs/api', blogRoutes)

server.use('/', (req, res) => {
    res.status(201).send('Welcome to home')
})



server.listen(5000, () => {
    console.log(`server running in port 5000`)
})