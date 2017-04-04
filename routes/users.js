
'use strict';

const express = require('express');
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const humps = require('humps')
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const humps = require('humps')
const router = express.Router();

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 8)
  .then((hashed_password) => {
    return knex('users')
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      hashed_password: hashed_password
    })
    .returning(['id', 'first_name', 'last_name', 'email']);
  })

  .then(userData => {
    res.send(humps.camelizeKeys(userData[0]));
  })
})

module.exports = router;
