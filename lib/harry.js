var _ = require('underscore');
var qs = require('querystring');

var TIMINGS = [
  'blocked',
  'dns',
  'connect',
  'send',
  'wait',
  'receive',
  'ssl',
];

var TIMINGS_SET = {};
_.each(TIMINGS, function (timing) {
  TIMINGS_SET[timing] = true;
});

var REQUIRED_TIMINGS = [
  'send',
  'wait',
  'receive'
];

var toNvp = function (obj) {
  return _.map(obj, function (value, name) {
    return {
      name: name,
      value: value
    }
  });
};

var har = function (entries) {
  return {
    log: {
      version: '1.2',
      creator: 'harry 0.0.1',
      entries: _.map(entries, function (entry, i) {
        var req = entry.request;
        var res = entry.response;
        var timings = entry.timings;

        var error = function (message) {
          throw new Error('Entry at index ' + i + ' is invalid: ' + message);
        };

        if (!req) {
          error('request is required');
        };

        if (!res) {
          error('response is required');
        };

        if (!timings) {
          error('timings is required');
        };

        _.each(REQUIRED_TIMINGS, function (key) {
          if (!(key in timings)) {
            error('' + key + ' is a required timing');
          };
        });

        _.each(timings, function (value, key) {
          if (!(key in TIMINGS_SET)) {
            error('' + key + ' is an unknown timing');
          };
        });

        var uri = req.uri;
        var statusCode = res.statusCode;
        var headers = res.headers;
        var contentLength = headers['content-length'];

        return {
          startedDateTime: entry.startedDateTime || new Date(),
          time: _.chain(timings)
            .filter(function (value, key) { return value && value != -1 })
            .reduce(function (memo, num) { return memo + num })
            .value(),
          request: {
            method: req.method,
            url: uri.href,
            httpVersion: 'HTTP/1.1', // TODO: parse out the real HTTP version
            cookies: [], // TODO: actually grab these
            headers: [], // TODO: actually grab these
            queryString: toNvp(qs.parse(uri.query)),
            postData: {}, // TODO: actually grab this
            headersSize: -1, // TODO: actually grab this
            bodySize: -1, // TODO: actually grab this
          },
          response: {
            status: statusCode,
            statusText: req.httpModule.STATUS_CODES[statusCode],
            httpVersion: 'HTTP/1.1', // TODO: parse out the real HTTP version
            cookies: [], // TODO: actually grab these
            headers: toNvp(headers),
            content: {
              size: contentLength,
              compression: 0,
              mimeType: headers['content-type'],
              text: res.body,
            },
            redirectURL: headers.location,
            headersSize: -1,
            bodySize: contentLength,
          },
          cache: {},
          timings: _.pick(timings, TIMINGS),
        }
      }),
    },
  };
};

module.exports = {
  har: har
};
