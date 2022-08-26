const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper')
let pokemons = require('./mock-pokemon')
const { json } = require('body-parser')

const app = express()
const port = 3000

app
  .use(favicon(__dirname + '/favicon.ico')) //change favicon
  .use(morgan('dev')) //message d'appel de route dans la console
  .use(bodyParser.json()) //Middleware body parser, mis en place sur tous les points de terminaison de l'api en applicant le middleware grâce à 'use'

app.get('/', (req, res) => res.send('Hello again, Express !'))
app.get('/api/pokemons/:id', (req, res) => {

  const pokeID = parseInt(req.params.id);
  const pokemon = pokemons.find(pokemon => pokemon.id === pokeID)
  const message = "Un pokémon à bien été trouvé!"
  res.json(success(message, pokemon))

})

app.get('/api/pokemons', (req, res) => {

  res.json(success(`${pokemons.length} pokemons ont été trouvés`, pokemons));
})

app.post('/api/pokemons', (req, res) => {

  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{ id, created: new Date() } }
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} à bien été crée.`
  res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {

  const id = parseInt(req.params.id)
  const pokemonUpdated = { ...req.body, id }
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokemon ${pokemonUpdated.name} à bien été modifié.`
  res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {

  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre app node est demarée sur : localhost ${port}`))