require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => {
  Person.find({}).then(persons => { res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`) })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => { res.json(persons) })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    res.statusMessage = 'name must be defined'
    return res.status(400).json({ error: res.statusMessage })
  }

  if (!body.number) {
    res.statusMessage = 'number must be defined'
    return res.status(400).json({ error: res.statusMessage })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => { res.json(savedPerson) })
    .catch(error => { next(error) })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => { next(error) })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})