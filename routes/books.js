
'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
const knex = require('../knex')
const humps = require('humps')
const router = express.Router();


router.get('/books', (req, res, next) => {
  knex('books')
  .orderBy('title', 'asc')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData));
  });
});

router.get('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
  .where('id', id)
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

router.post('/books', (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }, '*')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

router.patch('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
  .where('id', id)
  .update(humps.decamelizeKeys(req.body))
  .returning('*')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});


router.get('/books', (req, res, next) => {
  knex('books')
  .orderBy('title', 'asc')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData));
  });
});

router.get('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
  .where('id', id)
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

router.post('/books', (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }, '*')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

router.patch('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
  .where('id', id)
  .update(humps.decamelizeKeys(req.body))
  .returning('*')
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

router.delete('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('books')
  .where('id', id)
  .returning(['title', 'author', 'genre', 'description', 'cover_url'])
  .del()
  .then(booksData => {
    res.send(humps.camelizeKeys(booksData[0]));
  });
});

module.exports = router;
