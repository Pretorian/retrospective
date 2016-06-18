'use strict';

import {
  ADD_NOTE_TO_RETROSPECTIVE,
  FETCH_REQUESTED,
  FETCH_COMPLETE,
  LOAD_RETROSPECTIVE,
  RETROSPECTIVE_LOADED
} from './../actions.js';

import { initialState } from './state';

function note(state, action) {
  switch(action.type) {
    case ADD_NOTE_TO_RETROSPECTIVE:
      return Object.assign({}, action.note, {
        saved: false
      });
    default:
      return state;
  }
}

function retrospective(state, action) {
  switch(action.type) {
    case ADD_NOTE_TO_RETROSPECTIVE:
      if (state.identity !== action.note.retrospectiveId) {
        return state;
      }

      // Here we are adding a note. This may make it so that
      // we need to reach out even further to another method to get the state
      // for the note...not quite sure yet. The thing to be aware of here
      // is that we need to trigger an event emission and save a thing
      return Object.assign({}, state, {
        notes: state.notes.slice().concat(note(undefined, action))
      });
    default:
      return state;
  }
}

export function retrospectiveApp(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE_TO_RETROSPECTIVE:
      return Object.assign({}, state, {
        retrospectives: state.retrospectives.map((r) => retrospective(r, action))
      });
    case LOAD_RETROSPECTIVE:
      return Object.assign({}, state, {
        retrospectiveId: action.retrospectiveId
      });
    case FETCH_REQUESTED:
      return Object.assign({}, state, {
        fetchingData: true
      });
    case FETCH_COMPLETE:
      return Object.assign({}, state, {
        fetchingData: false
      });
    case RETROSPECTIVE_LOADED:
      return Object.assign({}, state, {
        retrospectives: action.retrospectives,
        user: action.user,
        teamIdentity: action.teamIdentity,
        appReady: true
      });
    default:
        return state;
  }
}

export default retrospectiveApp;
