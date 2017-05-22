# request-client

HTTP request client.

## Usage

```bash
  npm i -S request-client
```

```javascript
const request = require('request-client');

request('https://github.com', function (error, response, body) {

  if (err) {
  return console.error(err);    
  }

  console.log(body);
});
```

## stream

You can simply import the response stream into the file stream.

```javascript
request('http://www.google.com/images/errors/robot.png')
  .on('error', console.error)
  .pipe(fs.createWriteStream('robot.png'));
```

## Forms

`request-client` support `application/x-www-form-urlencoded` and `application/json` forms upload.

* application/x-www-form-urlencoded

```javascript
request({
  url: 'https://api.google.com/',
  form: {
  content: 'Hello world!'
  }
}, function (err, res, body) {
  console.log(body);
});
```

* application/json

```javascript
request({
  url: 'https://api.google.com/',
  body: {
  content: {
      text: 'Hello world',
      color: '#000000'
    }
  }
}, function (err, res, body) {
  console.log(body);
});
```

## methods

Support __GET__, __POST__, __PUT__, __DELETE__, __HEAD__, __PATCH__ method.

```javascript
request.put({
  url: 'https://google.com',
  body: 'Hello world!'
}, function (err, res, body) {
  
  console.log(body);
});
```

## request(options, callback)

The first argument can be either `url` or `options` object.

* `url` - request path. ( default: `"/"`)
* `method` - http method. ( default: `"GET"` ) 
* `headers` - http headers ( default: `{}` )
* `qs` - object containing querystring values to be appended to the `uri`
* `body` - entity body for PATCH, POST and PUT requests. Must be a String or a JSON-serializable object.
* `form` - entity body for PATCH, POST and PUT requests. Must be a string of querystring format or a JSON-serializable object.

```javascript
request({
  url: 'https://api.google.com/',
  method: 'post',
  form: {
  content: 'hello world',
  title: 'google'
  }
}, function (err, res, body) {
  console.log(body);
});
```

# request-client

HTTP 请求客户端。

## 使用方法

```bash
  npm i -S request-client
```

```javascript
const request = require('request-client');

request('https://github.com', function (error, response, body) {

  if (err) {
  return console.error(err);    
  }

  console.log(body);
});
```

## 流

您可以简单地将响应流导入到文件流中。

```javascript
// 下载图片

const fs = require('fs');
const request = require('request-client');

var img = fs.createWriteStream('robot.png');

request('http://www.google.com/images/errors/robot.png')
  .on('error', console.error)
  .pipe(img);

img.on('finish', function () {
  console.log('success!');
});
```

## 表单

`request-client` 支持 `application/x-www-form-urlencoded` and `application/json` 表单提交。

* application/x-www-form-urlencoded

```javascript
request({
  url: 'https://api.google.com/',
  form: {
  content: 'Hello world!'
  }
}, function (err, res, body) {
  console.log(body);
});
```

* application/json

```javascript
request({
  url: 'https://api.google.com/',
  body: {
  content: {
      text: 'Hello world',
      color: '#000000'
    }
  }
}, function (err, res, body) {
  console.log(body);
});
```

## HTTP 方法

支持 __GET__, __POST__, __PUT__, __DELETE__, __HEAD__, __PATCH__ 方法。

```javascript
request.put({
  url: 'https://google.com',
  body: 'Hello world!'
}, function (err, res, body) {
  
  console.log(body);
});
```

## request(options, callback)

第一个参数可以是`url`或`options`对象。

* `url` - 请求路径。（默认: `"/"`）
* `method` - HTTP 方法。（默认： `"GET"`） 
* `headers` - HTTP 请求首部。（默认：`{}`）
* `qs` - 包含要附加到`uri`的querystring值的对象。
* `body` - 实体主体用于PATCH，POST和PUT请求。必须是字符串或可用于JSON序列化对象。
* `form` - 实体主体用于PATCH，POST和PUT请求。必须是querystring格式的字符串或可用于JSON序列化对象。

```javascript
request({
  url: 'https://api.google.com/',
  method: 'post',
  form: {
  content: 'hello world',
  title: 'google'
  }
}, function (err, res, body) {
  console.log(body);
});
```
