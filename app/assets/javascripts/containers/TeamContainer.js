'use strict';

import { connect } from 'react-redux';
import TeamWindow from 'components/team/TeamWindow.jsx';
import store from 'store';

const mapStateToProps = (state) => {
  return {
    teams: state.teams
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectTeam: (teamIdentity) => {
      store.set('teamIdentity', teamIdentity);
      window.location.href = '/retrospective';
    }
  };
};

const TeamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamWindow);

export default TeamContainer;
