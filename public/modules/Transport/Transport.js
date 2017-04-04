import fetch from 'isomorphic-fetch';

class Transport {
  constructor() {
    if (Transport.__instance) {
      return Transport.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    Transport.__instance = this;
  }

  get BaseUrl() {
    return this._baseUrl;
  }

  set BaseUrl(url) {
    this._baseUrl = url;
  }

  get Headers() {
    return this._headers;
  }

  set Headers(value) {
    if (!(value && (`${value}` === '[object Object]'))) {
      throw new TypeError('Headers must be a plain object');
    }

    const valid = Object.keys(value).every(key => typeof value[key] === 'string');

    if (!valid) {
      throw new TypeError('Headers must be a plain object');
    }

    this._headers = value;
  }

  get(uri) {
    return this._senderGet(uri, 'GET');
  }

  post(uri, data = {}) {
    return this._senderPost(uri, 'POST', data);
  }

  _senderPost(uri, _method, data,
          _headers = { 'Content-Type': 'application/json; charset=utf-8' },
          coockies = 'include') {
    return fetch(this._baseUrl + uri, {
      method: _method,
      headers: _headers,
      mode: 'cors',
      body: data,
      credentials: coockies
    });
  }

  _senderGet(uri, _method,
              _headers = { 'Content-Type': 'application/json; charset=utf-8' },
              coockies = 'include') {
    return fetch(this._baseUrl + uri, {
      method: _method,
      headers: _headers,
      mode: 'cors',
      credentials: coockies
    });
  }
}

const transport = new Transport();
transport._baseUrl = 'https://ananymous.herokuapp.com/api';

export default transport;
