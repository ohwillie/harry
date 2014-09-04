# harry

Generates
[HARs](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
from Request and http.IncomingMessage objects.

## API

##### `harry.har(Request req, http.IncomingMessage res, Object timings, Date startedDateTime = new Date())`

Returns a properly formatted HAR for the given arguments. `timings` must
contain at least the `send`, `wait`, and `receive` keys. See the spec
for more details.
