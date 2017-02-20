const http = require('http');
const https = require('https');
const querystring = require('querystring');
const urlParser = require('url');

class request {
  static get(url, callback) {
    var options = request.getOptions(url);
    request.send(options, callback);
  }

  static send(options, callback) {
    function response(res) {
      res.on('data', chunk => {
        if (res.chunk) {
          res.chunk += chunk;
        } else {
          res.chunk = chunk;
        }
      });
      res.on('end', () => {
        callback(null, res, res.chunk.toString());
      });
    }

    if (options.protocol === 'http:') {
      var req = http.request(options, response);
    } else if (options.protocol === 'https:') {
      var req = https.request(options, response);
    }
    req.on('error', callback);
    if (typeof options.rawData == 'string') {
      req.write(options.rawData);
    }
    req.end();
  }

  static getOptions(url, data) {
    var urlObject = urlParser.parse(url);
    var options = {
      protocol: urlObject.protocol,
      host: urlObject.host,
      path: urlObject.path
    }

    if (typeof data == 'object') {
      var postData = querystring.stringify(data);
      options.rawData = postData;
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
      return options;
    } else if (typeof data == 'undefined') {
      return options;
    } else {
      throw new Error('data must be a object');
    }
  }

  static post(url, data, callback) {
    var options = request.getOptions(url, data);
    options.method = 'POST';
    request.send(options, callback);
  }

  static put(url, data, callback) {
    if (typeof data == 'object') {
      var options = request.getOptions(url, data);
    } else if (typeof data == 'function') {
      var options = request.getOptions(url);
      callback = data;
    }
    options.method = 'PUT';
    request.send(options, callback);
  }

  static delete(url, data, callback) {
    if (typeof data == 'object') {
      var options = request.getOptions(url, data);
    } else if (typeof data == 'function') {
      var options = request.getOptions(url);
      callback = data;
    }
    options.method = 'DELETE';
    request.send(options, callback);
  }

  static patch(url, data, callback) {
    var options = request.getOptions(url, data);
    options.method = 'PATCH';
    request.send(options, callback);
  }
}

module.exports = request;