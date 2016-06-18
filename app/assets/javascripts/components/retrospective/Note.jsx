'use strict';

import React, { Component } from 'react';

const Note = ({note}) => (
  <div className="card">
    <div className="card-content">
      {note.content}
    </div>
  </div>
);

export default Note;
