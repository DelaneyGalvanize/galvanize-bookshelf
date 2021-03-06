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
    res.status(200).send(false)
  } else {
    res.status(200).send(true)
  }
})

router.post('/', (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
  knex('users')
    .where('email', email)
    .then((userData) => {
      if (data.length > 0) {
        bcrypt.compare(password, userData[0].hashed_password, (err, result) => {
          if (result) {
            let token = jwt.sign({ email: userData[0].email, password: userData[0].hashed_password}, "shhh");
            res.cookie('token', token, { httpOnly:true })
            delete userData[0].hashed_password
            res.send(humps.camelizeKeys(userData[0]))
          } else {
            next(boom.create(400, 'Bad email or password'))
          }
        })
      } else {
        next(boom.create(400, 'Bad email or password'))
      }
    })
})

router.delete('/', (req, res, session) => {
  res.clearCookie('token')
  res.send(true)
})


module.exports = router;
