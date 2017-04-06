'use strict';

const express = require('express')
const boom = require('boom')
const humps = require('humps')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      //need users id from favorites table here
      .join('books', 'books.id', 'favorites.book_id')
      .then((userData) => {
        res.send(humps.camelizeKeys(userData))
      })
  }
})

router.get('/check', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .where('book_id', req.query.bookId)
      .then((userData) => {
        if (userData.length > 0) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)
        }
      })
  }
})

router.post('/', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .returning(['id', 'book_id', 'user_id'])
      .insert({
        book_id: req.body.bookId,
        user_id: 1
      }).then((userData) => {
        res.send(humps.camelizeKeys(userData[0]))
      })
  }
})

router.delete('/', (req, res, next) => {
  if (!req.cookies.token) {
    next(boom.create(401, 'Unauthorized'))
  } else {
    knex('favorites')
      .returning(['book_id', 'user_id'])
      .where('book_id', req.body.bookId)
      .del()
      .then((userData) => {
        res.send(humps.camelizeKeys(userData[0]))
      })
  }
})

module.exports = router;
