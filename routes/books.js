'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
const router = express.Router();
const boom = require('boom')


router.get('/books', (req, res, next) => {
    knex('books')
        .orderBy('title', 'asc')
        .then(booksData => {
            res.send(humps.camelizeKeys(booksData));
        });
});

router.get('/books/:id', (req, res, next) => {
    let id = req.params.id;
    if (isNaN(id)) {
        return next(boom.create(404, 'Not Found'));
    }
    knex('books')
        .where('id', id)
        .then(booksData => {
            if (booksData[0]) {
                res.send(humps.camelizeKeys(booksData[0]));
            } else {
                return next(boom.create(404, 'Not Found'));
            }
        });
});


router.post('/books', (req, res, next) => {
    if (!req.body.title) {
        return next(boom.create(400, 'Title must not be blank'));
    }
    if (!req.body.author) {
        return next(boom.create(400, 'Author must not be blank'));
    }
    if (!req.body.genre) {
        return next(boom.create(400, 'Genre must not be blank'));
    }
    if (!req.body.description) {
        return next(boom.create(400, 'Description must not be blank'));
    }
    if (!req.body.coverUrl) {
        return next(boom.create(400, 'Cover URL must not be blank'));
    }
    knex('books')
        .returning('*')
        .insert({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.coverUrl
        })
        .then(booksData => {
            res.send(humps.camelizeKeys(booksData[0]));
        });
});

router.patch('/books/:id', (req, res, next) => {
    let id = req.params.id
    if (isNaN(id)) {
        return next(boom.create(404, 'Not Found'));
    }
    knex('books')
        .where('id', id)
        .then((booksData) => {
            if (booksData[0]) {
                knex('books')
                    .where('id', id)
                    .update(humps.decamelizeKeys(req.body))
                    .returning('*')
                    .then(booksData => {
                        res.send(humps.camelizeKeys(booksData[0]));
                    })
            } else {
                return next(boom.create(404, 'Not Found'));
            }

        });
});



router.delete('/books/:id', (req, res, next) => {
    let id = req.params.id;
    if (isNaN(id)) {
        return next(boom.create(404, 'Not Found'));
    }
    knex('books')
        .where('id', id)
        .returning(['title', 'author', 'genre', 'description', 'cover_url'])
        .del()
        .then(booksData => {
            if (booksData[0]) {
                res.send(humps.camelizeKeys(booksData[0]));
            } else {
                return next(boom.create(404, 'Not Found'));
            }
        });
});

module.exports = router;
