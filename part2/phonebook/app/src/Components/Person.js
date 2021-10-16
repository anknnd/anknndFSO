import React from 'react'

const Person = ({person, handleDelete}) => 
    <div>
        {person.name} {person.number}
        <button type="button" onClick={() => handleDelete(person)}>delete</button>
    </div>

export default Person