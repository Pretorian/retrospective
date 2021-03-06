'use strict';
/* global AppData */
/* global Pusher */

var EventManager = function() {};

EventManager.prototype.connect = function() {
    if (this.channel) {
        return;
    }
    var options = {
        auth: {
            headers: {
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
            }
        }
    };

    this.pusher = new Pusher(AppData.pusherCredentials.appKey, options);
    this.channel = this.pusher.subscribe('presence-' + AppData.pusherCredentials.channel);
};

EventManager.prototype.on = function(event, callback) {
    this.connect();
    this.channel.bind(event, callback);
    return this;
};

EventManager.prototype.emit = function(event, data) {
    this.connect();
    this.channel.emit(event, data);
    this.channel.trigger(event, data);
};

module.exports = (function() {
    return new EventManager();
})();
