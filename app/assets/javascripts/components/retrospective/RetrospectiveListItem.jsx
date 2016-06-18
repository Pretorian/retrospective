'use strict';

import React, { Component } from 'react';

class RetrospectiveListItem extends Component {
  constructor()
  {
    super();
    this.handleLoadRetrospective = this.handleLoadRetrospective.bind(this);
  }

  handleLoadRetrospective(e)
  {
    e.preventDefault();
    const { retrospective, loadRetrospective } = this.props;
    loadRetrospective(retrospective.identity, retrospective.name);
  }

  render()
  {
    const { retrospective } = this.props;

    return (
      <div className="retrospective-list-item" onClick={this.handleLoadRetrospective}>
        <div>
          {retrospective.name}
        </div>
      </div>
    );
  }
}

export default RetrospectiveListItem;
