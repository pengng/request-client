# Http_request - HTTP client

## Install
```
  npm install git+https://github.com/pengng/http_request.git
```

## GET
```js
  const request = require('http_request');

  request.get('http://api.server.com', (err, res, body) => {
    if (err) {
      console.log(err);
    }
    var body = JSON.parse(body);
  });
```

## POST
```js
  const request = require('http_request');

  request.post('http://api.server.com', {
    user: 'pengng',
    message: 'Hello！'
  }, (err, res, body) => {
    if (err) {
      console.log(err);
    }
    var body = JSON.parse(body);
  });
```

## PUT, PATCH, DELETE
```js
  const request = require('http_request');
  
  request.put(url, data, callback);
  request.patch(url, data, callback);
  request.delete(url, data, callback);
```