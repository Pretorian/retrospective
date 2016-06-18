'use strict';

import localStorage from 'store';
import React from 'react';
import retrospectiveApp from './reducers/retrospective';
import RetrospectiveContainer from 'containers/RetrospectiveContainer.jsx';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { initRetrospectiveApp, addNoteToRetrospective } from './actions';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import container from './provider';

let store = createStore(retrospectiveApp, applyMiddleware(thunkMiddleware));

// Render our component
render(
  <Provider store={store}>
    <RetrospectiveContainer />
  </Provider>,
  document.getElementById('retrospective-app')
);

// If no team is chosen, redirect to team page
const teamIdentity = localStorage.get('teamIdentity');
if (!teamIdentity) {
  window.location.href = '/';
}

// Boot up retrospective
store.dispatch(initRetrospectiveApp(
  window.AppData.user,
  teamIdentity,
  window.AppData.retrospectiveSlug
));

// Listen for incoming pusher events
const eventListener = container.get('EventListener');
eventListener
  .on('NoteCreated', (data) => store.dispatch(addNoteToRetrospective(data.note)));

window.state = () => store.getState();
