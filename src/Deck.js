import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.css'

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

const Deck = () => {
  const [deck, setDeck] = useState(null)
  const [drawn, setDrawn] = useState([])
  const [remaining, setRemaining] = useState(52)
  const [autoDraw, setAutoDraw] = useState(false)
  const timerRef = useRef(null)

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
          setAutoDraw(false)
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

    // drawCard() every second until deck is empty
    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await drawCard()
      }, 500)
    }

    // clean up function to reset timer
    return () => {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [autoDraw, setAutoDraw, deck])

  // shuffle using the same deck_id on mount
  async function shuffled() {
    const { deck_id } = deck
    const res = await axios.get(`${BASE_URL}/${deck_id}/shuffle/`)
    setDeck(res.data)
  }

  // runs when user clicks on button to draw card. Will setClicked to True, which then triggers the useEffect to drawCard
  const toggleDraw = () => {
    setAutoDraw(auto => !auto)
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
      {remaining === 0 ? null : (
        <button onClick={toggleDraw}>
          {autoDraw ? 'STOP' : 'KEEP'} DRAWING FOR ME!
        </button>
      )}
      <button onClick={shuffle}>SHUFFLE</button>
      {remaining === 0 ? null : <span>Remaining: {remaining - 1}</span>}
      <div className="Deck-cardarea">{cards}</div>
    </div>
  )
}

export default Deck
