'use strict';

import uuid from 'node-uuid';
import Emittable from 'infrastructure/Emittable';
import NoteCreated from './NoteCreated';

class Note extends Emittable
{
  constructor(
    retrospectiveId,
    designation,
    content,
    user,
    createdAt
  ) {
    super();

    this.retrospectiveId = retrospectiveId;
    this.designation = designation;
    this.content = content;
    this.user = user;
    this.createdAt = createdAt || new Date().getTime();
    this.identity = uuid.v4();

    this.publish(new NoteCreated(this));
  }

  provideNoteInterest()
  {
    return {
      content: this.content,
      createdAt: this.createdAt,
      designation: this.designation,
      identity: this.identity,
      noteRatings: [],
      retrospectiveId: this.retrospectiveId,
      saved: false,
      user: this.user,
      userIdentity: this.user.identity
    };
  }
}

export default Note;
