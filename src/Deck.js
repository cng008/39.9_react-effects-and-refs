import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

const Deck = () => {
  const [deck, setDeck] = useState(null)
  const [drawn, setDrawn] = useState([])
  const [clicked, setClicked] = useState(false)

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

        if (res.data.remaining === 0) {
          // setClicked(false)
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

    if (clicked) {
      drawCard()
    }

    // clean up function to reset setClicked to false
    return () => {
      setClicked(false)
    }
  }, [clicked, deck])

  // runs when user clicks on button to draw card. Will setClicked to True, which then triggers the useEffect to drawCard
  const toggleDraw = () => {
    setClicked(clicked => !clicked)
  }

  //   const reset = () => {
  //     setDeck(null)
  //     setDrawn([])
  //     setClicked(false)
  //   }

  const cards = drawn.map(c => (
    <Card key={c.id} name={c.name} image={c.image} />
  ))

  return (
    <div>
      <button onClick={toggleDraw}>DRAW!</button>
      {/* <button onClick={reset}>RESTART</button> */}
      <div>{cards}</div>
    </div>
  )
}

export default Deck
