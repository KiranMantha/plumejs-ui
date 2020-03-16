/**
 * start of defaults
 * keep the below code untouched
 * it is required to load all the essentials need to run tests
 */
const { Window } = require('happy-dom');
const window = new Window();
const _CSSStyleSheet = jest.fn();
const _fetch = require('jest-fetch-mock');

window.CSSStyleSheet = _CSSStyleSheet;
window.fetch = _fetch;
window.document.createElementNS = function () {
  if (arguments.length === 1) {
    return window.document.createElement(arguments[0]);
  } else {
    return window.document.createElement(arguments[1]);
  }
};

window.HTMLElement.prototype.trigger = function (eventName, isBubbleing) {
  let event = new Event(eventName, {
    bubbles: isBubbleing !== undefined ? isBubbleing : false,
    cancelable: false
  });
  this.dispatchEvent(event);
};

Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window: window,
  CSSStyleSheet: _CSSStyleSheet,
  fetch: _fetch
});

/**
 * end of defaults
 */

function createXHRmock() {
  var open, send, status, onloadend, setRequestHeader, response, responseText;
  open = jest.fn();
  status = 200;
  onloadend = jest.fn();
  setRequestHeader = jest.fn();
  response = '';
  responseText = '';
  // be aware we use *function* because we need to get *this* 
  // from *new XmlHttpRequest()* call
  send = jest.fn().mockImplementation(function () {
    this.onloadend && this.onloadend.call(this);
    this.onerror && this.onerror.call(this);
    this.setRequestHeader && this.setRequestHeader.call(this);
  });

  var xhrMockClass = function () {
    return {
      open: open,
      send: send,
      status: status,
      setRequestHeader: setRequestHeader,
      response: response,
      responseText: responseText
    };
  };

  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
  window.returnMockHttpResponse = function (res) {
    status = res.status ? res.status : 200;
    response = res.response ? res.response : '';
    responseText = res.responseText ? res.responseText : '';
  }
}

createXHRmock();