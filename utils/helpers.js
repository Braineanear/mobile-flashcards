export const newDeck = (name) => ({
  [name]: {
    title: name,
    questions: []
  }
});

export const newCard = (question, answer) => ({
  question: question,
  answer: answer
});
