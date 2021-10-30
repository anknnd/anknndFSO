import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showLike, setShowLike] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
        //console.log(persons)
      })
  }

  useEffect(hook, [])

  const personsToShow = showLike === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(showLike.toLowerCase()) > -1)

  const handleShowLikeChange = (event) => setShowLike(event.target.value)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    //simple version. can further use regex to match with case-insensitivity and omit non-alphanumeric characters for a more robust comparison
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName);
        const nameObject = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, nameObject)
          .then(updatedObject => {
            setNotification({ message: `Updated ${updatedObject.name}`, type: 'success' })
            setTimeout(() => {
              setNotification(null)
            }, 5000);
            setPersons(persons.map(p => p.id === existingPerson.id ? updatedObject : p))
            setNewName('');
            setNewNumber('')
          })
          .catch(error => {
            setNotification({ message: `Update failed with error: ${error.response.data.error || error}`, type: 'error' })
            setTimeout(() => {
              setNotification(null)
            }, 10000);
          })
      }
    }
    else {
      const nameObject = { name: newName, number: newNumber }

      personService
        .create(nameObject)
        .then(createdObject => {
          setNotification({ message: `Added ${nameObject.name}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000);
          setPersons(persons.concat(createdObject))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification({ message: `Save failed with error: ${error.response.data.error || error}`, type: 'error' })
          setTimeout(() => {
            setNotification(null)
          }, 10000);
        })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteAction(person.id)
        .then(res => {
          console.log(res);
          setNotification({ message: `Deleted ${person.name}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000);
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setNotification({ message: `${person.name} already deleted.`, type: 'error' })
          setTimeout(() => {
            setNotification(null)
          }, 10000);
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
      <Filter showLike={showLike} handleShowLikeChange={handleShowLikeChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App