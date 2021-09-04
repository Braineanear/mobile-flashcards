// Packages
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Actions
import { handleDeleteDeck } from '../actions';

// Utils
import { black, white, red } from '../utils/colors';

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 50,
    marginBottom: 90
  },
  deckContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  button: {
    padding: 10,
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20
  },
  name: {
    fontSize: 25
  },
  numberOfCardsText: {
    fontSize: 20
  }
});

// DeckDetails Component
class DeckDetails extends React.Component {
  componentDidMount = () => {
    const { deck } = this.props;

    this.setTitle(deck.title);
  };

  updateComponent = (nextProps) => !!nextProps.deck;

  setTitle = (title) => {
    const { navigation } = this.props;

    navigation.setOptions({ title });
  };

  addCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('Add Card', { id: deck.title });
  };

  startQuiz = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('Quiz', { id: deck.title });
  };

  deleteDeck = () => {
    const { dispatch, navigation, deck } = this.props;
    dispatch(handleDeleteDeck(deck.title));
    navigation.goBack();
  };

  render() {
    const { deck } = this.props;
    const numberOfQuestions = deck.questions.length;
    const enableStartQuiz = numberOfQuestions > 0;

    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.name}>{deck.title}</Text>
          <Text style={styles.numberOfCardsText}>
            {numberOfQuestions} cards
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: black }]}
          onPress={this.addCard}
        >
          <Text style={[styles.buttonText, { color: white }]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: white,
              borderColor: black,
              borderWidth: 1,
              opacity: enableStartQuiz ? 1 : 0.3
            }
          ]}
          onPress={this.startQuiz}
          disabled={!enableStartQuiz}
        >
          <Text style={[styles.buttonText, { color: black }]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.deleteDeck}>
          <Text style={[styles.buttonText, { color: red }]}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    deck: decks[id]
  };
}

export default connect(mapStateToProps)(DeckDetails);
