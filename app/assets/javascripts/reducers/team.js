'use strict';

import { INIT_TEAM_APP } from './../actions';
import { initialState } from './state';

export function teamApp(state = initialState, action) {
  switch (action.type) {
    case INIT_TEAM_APP:
      return Object.assign({}, state, {
        teams: action.teams
      });
    default:
        return state;
  }
}

export default teamApp;
