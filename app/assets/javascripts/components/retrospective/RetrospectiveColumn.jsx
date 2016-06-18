'use strict';

import React, { Component } from 'react';
import CreateNote from './CreateNote';
import Note from './Note';

const RetrospectiveColumn = ({retrospective, designation, title, createNote, user}) => {
  const notes = retrospective.notes.filter((note) => {
    return parseInt(note.designation, 10) === parseInt(designation, 10);
  });

  return (
    <div className="col">
      <h3 className="text-center">{title}</h3>
      {notes.map((note) => (<Note key={'note-' + note.identity} note={note} />))}
      <CreateNote
        user={user}
        retrospectiveId={retrospective.identity}
        designation={designation}
        createNote={createNote} />
    </div>
  );
}

export default RetrospectiveColumn;
