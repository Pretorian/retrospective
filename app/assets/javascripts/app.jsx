'use strict';
/* global AppData */

var App = require('./components/App.jsx');
var ContributorActions = require('./actions/ContributorActions.js');
var React = require('react');
var RetrospectiveActions = require('./actions/RetrospectiveActions.js');

var RetrospectiveApp = {
    init: function() {
        React.render(<App />, document.getElementById('retrospective-app'));
        this.initRouting();
        this.initKeyBindings();
        RetrospectiveActions.loadRetrospectives(6);
    },
    initRouting: function() {
        var checkRoutes = function () {
            var pathName = window.location.pathname.replace(/\//i, '');

            // Jump to the top of the page on page state change
            document.getElementById('retro-app').scrollTop = 0;

            // @TODO This could likely be improved, but is fine for now
            if (pathName.length > 0) {
                if (typeof AppData.retrospective !== 'undefined') {
                    RetrospectiveActions.loadRetrospectiveWithData(AppData.retrospective);
                } else {
                    RetrospectiveActions.loadRetrospective(pathName);
                }
                ContributorActions.loadContributors(pathName);
            } else {
                RetrospectiveActions.displayRetrospectiveList();
            }
        };

        window.onpopstate = checkRoutes;

        checkRoutes();
    },
    initKeyBindings: function() {
        document.addEventListener('keyup', function(e) {
            if (e.ctrlKey === true && e.which === 78) {
                RetrospectiveActions.displayRetrospectiveList();
            }
        });
    }
};

RetrospectiveApp.init();

