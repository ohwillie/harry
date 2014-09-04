# harry

Generates
[HARs](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html)
from Request and http.IncomingMessage objects.

## API

##### `harry.har(Entry entry)`

Returns a properly formatted HAR for the given entries.

##### `Entry`
An `Entry` is simply an object with following schema:

* `request`: a Request object
* `response`: an http.IncomingMessage object
* `timings`: an Object with at least the `send`, `wait`, and `receive`
  keys. See the spec for more details.
