'use strict';

/* global AppData */

var AbstractComponent = require('./AbstractComponent.js');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var _allLoaded = false;

var RetrospectivesList = AbstractComponent.create({
    changeListeners: [RetrospectiveStore],
    data: function() {
        var retrospectives = RetrospectiveStore.retrospectives();

        return {
            retrospectives: retrospectives,
            retrospectiveLoaded: RetrospectiveStore.retrospectiveLoaded(),
            appReady: retrospectives !== null,
            allLoaded: _allLoaded,
            user: AppData.user,
        };
    },
    loadAllRetrospectives: function() {
        _allLoaded = true;
        RetrospectiveActions.loadRetrospectives(99999, true);
    },
    componentDidUpdate: function() {
        var retrospectiveNameField = document.getElementById('retrospective-name-field');
        if (retrospectiveNameField) {
            retrospectiveNameField.focus();
        }
    },
    render: require('./../templates/retrospective-list.rt')
});

module.exports = RetrospectivesList;
