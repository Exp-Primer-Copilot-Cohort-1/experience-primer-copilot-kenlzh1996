// Create Web Server using Express
// Create a RESTful API for comments
// http://localhost:3000/api/comments

const express = require('express');
const Joi = require('joi');
const router = express.Router();

const comments = [
    { id: 1, name: 'John Doe', comment: 'Comment 1' },
    { id: 2, name: 'Jane Doe', comment: 'Comment 2' },
    { id: 3, name: 'Jill Doe', comment: 'Comment 3' },
    { id: 4, name: 'Jack Doe', comment: 'Comment 4' },
];

// Get All Comments
router.get('/', (req, res) => {
    res.send(comments);
});

// Get Comment by ID
router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    res.send(comment);
});

// Create New Comment
router.post('/', (req, res) => {
    const { error } = validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

// Update Comment by ID
router.put('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }

    const { error } = validateComment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    comment.name = req.body.name;
    comment.comment = req.body.comment;
    res.send(comment);
});

// Delete Comment by ID
router.delete('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
});

