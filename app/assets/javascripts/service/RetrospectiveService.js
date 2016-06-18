'use strict';

import Note from 'model/Note/Note';

class RetrospectiveService
{
  constructor(eventEmitter, request, routes)
  {
    this.eventEmitter = eventEmitter;
    this.request = request;
    this.routes = routes;
  }

  createNote(retrospectiveId, designation, content, user, createdAt)
  {
    const note = new Note(
      retrospectiveId,
      designation,
      content,
      user,
      createdAt
    );

    this.eventEmitter.emitEventsFor(note);
    this.request.post(this.routes.saveNote, note.provideNoteInterest());

    return {
      note: note.provideNoteInterest(),
      noteSaved: () => console.log('do stuff')
    };
  }
}

export default RetrospectiveService;
