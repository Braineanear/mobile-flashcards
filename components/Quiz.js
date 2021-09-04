// Packages
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Utils
import { green, red, white, black } from '../utils/colors';

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
  questionAnswerText: {
    fontSize: 30,
    textAlign: 'center'
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: black
  },
  flipText: {
    fontSize: 22,
    textAlign: 'center',
    color: red
  },
  button: {
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: black,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 20,
    color: white
  }
});

// Quiz Component
class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      showQuestion: true,
      correct: 0
    };
  }

  flipCard = () => {
    this.setState((prev) => ({
      showQuestion: !this.state.showQuestion
    }));
  };

  lastQuestion = () => this.state.index === this.props.questions.length - 1;

  result = (points) => {
    this.setState((prevState) => ({
      correct: prevState.correct + points,
      index: prevState.index + 1,
      showQuestion: true
    }));
  };

  restart = () => {
    this.setState((prevState) => ({
      index: 0,
      showQuestion: true,
      correct: 0
    }));
  };

  return = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { questions } = this.props;
    const { index, showQuestion } = this.state;

    return index !== questions.length ? (
      <View style={styles.container}>
        <Text style={{ color: 'black', fontSize: 15 }}>
          {`${index + 1}/${questions.length}`}
        </Text>

        <Text style={styles.questionAnswerText}>
          {showQuestion ? questions[index].question : questions[index].answer}
        </Text>

        <TouchableOpacity>
          <Text onPress={this.flipCard} style={styles.flipText}>
            {showQuestion ? 'Answer' : 'Question'}
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => this.result(1)}
            style={[styles.button, { backgroundColor: green }]}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.result(0)}
            style={[styles.button, { backgroundColor: red }]}
          >
            <Text style={styles.buttonText}>Wrong</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.scoreText}>
          Total Correct: {this.state.correct}
        </Text>

        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={this.restart}
            style={[styles.button, { backgroundColor: black }]}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.return}
            style={[styles.button, { backgroundColor: white }]}
          >
            <Text style={[styles.buttonText, { color: black }]}>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks, { route }) => ({
  questions: decks[route.params.id].questions
});

export default connect(mapStateToProps)(Quiz);
