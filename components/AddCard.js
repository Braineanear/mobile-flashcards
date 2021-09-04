// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Actions
import { handleAddCard } from '../actions';

// Utils
import { newCard } from '../utils/helpers';
import { black, white } from '../utils/colors';

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20
  },
  inputs: {
    flex: 1,
    justifyContent: 'flex-start'
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

// AddCard Component
class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionInput: '',
      answerInput: ''
    };
  }

  handleQuestion = (questionInput) => {
    this.setState((prevState) => ({
      questionInput
    }));
  };

  handleAnswer = (answerInput) => {
    this.setState((prevState) => ({
      answerInput
    }));
  };

  submit = () => {
    const { id } = this.props;
    const { questionInput, answerInput } = this.state;

    this.props.dispatch(handleAddCard(id, newCard(questionInput, answerInput)));

    this.setState((prevState) => ({
      questionInput: '',
      answerInput: ''
    }));
  };

  checkSubmitButton = () => {
    const { questionInput, answerInput } = this.state;

    return questionInput && answerInput;
  };

  render() {
    const { questionInput, answerInput } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <TextInput
            value={questionInput}
            style={styles.textInput}
            placeholder="Question"
            onChangeText={this.handleQuestion}
          />

          <TextInput
            value={answerInput}
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={this.handleAnswer}
          />
        </View>

        <TouchableOpacity
          onPress={this.submit}
          style={[styles.button, { opacity: 1 }]}
          disabled={!this.checkSubmitButton()}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks, { route }) => {
  const { id } = route.params;

  return {
    id
  };
};

export default connect(mapStateToProps)(AddCard);
