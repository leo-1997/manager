import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBVsIOsaZFWPBIzhIa7M28Z2-sfR7qK15M',
      authDomain: 'manager-214ca.firebaseapp.com',
      databaseURL: 'https://manager-214ca.firebaseio.com',
      projectId: 'manager-214ca',
      storageBucket: 'manager-214ca.appspot.com',
      messagingSenderId: '349611218112',
      appId: '1:349611218112:web:7d9ccc358983bdf5a40925',
      measurementId: 'G-Z0B4ZD9GJK',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
