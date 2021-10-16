import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Components/Filter'
import Details from './Components/Details'

const App = () => {
    const [showLike, setShowLike] = useState('')
    const [country, setCountry] = useState([])

    const hook = () => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response =>  { 
            const countries = response.data
            //alert('setting country')
            setCountry(countries)
        })
    }
    
    useEffect(hook, [])

    const handleShowLike = (event) => setShowLike(event.target.value)
    const handleShowClick = (country) => setShowLike(country)

    return (
        <>
        <Filter showLike={showLike} handleShowLike={handleShowLike} />
        <Details country={country} showLike={showLike} handleShowClick={handleShowClick} />
        </>
    )
}

export default App