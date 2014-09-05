# harry

Generates
[HARs](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
from [Request](https://github.com/mikeal/request) and
[http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
objects.

## API

##### `harry.har(entry)`

Returns a properly formatted HAR for the given entry.

##### `harry.har(entries)`

Returns a properly formatted HAR for the given entries.

##### Entry
An Entry is any Object with following schema:

* `request`: a [Request](https://github.com/mikeal/request)
* `response`: an
  [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
* `timings`: any Object with at least the `send`, `wait`, and `receive`
  keys. See [the spec](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
  for more details.
* `startedDateTime`: A Date representing when the request started. If it
  is not provided, the current Date will be used.
