import React, { useState } from 'react'

/** Single card: just renders the card as received from deck. */

const Card = ({ name, image }) => {
  return <img className="Card" alt={name} src={image} />
}

export default Card
