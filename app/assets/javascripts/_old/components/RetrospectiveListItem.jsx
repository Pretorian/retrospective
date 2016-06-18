'use strict';

var _ = require('underscore');
var AbstractComponent = require('./AbstractComponent.js');
var Chart = require('chart.js');
var ContributorActions = require('./../actions/ContributorActions.js');
var moment = require('moment');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');

var RetrospectiveListItem = AbstractComponent.create({
    data: function() {
        var state = {
            retrospective: this.props.data,
            designationCounts: [0, 0, 0]
        };

        _.each(this.props.data.notes, function (note) {
            state.designationCounts[note.designation]++;
        });

        state.retrospective.createdAt = moment(state.retrospective.createdAt.date)
            .format('MMM Do');

        return state;
    },
    loadRetrospective: function() {
        RetrospectiveActions.loadRetrospective(
            this.state.retrospective.slug,
            this.state.retrospective.name
        );
        ContributorActions.loadContributors(this.state.retrospective.slug);
    },
    componentDidMount: function() {
        var obj = this;
        var totalNotes = this.state.retrospective.notes.length;
        var designationColors = [
            '#27ae60',
            '#f39c12',
            '#c0392b'
        ];

        _.each(this.state.designationCounts, function (designationValue, i) {
            var ctx = document
                .getElementById('circle-' + obj.state.retrospective.slug + '-' + i)
                .getContext("2d");

            var chartData = [
                {
                    value: designationValue,
                    color: designationColors[i]
                },
                {
                    value: designationValue === 0 ? 1 : totalNotes - designationValue,
                    color: '#ccc'
                }
            ];

            new Chart(ctx).Doughnut(chartData, {
                percentageInnerCutout: 90,
                animation: false,
                showTooltips: false
            })
        });
    },
    render: require('./../templates/retrospective-list-item.rt')
});

module.exports = RetrospectiveListItem;
