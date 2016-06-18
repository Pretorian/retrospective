'use strict';

var AbstractComponent = require('./AbstractComponent.js');
var RetrospectiveActions = require('./../actions/RetrospectiveActions.js');
var RetrospectiveStore = require('./../stores/RetrospectiveStore.js');

var CreateRetrospectiveForm = AbstractComponent.create({
    changeListeners: [RetrospectiveStore],
    data: function() {
        return {
            retrospectiveLoaded: RetrospectiveStore.retrospectiveLoaded()
        };
    },
    createRetrospective: function(e) {
        e.preventDefault();
        var retrospectiveName = document.getElementById('retrospective-name-field');

        if (retrospectiveName.length === 0) {
            alert('You must specify a name for your retrospective');
            return;
        }

        RetrospectiveActions.createRetrospective(retrospectiveName.value);
    },
    render: require('./../templates/create-retrospective-form.rt')
});

module.exports = CreateRetrospectiveForm;

