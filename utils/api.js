// Packages
import { AsyncStorage } from 'react-native';

// Utils
import { newDeck } from './helpers';

export const DECKS_STORAGE = 'MobileFlashcards:decks';

const data = {
  React: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is JavaScript?',
        answer:
          'JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive'
      },
      {
        question: 'What is Closure?',
        answer:
          'A closure is the combination of a function bundled together with references to its surrounding state'
      }
    ]
  },
  JavaScript: {
    title: 'Math',
    questions: [
      {
        question: 'What is the result of 5 * 5?',
        answer: '25'
      },
      {
        question: 'What is the result of 100 + 100?',
        answer: '200'
      }
    ]
  }
};

const dummyData = () => {
  AsyncStorage.setItem(DECKS_STORAGE, JSON.stringify(data));
  return data;
};

export const getDecks = async () => {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE);
  if (decks === null) {
    return dummyData();
  }
  return JSON.parse(decks);
};

export const getDeck = async (id) => {
  const decks = await getDecks();
  return decks[id];
};

export const removeDeck = async (id) => {
  const decks = await getDecks();

  decks[id] = undefined;

  AsyncStorage.setItem(DECKS_STORAGE, JSON.stringify(decks));
};

export const saveDeck = async (title) => {
  const deck = newDeck(title);
  return await AsyncStorage.mergeItem(DECKS_STORAGE, JSON.stringify(deck));
};

export const addCard = async (title, card) => {
  const deck = await getDeck(title);

  deck.questions.push(card);

  return await AsyncStorage.mergeItem(
    DECKS_STORAGE,
    JSON.stringify({
      [title]: deck
    })
  );
};
