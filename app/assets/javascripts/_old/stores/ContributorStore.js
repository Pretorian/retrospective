'use strict';

var _  = require('underscore');
var ContributorActions = require('./../actions/ContributorActions.js');
var EventManager = require('./../Events/Manager.js');
var Events = require('./../Events/Events.js');
var Reflux = require('reflux');

var _contributors = {};
var _retrospectiveUsersLoaded = {};

var ContributorStore = Reflux.createStore({
    listenables: [ContributorActions],
    init: function() {
        EventManager.on(Events.TypingStateChanged, this.contributorIsTyping.bind(this));
    },
    contributor: function(identity) {
        var contributerData = { isTyping: false };

        if (typeof _contributors[identity] !== 'undefined') {
            contributerData.isTyping = _contributors[identity].isTyping;
        }

        return contributerData;
    },
    contributorsLoaded: function(users, slug) {
        _retrospectiveUsersLoaded[slug] = true;
        _contributors = _.extend(_contributors, users);

        this.emitChange();
    },
    usersForRetrospective: function(slug) {
        if (typeof _retrospectiveUsersLoaded[slug] === 'undefined') {
            return null;
        }

        return _contributors;
    },
    contributorIsTyping: function(data) {
        _contributors[data.user.identity] = data.user;
        _contributors[data.user.identity].isTyping = data.isTyping;
        this.emitChange();
    },
    emitChange: function() {
        this.trigger({});
    }
});

module.exports = ContributorStore;
