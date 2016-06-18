'use strict';

/* global AppData */

var _ = require('underscore');
var AbstractComponent = require('./AbstractComponent.js');
var ContributorStore = require('./../stores/ContributorStore.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');

var Note = AbstractComponent.create({
    data: function() {
        var filterBy = RetrospectiveStore.contributorToFilterBy();

        return {
            retrospectiveSlug: this.props.slug,
            note: this.props.data,
            ownsNote: this.props.data.userId == AppData.user.identity,
            isHovering: false,
            filtered: this.props.data.userId != filterBy && filterBy != null
        };
    },
    toggleHover: function(bool) {
        this.setState({isHovering: bool});
    },
    hover: function() {
        this.toggleHover(true);
    },
    unhover: function() {
        this.toggleHover(false);
    },
    addNoteRating: function() {
        var note = this.state.note;

        RetrospectiveActions.updateNoteRating({
            slug: this.state.retrospectiveSlug,
            identity: note.identity,
            user: AppData.user,
            userId: AppData.user.identity
        });
    },
    removeNote: function() {
        RetrospectiveActions.removeNote({
            slug: this.state.retrospectiveSlug,
            identity: this.state.note.identity
        });
    },
    changeListeners: [RetrospectiveStore],
    render: require('./../templates/note.rt')
});

module.exports = Note;
