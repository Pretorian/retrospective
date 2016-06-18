'use strict';

import React, { Component } from 'react';
import RetrospectiveList from './RetrospectiveList';
import Retrospective from './Retrospective';
import Header from './../shared/Header';

const RetrospectiveWindow = ({
  retrospectives,
  fetchingData,
  appReady,
  loadRetrospective,
  retrospective,
  createNote,
  user
}) => (
  <div>
  {appReady ? (
    <div>
      <Header title={retrospective ? retrospective.name : 'My Retrospectives'} />
      <div className="content">
        <RetrospectiveList
          retrospectives={retrospectives}
          loadRetrospective={loadRetrospective}
          retrospective={retrospective} />
        <Retrospective
          user={user}
          createNote={createNote}
          retrospective={retrospective} />
      </div>
    </div>
  ) : (<div>Loading</div>)}
  </div>
);


export default RetrospectiveWindow;
