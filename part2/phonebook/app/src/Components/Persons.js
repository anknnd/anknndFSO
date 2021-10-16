import React from 'react'
import Person from './Person'

const Persons = ({personsToShow, handleDelete}) => {
    const renderPersons = () => personsToShow.map(person => <Person key={person.name} person={person} handleDelete={handleDelete} />)

    return (<>{renderPersons()}</>)
}

export default Persons
