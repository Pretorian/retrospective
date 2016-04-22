'use strict';

var _ = require('underscore');
var AbstractComponent = require('./AbstractComponent.js');
var ContributorStore = require('./../stores/ContributorStore.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var Retrospective = AbstractComponent.create({
    changeListeners: [RetrospectiveStore, ContributorStore],
    data: function() {
        var retrospective = RetrospectiveStore.retrospective();

        if (!retrospective) {
            return {
                retrospective: null
            };
        }

        var users = ContributorStore.usersForRetrospective(retrospective.slug) || {};

        // @TODO This needs to be refactored a little to be made more efficient
        // We don't need to reassociate users with all of the notes anytime an
        // update is made to any note. Refactor so that each note is aware
        // of it's responsibilities only, and the retrospective is limited
        // only to adding notes
        retrospective.notes = _.map(retrospective.notes, function(note) {
            if (typeof users[note.userId] !== 'undefined') {
                note.user = users[note.userId];
            }
            note.noteRatings = _.map(note.noteRatings, function(noteRating) {
                if (typeof users[noteRating.userId] !== 'undefined') {
                    noteRating.user = users[noteRating.userId];
                }

                return noteRating;
            });

            return note;
        });

        var notesByDesignation = [[], [], []];
        _.each(retrospective.notes, function (note) {
            notesByDesignation[note.designation].push(note);
        });

        return {
            retrospective: retrospective,
            wentWellNotes: notesByDesignation[0],
            needsImprovementNotes: notesByDesignation[1],
            unwellNotes: notesByDesignation[2],
        };
    },
    render: require('./../templates/retrospective.rt')
});

module.exports = Retrospective;
