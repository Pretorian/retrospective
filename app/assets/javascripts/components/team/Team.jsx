'use strict';

import React, { Component } from 'react';

const Team = ({team, selectTeam}) => (
  <a onClick={(e) => {e.preventDefault(); selectTeam(team.identity)}}>
    {team.name}
  </a>
);

export default Team;
