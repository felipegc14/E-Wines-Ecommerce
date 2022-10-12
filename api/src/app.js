const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const errorHandler = require('./utils/middleware/errorHandler.js')
const setHeaders = require('./utils/middleware/setHeaders.js')

require('./db.js')

const server = express()

server.name = 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use(setHeaders)

server.use('/', routes)

// Error catching endware.
server.use(errorHandler)

module.exports = server
