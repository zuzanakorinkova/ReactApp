import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './navigation/Router';
import UserReducer from './store/reducers/UserReducers';
import ClubReducer from './store/reducers/ClubReducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  user: UserReducer,
  club: ClubReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = (props: any) => {


  return (
    <Provider store={store}>
      <StatusBar />
      <Router />
    </Provider>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;