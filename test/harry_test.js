var harry = require('../lib/harry');
var request = require('request');
var should = require('should');

describe('harry', function () {
  it('produces a valid HAR', function (done) {
    req = request('http://example.com/?foo=bar', function (err, res, body) {
      if (!err) {
        var har = harry.har([{
          request: req,
          response: res,
          timings: {
            send: 1,
            wait: 2,
            receive: 3
          }
        }]);

        should.exist(har);

        var log = har.log;
        should.exist(log);
        should.exist(log.version);
        should.exist(log.creator);

        var entries = log.entries;
        should.exist(entries);
        entries.length.should.eql(1);

        var entry = entries[0];
        entry.time.should.eql(6);

        var request = entry.request;
        should.exist(request);
        request.queryString.should.eql([{
          name: 'foo',
          value: 'bar'
        }]);

        var response = entry.response;
        should.exist(response);
        should.exist(response.statusText);

        var headers = response.headers;
        should.exist(headers);
        headers.length.should.be.greaterThan(-1);
      };

      done(err);
    });
  });
});
