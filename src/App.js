import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './utils/firebase';
import { auth } from './utils/firebase';
import UserContext from './context/userContext';
import Router from './Router';

function App() {
  let [state, changeState] = useState({
    userDataPresent: false,
    user: null,
    listener: null
  })

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state, listener: auth.onAuthStateChanged((user) => {
          if (user) {
            changeState(oldState => ({ ...oldState, userDataPresent: true, user: user }));
          } else {
            changeState(oldState => ({ ...oldState, userDataPresent: true, user: null }));
          }
        })
      });
    }
    return () => {
      if (state.listener)
        state.listener()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <UserContext.Provider value={state}>
        <div className="App">
          <Router />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
