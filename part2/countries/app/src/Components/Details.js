import React from 'react'
import Country from './Country'

const Details = ({country, showLike, handleShowClick}) => {
    const matchingCountries = country.filter(e => e.name.toLowerCase().indexOf(showLike.toLowerCase()) > -1)
    //console.log('renderDetails')

    if(showLike === ''){
        return (<></>)
    }
    else if(matchingCountries.length > 10){
        return (<div><p>Too many matches, specify another filter</p></div>)
    }
    else if(matchingCountries.length < 10){
        if(matchingCountries.length === 1){
            const countryInfo = matchingCountries[0]
            return (<><Country countryInfo={countryInfo} /></>)
        }
        const rows = matchingCountries.map(e => <li key={e.name}>{e.name} <button type='button' onClick={() => handleShowClick(e.name)}>Show</button></li>)

        return(<div><ul>{rows}</ul></div>)
    }
}

export default Details