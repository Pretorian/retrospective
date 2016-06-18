'use strict';

import RetrospectiveWindow from 'components/retrospective/RetrospectiveWindow.jsx';
import { connect } from 'react-redux';
import { createNote, loadRetrospective } from './../actions.js';

const mapStateToProps = (state) => {
  return {
    retrospectives: state.retrospectives,
    user: state.user,
    appReady: state.appReady,
    fetchingData: state.fetchingData,
    retrospectiveId: state.retrospectiveId,
    retrospective: state.retrospectives.find((r) => r.identity === state.retrospectiveId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRetrospective: (id, name) => dispatch(loadRetrospective(id, name)),
    createNote: (retrospectiveId, designation, content, user) => {
      dispatch(createNote(retrospectiveId, designation, content, user));
    }
  };
};

const RetrospectiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetrospectiveWindow);

export default RetrospectiveContainer;
