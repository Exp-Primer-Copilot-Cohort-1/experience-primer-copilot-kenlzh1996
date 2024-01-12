// Create web server
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

// Create event handler for comments
const handleEvent = async (type, data) => {
    if (type === 'CommentCreated') {
        // destructure data
        const { id, content, postId, status } = data

        // Add comment to comments object
        comments[postId].push({ id, content, status })

        // Emit event to event bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }

    if (type === 'CommentUpdated') {
        // destructure data
        const { id, content, postId, status } = data

        // Find comment to update
        const comment = comments[postId].find(comment => {
            return comment.id === id
        })

        // Update comment
        comment.status = status
        comment.content = content

        // Emit event to event bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }
}

// Create comments object
const comments = {}

// Create route handler for /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
    // Get comments for specific post
    res.send(comments[req.params.id] || [])
})

// Create route handler for /posts/:id/comments
app.post('/events', async (req, res) => {
    // Get event type and data from request body
    const { type, data } = req.body

    // Handle event
    await handleEvent(type, data)

    // Send response
    res.send({})
})
