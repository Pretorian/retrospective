'use strict';

var AbstractComponent = require('./AbstractComponent.js');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var Header = AbstractComponent.create({
    changeListeners: [RetrospectiveStore],
    data: function() {
        var retrospective = RetrospectiveStore.retrospective();

        return {
            popupActivated: false,
            retrospective: retrospective
        };
    },
    toggleMenu: function() {
        this.setState({popupActivated: !this.state.popupActivated});
    },
    goHome: function() {
        this.setState({popupActivated: false});
        RetrospectiveActions.displayRetrospectiveList();
    },
    render: require('./../templates/header.rt')
});

module.exports = Header;
