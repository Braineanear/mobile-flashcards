// Packages
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';

// Actions
import { handleAddDeck } from '../actions';

// Utils
import { newDeck } from '../utils/helpers';
import { black, white } from '../utils/colors';

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
  deckName: {
    fontSize: 25,
    textAlign: 'center'
  },
  textInput: {
    borderWidth: 1,
    margin: 20,
    padding: 8,
    fontSize: 20
  },
  button: {
    backgroundColor: black,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: white
  }
});

// AddDeck Component
class AddDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: ''
    };
  }

  nameChange = (titleInput) => {
    this.setState((prevState) => ({
      titleInput
    }));
  };

  createDeck = () => {
    const id = this.state.titleInput;

    this.props.dispatch(handleAddDeck(newDeck(id)));
    this.setState((prevState) => ({
      titleInput: ''
    }));

    this.props.navigation.navigate('Deck', { id });
  };

  checkbuttonEnable = () =>
    this.state.titleInput && !this.props.titles.includes(this.state.titleInput);

  render() {
    const { titleInput } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.deckName}>Please enter deck name!</Text>
        <TextInput
          value={titleInput}
          style={styles.textInput}
          placeholder="Deck Name"
          onChangeText={this.nameChange}
        />
        <TouchableOpacity
          onPress={this.createDeck}
          style={[styles.button, { opacity: 1 }]}
          disabled={!this.checkbuttonEnable()}
        >
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({
  titles: Object.values(decks).map((deck) => deck.title)
});

export default connect(mapStateToProps)(AddDeck);
