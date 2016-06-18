'use strict';

import React, { Component } from 'react';
import getFormData from 'get-form-data';

const CreateNote = ({retrospectiveId, createNote, designation, user}) => {
  let handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = getFormData(e.target);
    createNote(retrospectiveId, designation, formData.content, user);
    e.target.reset();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="content" />
    </form>
  );
};

export default CreateNote;
