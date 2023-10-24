const express = require('express');
const app = express();
const port = process.env.port || 8081;
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV||'development']);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Application up and running.')
})

app.get('/pets', (req, res) => {
  knex('pet')
    .select('*')
    .then(pets => {
      let petNames = pets.map(pet => pet.name)
      res.json(petNames)
    })
})

app.listen(port, () => {
  console.log(`Your knex and express application are running successfully on port: ${port}`)
})