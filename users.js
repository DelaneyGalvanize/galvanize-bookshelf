'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
const bcrypt = require('bcrypt')
const boom = require('boom')
const router = express.Router();

router.post('/', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .then((exists) => {
      if (exists.length > 0) {
        return next(boom.create(400, 'Email already exists'))
      } else {
        knex('users')
          .returning(['id', 'first_name', 'last_name', 'email'])
          .insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            hashed_password: bcrypt.hashSync(req.body.password, 10)
          }).then((userData) => {
            console.log(user[0]);
            res.send(humps.camelizeKeys(userData[0]))
          })
      }
    })
})


module.exports = router;
