# harry

Generates
[HARs](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
from Request and http.IncomingMessage objects.

## API

##### `harry.har(entry)`

Returns a properly formatted HAR for the given entries.

##### `harry.har(entries)`

Returns a properly formatted HAR for the given entries.

##### Entry
An Entry is simply an object with following schema:

* `request`: a Request
* `response`: an http.IncomingMessage
* `timings`: any Object with at least the `send`, `wait`, and `receive`
  keys. See [the spec](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
  for more details.
* `startedDateTime`: A Date representing when the request started. If it
  is not provided, the current Date will be used.
