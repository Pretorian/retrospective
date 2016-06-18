'use strict';

import TeamContainer from 'containers/TeamContainer';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import teamApp from './reducers/team';
import { initTeamApp } from './actions';

let store = createStore(teamApp);

// Render our component
render(
  <Provider store={store}>
    <TeamContainer />
  </Provider>,
  document.getElementById('teams-app')
);

store.dispatch(initTeamApp(window.AppData.teams));
