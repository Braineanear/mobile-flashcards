// Packages
import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppLoading from 'expo-app-loading';

// Actions
import { handleReceiveDecks } from '../actions';

// StyleSheet
const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  name: {
    fontSize: 25
  },
  numberOfCardsText: {
    fontSize: 20
  }
});

// DeckList Component
class DeckList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    };
  }

  componentDidMount = async () => {
    this.props.dispatch(handleReceiveDecks());

    this.setState((prevState) => ({
      ready: true
    }));
  };

  deckClick = (item) => {
    this.props.navigation.navigate('Deck', { id: item.title });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.deckClick(item)}>
      <View style={styles.deckContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.numberOfCardsText}>
          {item.questions.length} cards
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View>
        <FlatList
          data={this.props.items}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}

const mapStateToProps = (decks) => ({
  items: Object.values(decks)
});

export default connect(mapStateToProps)(DeckList);
