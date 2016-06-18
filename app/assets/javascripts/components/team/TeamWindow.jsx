'use strict';

import React, { Component } from 'react';
import Team from './Team';

const TeamWindow = ({teams, selectTeam}) => (
  <div>
    Here are your teams
    {teams.map((team) => (
      <Team key={`team-${team.identity}`}
        selectTeam={selectTeam}
        team={team} />
    ))}
  </div>
);

export default TeamWindow;
