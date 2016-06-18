'use strict';

var _ = require('underscore');
var React = require('react');
var Reflux = require('reflux');

var AbstractComponent = {
    changeListeners: null,
    mixins: [Reflux.ListenerMixin],
    data: function() {
        return {};
    },
    getInitialState: function() {
        return this.data();
    },
    onStatusChange: function(busy) {
        this.setState(this.data(busy));
    },
    componentDidMount: function() {
        var obj = this;
        if (this.changeListeners) {
            _.each(this.changeListeners, function(changeListener) {
                obj.listenTo(changeListener, obj.onStatusChange);
            });
        }
    }
};

module.exports = {
    create: function(obj) {
        return React.createClass(_.extend({}, AbstractComponent, obj));
    }
};
