var _ = require('underscore');
var qs = require('querystring');

var TIMINGS = [
  'blocked',
  'dns',
  'connect',
  'send',
  'wait',
  'receive',
  'ssl'
];

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

var har = function (req, res, timings, startedDateTime) {
  startedDateTime = startedDateTime || new Date();
  timings = timings || {};

  _.each(REQUIRED_TIMINGS, function (key) {
    if (!(key in timings)) {
      throw new Error("Missing required timing key " + key);
    };
  });

  timings = _.pick(timings, TIMINGS);

  var uri = req.uri;
  var statusCode = res.statusCode;
  var headers = res.headers;
  var contentLength = headers['content-length'];

  return {
    log: {
      version: '1.2',
      creator: 'harry 0.0.1',
      entries: [
        {
          startedDateTime: startedDateTime,
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
          timings: timings,
        }
      ],
    },
  }
};

module.exports = {
  har: har
}
