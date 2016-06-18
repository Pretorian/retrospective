'use strict';

import http from 'browser-request';

var requests = {};

// @TODO @DEPRECATED Remove me
export function makeRequest(type, url, data, callback) {
  var key = JSON.stringify(data) + url;
  if (requests[key]) {
    return;
  }
  requests[key] = true;

  var requestData = {
    method: type,
    url: url,
    headers: {
      'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
    }
  };

  if (typeof data !== 'function') {
    requestData.body = JSON.stringify(data);
  }

  http(requestData, function requestComplete(err, response, body) {
    delete requests[key];

    if (err) {
      return;
    }

    if (callback) {
      return callback(JSON.parse(body));
    }

    if (typeof data === 'function') {
      return data(JSON.parse(body));
    }
  });
};
