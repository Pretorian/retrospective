'use strict';

var React = require('react');
var moment = require('moment');
var Reflux = require('reflux');
var ContributorStore = require('./../stores/ContributorStore.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var AbstractComponent = require('./AbstractComponent.js');

var Contributor = AbstractComponent.create({
    data: function() {
        var contrib = ContributorStore.contributor(this.props.data.identity);
        var contributorToFilterBy = RetrospectiveStore.contributorToFilterBy();

        return {
            contributor: this.props.data,
            isTyping: contrib.isTyping,
            contributorToFilterBy: contributorToFilterBy
        };
    },
    filterUser: function () {
        RetrospectiveStore.filterByContributor(this.props.data.identity)
    },
    changeListeners: [ContributorStore, RetrospectiveStore],
    render: require('./../templates/contributor.rt')
});

module.exports = Contributor;
