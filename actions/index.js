// Utils
import { getDecks, saveDeck, removeDeck, addCard } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';

const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
});

export const handleReceiveDecks = () => async (dispatch) => {
  const decks = await getDecks();
  dispatch(receiveDecks(decks));
};

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const handleAddDeck = (deck) => async (dispatch) => {
  dispatch(addDeck(deck));
  saveDeck(Object.values(deck)[0].title);
};

const deleteDeck = (id) => ({
  type: DELETE_DECK,
  id
});

export const handleDeleteDeck = (id) => async (dispatch) => {
  dispatch(deleteDeck(id));
  removeDeck(id);
};

const addNewCard = (id, card) => ({
  type: ADD_CARD,
  id,
  card
});

export const handleAddCard = (id, card) => async (dispatch) => {
  dispatch(addNewCard(id, card));
  addCard(id, card);
};
