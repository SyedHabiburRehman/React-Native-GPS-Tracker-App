/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RouterComponent from './src/screens/Router';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import reducers from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyCsm01bilZPtJsSuLXziJlb0tSYCsgWCJE",
      authDomain: "family-gps-tracker-49c38.firebaseapp.com",
      databaseURL: "https://family-gps-tracker-49c38.firebaseio.com",
      projectId: "family-gps-tracker-49c38",
      storageBucket: "family-gps-tracker-49c38.appspot.com",
      messagingSenderId: "276310548112"
    };
    firebase.initializeApp(config);


  };


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
