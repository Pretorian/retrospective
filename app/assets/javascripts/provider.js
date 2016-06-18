'use strict';

import Container from 'infrastructure/Container';
import EventEmitter from 'infrastructure/EventEmitter';
import EventListener from 'infrastructure/EventListener';
import RetrospectiveService from './service/RetrospectiveService';
import config from './config';
import request from './utils/request';

export let container = new Container();

container.set('config', () => config);

container.set('pusher', () => {
  const options = {
    auth: {
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      }
    }
  };

  // Pusher.log = function(message) {
  //   if (window.console && window.console.log) {
  //     window.console.log(message);
  //   }
  // };

  const pusher = new Pusher(AppData.pusherCredentials.appKey, options);

  return pusher.subscribe('presence-' + AppData.pusherCredentials.channel);
});

container.set('EventEmitter', (c) => {
  return new EventEmitter(c.get('pusher'));
});

container.set('EventListener', (c) => {
  return new EventListener(c.get('pusher'));
});

container.set('RetrospectiveService', (c) => {
  return new RetrospectiveService(
    c.get('EventEmitter'),
    request,
    c.get('config').routes
  );
});

export default container;
