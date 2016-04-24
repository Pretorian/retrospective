'use strict';

var _ = require('underscore');
var ajax = require('./../ajax.js');
var EventManager = require('./../Events/Manager.js');
var Events = require('./../Events/Events.js');
var Reflux = require('reflux');

var ContributorActions = Reflux.createActions([
    'contributorsLoaded',
    'loadContributors',
    'updateTypingStatus'
]);

ContributorActions.updateTypingStatus.listen(function(userData) {
    EventManager.emit(Events.TypingStateChanged, userData);
});

ContributorActions.loadContributors.listen(function(slug) {
    ajax.post('/retrospective/loadusers.json', {slug: slug}, function(userData) {
        var users = {};
        _.each(userData, function (user) {
            users[user.identity] = user;
        });

        ContributorActions.contributorsLoaded(users, slug);
    });
});

module.exports = ContributorActions;
