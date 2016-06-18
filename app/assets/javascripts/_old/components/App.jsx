'use strict';

var AbstractComponent = require('./AbstractComponent.js');

var App = AbstractComponent.create({
    render: require('./../templates/app.rt')
});

module.exports = App;
