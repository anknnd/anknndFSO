import React from 'react'

const Filter = ({showLike, handleShowLike}) => 
    <div> 
        find countries <input type='text' value={showLike} onChange={handleShowLike} />
    </div>

export default Filter