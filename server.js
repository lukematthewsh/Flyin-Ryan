//defining variables for express, path
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000;

//defining the path to launch the site from

app.use(express.static(path.resolve('./client/build')))

//defining the file that will be launched when site is visited

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'))
})

//telling it to listen for this port

app.listen(port, () => {
    console.log('Listening on port: ', port)
})

