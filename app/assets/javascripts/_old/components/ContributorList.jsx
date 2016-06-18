'use strict';

var _ = require('underscore');
var AbstractComponent = require('./AbstractComponent.js');
var ContributorStore = require('./../stores/ContributorStore.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var ContributorList = AbstractComponent.create({
    changeListeners: [ContributorStore, RetrospectiveStore],
    data: function() {
        var retrospective = RetrospectiveStore.retrospective();

        var users = retrospective
            ? ContributorStore.usersForRetrospective(retrospective.slug)
            : [];

        var foundUsers = _.map(users || {}, function (user) {
            return user;
        });

        return {
            users: foundUsers
        };
    },
    render: require('./../templates/contributor-list.rt')
});

module.exports = ContributorList;
