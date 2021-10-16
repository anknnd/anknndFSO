import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  else if (type === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

export default Notification