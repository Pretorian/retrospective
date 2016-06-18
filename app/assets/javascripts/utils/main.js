'use strict';

import q from 'q';
import { makeRequest } from './async.js';

// @TODO @DEPRECATED Remove me
export function post(url, data) {
  var deferred = q.defer();
  makeRequest('POST', url, data, (data) => deferred.resolve(data));

  return deferred.promise;
};

export function setPageUrl(url) {
  document.getElementById('retro-app').scrollTop = 0;
  history.pushState({url: url}, url, url);
}

export function slugify(title) {
  return title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}
