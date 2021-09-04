// Actions
import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK:
      let { ...updated } = state;
      return {
        ...updated
      };
    case ADD_CARD:
      const { id } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: [...state[id].questions, action.card]
        }
      };
    default:
      return state;
  }
};

export default decks;
