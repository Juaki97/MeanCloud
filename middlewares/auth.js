'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(500).send({message: 'No tienes autorización'})
  } else {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token, config.SECRET_TOKEN)

    if (payload.exp <= moment().unix()) {
      res.status(401).send({message: 'El token ha expirado'})
    } else {
      req.user = payload.sub
      next()
    }
  }
}

module.exports = isAuth