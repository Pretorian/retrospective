'use strict';

/* global AppData */

var AbstractComponent = require('./AbstractComponent.js');
var ContributorActions = require('./../actions/ContributorActions.js');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');
var uuid = require('node-uuid');

var _typingTimeout = null;
var _isTyping = false;

var CreateNoteForm = AbstractComponent.create({
    data: function() {
        return {
            designation: this.props.designation,
            retrospectiveSlug: this.props.slug,
            userInitials: AppData.user.initials
        };
    },
    addNote: function(contents, designation) {
        if (contents.replace(/^\s+|\s+$/g, '').length === 0) {
            alert("You can't add an empty note");
            return;
        }

        var noteData = {
            identity: uuid.v4(),
            retrospectiveSlug: this.state.retrospectiveSlug,
            content: contents,
            designation: designation,
            user: AppData.user,
            userId: AppData.user.identity,
            noteRating: 0,
            noteRatings: []
        };

        RetrospectiveActions.addNote(noteData);
    },
    setIsTyping: function(isTyping) {
        if (_isTyping != isTyping) {
            ContributorActions.updateTypingStatus({
                user: AppData.user,
                isTyping: isTyping,
                slug: this.state.retrospectiveSlug,
            });
            _isTyping = isTyping;
        }
    },
    // This is called after a key is pressed when creating a note
    // We use a timeout here to ensure that we don't emit events too rapidly
    keyupTriggered: function(e) {
        var obj = this;
        if (_typingTimeout) {
            clearTimeout(_typingTimeout);
            this.setIsTyping(true);
        }

        _typingTimeout = setTimeout(function() {
            obj.setIsTyping(false);
        }, 900);

        if (e.keyCode == 13) {
            this.addNote(e.target.value, this.state.designation);
            e.target.value = '';
        }
    },
    render: require('./../templates/create-note-form.rt')
});

module.exports = CreateNoteForm;
