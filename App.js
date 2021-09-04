// Packages
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Components
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

// Reducers
import reducer from './reducers';

// Utils
import { white } from './utils/colors';

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        labelStyle: {
          fontSize: 20
        },
        style: {
          height: 90
        }
      }}
    >
      <Tab.Screen
        name="Decks"
        component={DeckList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
const App = () => (
  <Provider store={createStore(reducer, applyMiddleware(thunk))}>
    <AppStatusBar backgroundColor={white} barStyle="light-content" />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Deck" component={Deck} />

        <Stack.Screen name="Add Card" component={AddCard} />

        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
