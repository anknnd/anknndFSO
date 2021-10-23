const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons =
  [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]

const MAX_ID = 9999999999
function generateId() {
    return Math.floor(Math.random() * MAX_ID);
}

app.get('/', (req, res) => res.status(404).end());

app.get('/info', (req, res) => res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`));

app.get('/api/persons', (req, res) => res.json(persons));

app.post('/api/persons', (req, res) => {
  const person = req.body

  if(!person.name){
    res.statusMessage = 'name must be defined'
    return res.status(400).json({ error: res.statusMessage });
  }

  if(!person.number){
    res.statusMessage = 'number must be defined'
    return res.status(400).json({ error: res.statusMessage });
  }

  if(persons.some(p => p.name === person.name)){
    res.statusMessage = 'name must be unique'
    return res.status(400).json({ error: res.statusMessage });
  }
  
  person.id = generateId();
  persons = persons.concat(person);

  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id);

  if(person){
    res.json(person);
  }
  else{
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});