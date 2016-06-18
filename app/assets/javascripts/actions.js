'use strict';

import { setPageUrl, slugify } from './utils/main';
import provider from './provider';
import request from './utils/request';

const retrospectiveService = provider.get('RetrospectiveService');


export const FETCH_REQUESTED = 'FETCH_REQUESTED';
export function fetchRequested() {
  return {
    type: FETCH_REQUESTED
  };
}

export const FETCH_COMPLETE = 'FETCH_COMPLETE';
export function fetchComplete() {
  return {
    type: FETCH_COMPLETE
  };
}

export const INIT_TEAM_APP = 'INIT_TEAM_APP';
export function initTeamApp(teams) {
  return {
    type: INIT_TEAM_APP,
    teams
  };
}

export const RETROSPECTIVE_LOADED = 'RETROSPECTIVE_LOADED';
export function retrospectiveLoaded(retrospectives, user, teamIdentity, slug) {
  return {
    type: RETROSPECTIVE_LOADED,
    retrospectives,
    user,
    teamIdentity,
    slug
  };
}

export const TEAM_LOADED = 'TEAM_LOADED';
export function teamLoaded(team) {
  return {
    type: TEAM_LOADED,
    team
  };
}

export function loadTeam(teamIdentity) {
  return (dispatch) => {
    request.post('/team/users', {teamIdentity})
      .then((response) => dispatch(teamLoaded(data.team)));
  };
}

export function initRetrospectiveApp(user, teamIdentity, slug) {
  return (dispatch) => {
    dispatch(loadTeam(teamIdentity));
    dispatch(fetchRequested());
    request.post('/retrospective/list', {teamIdentity})
      .then((response) => {
        dispatch(fetchComplete());
        dispatch(retrospectiveLoaded(response.data, user, teamIdentity, slug));
      });
  };
}

export const LOAD_RETROSPECTIVE = 'LOAD_RETROSPECTIVE';
export function loadRetrospective(retrospectiveId, name) {
  setPageUrl('/retrospective/' + slugify(name));

  return {
    type: LOAD_RETROSPECTIVE,
    retrospectiveId
  };
}

export const ADD_NOTE_TO_RETROSPECTIVE = 'ADD_NOTE_TO_RETROSPECTIVE';
export function addNoteToRetrospective(note) {
  return {
    type: ADD_NOTE_TO_RETROSPECTIVE,
    note
  };
}


// @TODO YOU WERE WORKING HERE
export function createNote(retrospectiveId, designation, content, user) {
  const createdAt = new Date().getTime();
  const { note, noteSaved } = retrospectiveService.createNote(
    retrospectiveId,
    designation,
    content,
    user,
    createdAt
  );

  return (dispatch) => {
    // Dispatch our note to our local UI
    dispatch(addNoteToRetrospective(note));

    // noteSaved
    //  .then(() => dispatch(confirmNotePersistence(note)));
    //  .fail(() => dispatch(uhoh()))
  };
}
