'use strict';

import EmittableEvent from 'infrastructure/EmittableEvent';

class NoteCreated extends EmittableEvent
{
  constructor(note)
  {
    super();

    this.note = note;
  }

  toArray()
  {
    return {
      note: this.note.provideNoteInterest()
    };
  }
}

export default NoteCreated;
