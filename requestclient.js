var http = require('http');
var https = require('https');
const querystring = require('querystring');
const urlParser = require('url');

var _message = {};

const request = function (options, callback) {
  return new request.fn.init(options, callback);
};

request.fn = request.prototype = {

  init: function (options, callback) {

    var that = this;

    if (typeof options == 'string') {
      urlObject = urlParser.parse(options, true);
    } else if (options != null && typeof options == 'object') {
      urlObject = urlParser.parse(options.url, true);
    }

    var newOptions = {};
    if (urlObject.hostname) {
      newOptions.hostname = urlObject.hostname;
    }
    if (urlObject.port) {
      newOptions.port = urlObject.port;
    }
    if (options.method) {
      newOptions.method = options.method;
    }
    if (urlObject.path) {
      newOptions.path = urlObject.path;
    }
    newOptions.headers = options.headers || {};
    if (options.qs != null && typeof options.qs == 'object') {
      for (let key in options.qs) {
        urlObject.query[key] = options.qs[key];
      }
      newOptions.path = urlObject.pathname + '?' + querystring.stringify(urlObject.query);
    }

    var body = '';
    if (typeof options.form == 'string') {
      body = options.form;
      newOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8';
    } else if (options.form != null && typeof options.form == 'object') {
      body = querystring.stringify(options.form);
      newOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf8';
    }

    if (typeof options.body == 'string') {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf8';
      body = options.body;
    } else if (options.body != null && typeof options.body == 'object') {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf8';
      body = JSON.stringify(options.body);
    }

    newOptions.headers['Content-Length'] = Buffer.byteLength(body);

    if (urlObject.protocol == 'https:') {
      http = https;
    }

    var req = http.request(newOptions, function (res) {
      
      if (that.stream) {

        res.pipe(that.stream);

      } else {
        
        var data = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          callback && callback(null, res, data);
        });

      }

    });

    for (let eventType in _message) {

      _message[eventType].forEach(function (fn) {
        
        req.on(eventType, fn);

      });

    }

    req.on('error', function (err) {
      callback && callback(err);
    });

    req.write(body);
    req.end();

    return this;
  },

  pipe: function (stream) {
    
    this.stream = stream;
    return this;

  },

  on: function (type, fn) {
    
    if (_message[type]) {
      _message[type].push(fn);
    } else {
      _message[type] = [fn];
    }

    return this;
  }
};

request.fn.init.prototype = request.fn;

['post', 'put', 'get', 'delete', 'head', 'patch'].forEach(function (key) {
  
  request[key] = function (options, callback) {
    options.method = key;
    return request(options, callback);
  };

});

module.exports = request;