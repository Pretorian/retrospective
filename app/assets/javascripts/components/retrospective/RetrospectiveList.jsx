'use strict';

import React, { Component } from 'react';
import RetrospectiveListItem from './RetrospectiveListItem';

const RetrospectiveList = ({retrospective, retrospectives, loadRetrospective}) => (
  <div>
    {!retrospective ? (
      <div className="retrospective-list">
        {retrospectives.map((retrospective) => (
          <RetrospectiveListItem key={`rli-${retrospective.identity}`}
            retrospective={retrospective}
            loadRetrospective={loadRetrospective} />
        ))}
      </div>
    ) : null}
  </div>
);

export default RetrospectiveList;
