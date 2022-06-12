import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.css'

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

const Deck = () => {
  const [deck, setDeck] = useState(null)
  const [drawn, setDrawn] = useState([])
  const [clicked, setClicked] = useState(false)
  const [remaining, setRemaining] = useState(52)

  /* At mount: load deck from API into state. */
  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get(`${BASE_URL}/new/shuffle/`)
      setDeck(res.data)
    }
    fetchDeck()
  }, [setDeck])

  /* Draw one card on click */
  useEffect(() => {
    /* Draw a card via API, add card to state "drawn" list */
    async function drawCard() {
      const { deck_id } = deck

      try {
        const res = await axios.get(`${BASE_URL}/${deck_id}/draw/`)

        setRemaining(res.data.remaining)
        if (res.data.remaining === 0) {
          throw new Error('no cards remaining!')
        }

        const card = res.data.cards[0]

        setDrawn(d => [
          ...d,
          {
            id: card.code,
            name: card.value + ' of ' + card.suit,
            image: card.image
          }
        ])
      } catch (err) {
        alert(err)
      }
    }

    // only call drawCard() when button is clicked
    if (clicked) {
      drawCard()
    }

    // clean up function to reset setClicked to false
    return () => {
      setClicked(false)
    }
  }, [clicked, deck])

  // shuffle using the same deck_id on mount
  async function shuffled() {
    const { deck_id } = deck
    const res = await axios.get(`${BASE_URL}/${deck_id}/shuffle/`)
    setDeck(res.data)
  }

  // runs when user clicks on button to draw card. Will setClicked to True, which then triggers the useEffect to drawCard
  const toggleDraw = () => {
    setClicked(clicked => !clicked)
  }

  //
  const shuffle = () => {
    shuffled()
    setDrawn([])
    setRemaining(52)
  }

  const cards = drawn.map(c => (
    <Card key={c.id} name={c.name} image={c.image} />
  ))

  return (
    <div className="Deck">
      <button onClick={toggleDraw}>DRAW!</button>
      <button onClick={shuffle}>SHUFFLE</button>
      {remaining === 0 ? null : <span>Remaining: {remaining - 1}</span>}
      <div className="Deck-cardarea">{cards}</div>
    </div>
  )
}

export default Deck
