'use strict';

/* global AppData */

var ajax = require('./../ajax.js');
var ContributorActions = require('./ContributorActions.js');
var EventManager = require('./../Events/Manager.js');
var Events = require('./../Events/Events.js');
var Reflux = require('reflux');

var _changeUrl = function(path) {
    // Jump to the top of the page on page state change
    document.getElementById('retro-app').scrollTop = 0;
    history.pushState({path: path}, path, path);
};

var RetrospectiveActions = Reflux.createActions([
    'addNote',
    'createRetrospective',
    'displayRetrospectiveList',
    'loadRetrospective',
    'loadRetrospectives',
    'loadRetrospectiveWithData',
    'noteAdded',
    'removeNote',
    'retrospectivesLoaded',
    'unloadRetrospective',
    'updateNoteRating'
]);

RetrospectiveActions.loadRetrospectives.listen(function(count, replace) {
    // If we don't have a user, no use loading the retrospectives
    if (!window.AppData.user) {
        return;
    }

    ajax.post('/retrospective/list.json', {count: count}, function(retrospectives) {
        RetrospectiveActions.retrospectivesLoaded(retrospectives, replace);
    });
});

RetrospectiveActions.displayRetrospectiveList.listen(function() {
    _changeUrl('/');
});

RetrospectiveActions.removeNote.listen(function (noteData) {
    EventManager.emit(Events.NoteRemoved, noteData);
    ajax.post('/retrospective/removenote.json', noteData);
});

RetrospectiveActions.updateNoteRating.listen(function (noteData) {
    EventManager.emit(Events.NoteUpdated, noteData);
    ajax.post('/retrospective/incrementnotecount.json', noteData);
});

RetrospectiveActions.loadRetrospective.listen(function (slug) {
    EventManager.emit(Events.LoadRetrospective, slug);
    _changeUrl('/' + slug);
});

RetrospectiveActions.createRetrospective.listen(function (name) {
    ajax.post('/retrospective/create.json', {name: name}, function (json) {
        _changeUrl('/' + json.slug);

        // Load up the data
        RetrospectiveActions.loadRetrospectiveWithData(json);

        // Load up our first contributor...i.e., the creator
        var contributorData = {};
        contributorData[AppData.user.identity] = AppData.user;
        ContributorActions.contributorsLoaded(contributorData, json.slug);
    });
});

RetrospectiveActions.addNote.listen(function (noteData) {
    EventManager.emit(Events.NoteAdded, noteData);
    ajax.post('/retrospective/savenote.json', {data: noteData});
});

module.exports = RetrospectiveActions;
