# React Effects and Refs Exercise

## Deck of Cards

### Part 1: Click to Draw

Build an app that displays a deck of cards, one card at a time. When the page loads, go to the [Deck of Cards API](http://deckofcardsapi.com/) to create a new deck, and show a button on the page that will let you draw a card.

Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

The goal here is to focus on React and not CSS so please get the core functionality working and then get a code review. Do not focus on CSS at all for now.

Here’s how this might look (with styling added):

[<img src="_images/cards.png" width="700"/>](_images/cards.png)

### Part 2: Click to Keep Drawing

Change the behavior of the app, so that when you click on the button, rather than drawing a single card, the page will draw one card every second.

These draws will continue until you press the button again, or until the deck has been exhausted (at which point the alert message from Part 1 should appear). Make sure to change the button text appropriately as well (for example, it could toggle between “Start drawing” and “Stop drawing.”

### Further Study

- Style your app so that it looks nice.
- Add the ability to shuffle the deck, so that you can start drawing from a full deck without refreshing the page.
