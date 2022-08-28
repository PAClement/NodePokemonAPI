const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
  .use(favicon(__dirname + '/favicon.ico')) //change favicon
  .use(morgan('dev')) //message d'appel de route dans la console
  .use(bodyParser.json()) //Middleware body parser, mis en place sur tous les points de terminaison de l'api en applicant le middleware grâce à 'use'

sequelize.initDb()

//Ici, nous placerons nos futurs points de terminaison.

app.listen(port, () => console.log(`Notre app node est demarée sur : localhost ${port}`))