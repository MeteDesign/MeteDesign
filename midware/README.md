# METE DESIGN MIDWARE

## md_service

midware of service，we have the following service now:

- [x] ​`md_ajax` 
- [x] `md_sessionStorage`
- [x] `md_localStorage`

### Usage

Using with ES6:

```javascript
import {md_ajax, md_sessionStorage, md_localStorage} from 'md_midware/md_service'

// demo for md_ajax
md_ajax.get('./data.json')
  .then((data)=>{
    //Todo
  })
  .catch((err)=>{
    //Todo
  })
```

## md_ajax

Promise based HTTP client for the browser and node.js

### Features

- Support cache (sessionStorage and localStorage)

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### Dependencies

- `axios`
- `es6-promise`

### Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Latest ✔                                 | Latest ✔                                 | Latest ✔                                 | Latest ✔                                 | Latest ✔                                 |

[![Browser Matrix](./md_ajax_support.png)]()

### Usage

Using with ES6:

```javascript
import {md_ajax} from 'md_midware/md_service'

// demo for md_ajax
md_ajax.get('./data.json')
  .then((data)=>{
    //Todo
  })
  .catch((err)=>{
    //Todo
  })
```



### API

#### get

call:

```javascript
md_ajax.get(url, config)
```

return:

`Promise`

#### post

call:

```javascript
md_ajax.post(url, config)
```

return:

`Promise`

#### delete

call:

```javascript
md_ajax.delete(url, config)
```

return:

`Promise`

#### head

call:

```javascript
md_ajax.head(url, config)
```

return:

`Promise`

#### put

call:

```javascript
md_ajax.put(url, config)
```

return:

`Promise`

#### patch

call:

```javascript
md_ajax.patch(url, config)
```

return:

`Promise`

#### setCommonHeader

call:

```javascript
md_ajax.setCommonHeader(url, config)
```

return:

`Promise`



### Config

These are the available config options for making requests. Only the `url` is required. 

> notice: `url` and`method` will overwrite `md_ajax` config info and maybe cause unexpected errors, so don't use this (`url` and `method`) properties in config.



```javascript
{
  // `cache` indicates whether HTTP request are cached and it's default value is false
  cache:false,
  // `cacheType` has two options,seesion and local
  // if use `session`, it will call `md_sessionStorage` lib  
  // if use `local`, it will call `md_localStorage` lib
  cacheType:'session',
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string, an ArrayBuffer, or a Stream
  transformRequest: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows to configure options like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

### Response Schema

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {}
}
```

### More

more about `axios`, please click [here](https://github.com/mzabriskie/axios) 

## License

MIT




