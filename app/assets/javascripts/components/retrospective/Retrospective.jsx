'use strict';

import React, { Component } from 'react';
import RetrospectiveColumn from './RetrospectiveColumn';

const Retrospective = ({retrospective, createNote, user}) => (
  <div>
  {retrospective ? (
    <div>
      <div className="cols">
        <RetrospectiveColumn
          user={user}
          retrospective={retrospective}
          title="went well"
          designation="0" key="rc-0"
          createNote={createNote} />
        <RetrospectiveColumn
          user={user}
          retrospective={retrospective}
          title="needs improvement"
          designation="1" key="rc-1"
          createNote={createNote} />
        <RetrospectiveColumn
          user={user}
          retrospective={retrospective}
          title="did not go well"
          designation="2" key="rc-2"
          createNote={createNote} />
      </div>
    </div>
  ) : (<div></div>)}
  </div>
);

export default Retrospective;
