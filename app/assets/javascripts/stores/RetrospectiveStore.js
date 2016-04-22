'use strict';

var _ = require('underscore');
var EventManager = require('./../Events/Manager.js');
var Events = require('./../Events/Events.js');
var Reflux = require('reflux');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');

var _retrospectives = null;
var _retrospectiveIndex = null;
var _slugMatches = function(slug) {
    if (_retrospectiveIndex === null || !_retrospectives[_retrospectiveIndex]) {
        return false;
    }

    if (slug !== _retrospectives[_retrospectiveIndex].slug) {
        return false;
    }

    return true;
};

var contributorToFilterBy = null;

var RetrospectiveStore = Reflux.createStore({
    listenables: [RetrospectiveActions],
    init: function() {
        EventManager
            .on(Events.LoadRetrospective, this.clearUserFilter.bind(this))
            .on(Events.NoteUpdated, this.noteRatingUpdated.bind(this))
            .on(Events.NoteAdded, this.noteAdded.bind(this))
            .on(Events.NoteRemoved, this.noteRemoved.bind(this));
    },
    retrospectives: function() {
        return _retrospectives;
    },
    retrospectiveLoaded: function() {
        return _retrospectiveIndex !== null;
    },
    retrospectivesLoaded: function(retrospectives) {
        if (_retrospectives) {
            var slugs = _.pluck(_retrospectives, 'slug');
            retrospectives = _.filter(retrospectives, function (retrospective) {
                return !_.contains(slugs, retrospective.slug);
            });
            _retrospectives = _retrospectives.concat(retrospectives);
        } else {
            _retrospectives = retrospectives;
        }

        this.emitChange();
    },
    retrospective: function() {
        return _retrospectiveIndex === null ? null : _retrospectives[_retrospectiveIndex];
    },
    loadRetrospective: function(slug) {
        _retrospectiveIndex = _.findIndex(_retrospectives, function(retrospective) {
            return slug === retrospective.slug;
        });

        _retrospectiveIndex = _retrospectiveIndex === -1 ? null : _retrospectiveIndex;

        this.emitChange();
    },
    loadRetrospectiveWithData: function(data) {
        _retrospectives = _retrospectives ? _retrospectives : [];
        _retrospectives.unshift(data);
        _retrospectiveIndex = 0;

        this.emitChange();
    },
    unloadRetrospective: function() {
        _retrospectiveIndex = null;
        this.emitChange();
    },
    displayRetrospectiveList: function() {
        _retrospectiveIndex = null;
        this.emitChange();
    },
    noteRatingUpdated: function(rating) {
        if (!_slugMatches(rating.slug)) {
            return;
        }

        var idx = _retrospectiveIndex;
        var noteIndex = _.findIndex(_retrospectives[idx].notes, function (note) {
            return note.identity === rating.identity;
        });

        _retrospectives[idx].notes[noteIndex].noteRating++;
        _retrospectives[idx].notes[noteIndex].noteRatings.push(rating);

        this.emitChange();
    },
    noteAdded: function(note) {
        if (!_slugMatches(note.retrospectiveSlug)) {
            return;
        }

        _retrospectives[_retrospectiveIndex].notes.push(note);

        this.emitChange();
    },
    emitChange: function() {
        this.trigger({});
    },
    noteRemoved: function(noteToRemove) {
        if (!_slugMatches(noteToRemove.slug)) {
            return;
        }

        var noteIndex = _.findIndex(_retrospectives[_retrospectiveIndex].notes, function (note) {
            return note.identity === noteToRemove.identity;
        });

        if (noteIndex > -1) {
            _retrospectives[_retrospectiveIndex].notes.splice(noteIndex, 1);
            this.emitChange();
        }
    },
    clearUserFilter: function () {
        contributorToFilterBy = null;
    },
    filterByContributor: function (user) {
        // We will unset the current selection if you've clicked the same user
        // twice.
        if (user === contributorToFilterBy) {
            user = null;
        }

        contributorToFilterBy = user;

        this.emitChange();
    },
    contributorToFilterBy: function () {
        return contributorToFilterBy;
    }
});

module.exports = RetrospectiveStore;
