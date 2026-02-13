/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/lib/adapters/adapters.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetch.js */ "./node_modules/axios/lib/adapters/fetch.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");






/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 * 
 * @type {Object<string, Function|Object>}
 */
const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  fetch: {
    get: _fetch_js__WEBPACK_IMPORTED_MODULE_3__.getFetch,
  }
};

// Assign adapter names for easier debugging and identification
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', { value });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', { value });
  }
});

/**
 * Render a rejection reason string for unknown or unsupported adapters
 * 
 * @param {string} reason
 * @returns {string}
 */
const renderReason = (reason) => `- ${reason}`;

/**
 * Check if the adapter is resolved (function, null, or false)
 * 
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */
const isResolvedHandle = (adapter) => _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(adapter) || adapter === null || adapter === false;

/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 * 
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */
function getAdapter(adapters, config) {
  adapters = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(adapters) ? adapters : [adapters];

  const { length } = adapters;
  let nameOrAdapter;
  let adapter;

  const rejectedReasons = {};

  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;

    adapter = nameOrAdapter;

    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

      if (adapter === undefined) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](`Unknown adapter '${id}'`);
      }
    }

    if (adapter && (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }

    rejectedReasons[id || '#' + i] = adapter;
  }

  if (!adapter) {
    const reasons = Object.entries(rejectedReasons)
      .map(([id, state]) => `adapter ${id} ` +
        (state === false ? 'is not supported by the environment' : 'is not available in the build')
      );

    let s = length ?
      (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
      'as no adapter specified';

    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      `There is no suitable adapter to dispatch the request ` + s,
      'ERR_NOT_SUPPORT'
    );
  }

  return adapter;
}

/**
 * Exports Axios adapters and utility to resolve an adapter
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,

  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
});


/***/ },

/***/ "./node_modules/axios/lib/adapters/fetch.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/adapters/fetch.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getFetch: () => (/* binding */ getFetch)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/composeSignals.js */ "./node_modules/axios/lib/helpers/composeSignals.js");
/* harmony import */ var _helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/trackStream.js */ "./node_modules/axios/lib/helpers/trackStream.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/settle.js */ "./node_modules/axios/lib/core/settle.js");










const DEFAULT_CHUNK_SIZE = 64 * 1024;

const {isFunction} = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"];

const globalFetchAPI = (({Request, Response}) => ({
  Request, Response
}))(_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].global);

const {
  ReadableStream, TextEncoder
} = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].global;


const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
}

const factory = (env) => {
  env = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);

  const {fetch: envFetch, Request, Response} = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);

  if (!isFetchSupported) {
    return false;
  }

  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);

  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Request(str).arrayBuffer())
  );

  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;

    const hasContentType = new Request(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  });

  const supportsResponseStream = isResponseSupported && isReadableStreamSupported &&
    test(() => _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isReadableStream(new Response('').body));

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && ((() => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];

        if (method) {
          return method.call(res);
        }

        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](`Response type '${type}' is not supported`, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NOT_SUPPORT, config);
      })
    });
  })());

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isBlob(body)) {
      return body.size;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isSpecCompliantForm(body)) {
      const _request = new Request(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBufferView(body) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBuffer(body)) {
      return body.byteLength;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isURLSearchParams(body)) {
      body = body + '';
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  }

  const resolveBodyLength = async (headers, body) => {
    const length = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  }

  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_7__["default"])(config);

    let _fetch = envFetch || fetch;

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = (0,_helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_3__["default"])([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

    let request = null;

    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });

    let requestContentLength;

    try {
      if (
        onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });

        let contentTypeHeader;

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader)
        }

        if (_request.body) {
          const [onProgress, flush] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventDecorator)(
            requestContentLength,
            (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.asyncDecorator)(onUploadProgress))
          );

          data = (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__.trackStream)(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }

      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;

      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : undefined
      };

      request = isRequestSupported && new Request(url, resolvedOptions);

      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));

      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });

        const responseContentLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(response.headers.get('content-length'));

        const [onProgress, flush] = onDownloadProgress && (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventDecorator)(
          responseContentLength,
          (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.asyncDecorator)(onDownloadProgress), true)
        ) || [];

        response = new Response(
          (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].findKey(resolvers, responseType) || 'text'](response, config);

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(resolve, reject, {
          data: responseData,
          headers: _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        })
      })
    } catch (err) {
      unsubscribe && unsubscribe();

      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(err, err && err.code, config, request);
    }
  }
}

const seedCache = new Map();

const getFetch = (config) => {
  let env = (config && config.env) || {};
  const {fetch, Request, Response} = env;
  const seeds = [
    Request, Response, fetch
  ];

  let len = seeds.length, i = len,
    seed, target, map = seedCache;

  while (i--) {
    seed = seeds[i];
    target = map.get(seed);

    target === undefined && map.set(seed, target = (i ? new Map() : factory(env)))

    map = target;
  }

  return target;
};

const adapter = getFetch();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ },

/***/ "./node_modules/axios/lib/adapters/xhr.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");











const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_9__["default"])(config);
    let requestData = _config.data;
    const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__["default"].from(_config.headers).normalize();
    let {responseType, onUploadProgress, onDownloadProgress} = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;

    function done() {
      flushUpload && flushUpload(); // flush events
      flushDownload && flushDownload(); // flush events

      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
    }

    let request = new XMLHttpRequest();

    request.open(_config.method.toUpperCase(), _config.url, true);

    // Set the request timeout in MS
    request.timeout = _config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__["default"].from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
  request.onerror = function handleError(event) {
       // Browsers deliver a ProgressEvent in XHR onerror
       // (message may be empty; when present, surface it)
       // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
       const msg = event && event.message ? event.message : 'Network Error';
       const err = new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](msg, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_NETWORK, config, request);
       // attach the underlying event for consumers who want details
       err.event = event || null;
       reject(err);
       request = null;
    };
    
    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = _config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_2__["default"];
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = _config.responseType;
    }

    // Handle progress if needed
    if (onDownloadProgress) {
      ([downloadThrottled, flushDownload] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_8__.progressEventReducer)(onDownloadProgress, true));
      request.addEventListener('progress', downloadThrottled);
    }

    // Not all browsers support upload events
    if (onUploadProgress && request.upload) {
      ([uploadThrottled, flushUpload] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_8__.progressEventReducer)(onUploadProgress));

      request.upload.addEventListener('progress', uploadThrottled);

      request.upload.addEventListener('loadend', flushUpload);
    }

    if (_config.cancelToken || _config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_4__["default"](null, config, request) : cancel);
        request.abort();
        request = null;
      };

      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_config.url);

    if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].protocols.indexOf(protocol) === -1) {
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});


/***/ },

/***/ "./node_modules/axios/lib/axios.js"
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"].prototype, context, {allOwnKeys: true});

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_8__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_9__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_13__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_14__["default"];

axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__["default"];

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);


/***/ },

/***/ "./node_modules/axios/lib/cancel/CancelToken.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CancelToken);


/***/ },

/***/ "./node_modules/axios/lib/cancel/CanceledError.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  __CANCEL__: true
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanceledError);


/***/ },

/***/ "./node_modules/axios/lib/cancel/isCancel.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isCancel)
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ },

/***/ "./node_modules/axios/lib/core/Axios.js"
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");











const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_6__["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};

        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_6__["default"].assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        _helpers_validator_js__WEBPACK_IMPORTED_MODULE_6__["default"].assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) {
      // do nothing
    } else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    _helpers_validator_js__WEBPACK_IMPORTED_MODULE_6__["default"].assertOptions(config, {
      baseUrl: validators.spelling('baseURL'),
      withXsrfToken: validators.spelling('withXSRFToken')
    }, true);

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge(
      headers.common,
      headers[config.method]
    );

    headers && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind(this), undefined];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__["default"])(config.baseURL, config.url, config.allowAbsoluteUrls);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axios);


/***/ },

/***/ "./node_modules/axios/lib/core/AxiosError.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});

const prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  const msg = error && error.message ? error.message : 'Error';

  // Prefer explicit code; otherwise copy the low-level error's code (e.g. ECONNREFUSED)
  const errCode = code == null && error ? error.code : code;
  AxiosError.call(axiosError, msg, errCode, config, request, response);

  // Chain the original error on the standard field; non-enumerable to avoid JSON noise
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, 'cause', { value: error, configurable: true });
  }

  axiosError.name = (error && error.name) || 'Error';

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosError);


/***/ },

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(header) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(entry)) {
          throw TypeError('Object iterator must return a key-value pair');
        }

        obj[key = entry[0]] = (dest = obj[key]) ?
          (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
      }

      setHeaders(obj, valueOrRewrite)
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  getSetCookie() {
    return this.get("set-cookie") || [];
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosHeaders);


/***/ },

/***/ "./node_modules/axios/lib/core/InterceptorManager.js"
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterceptorManager);


/***/ },

/***/ "./node_modules/axios/lib/core/buildFullPath.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFullPath)
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ },

/***/ "./node_modules/axios/lib/core/dispatchRequest.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dispatchRequest)
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_3__["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_5__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].adapter, config);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(
      config,
      config.transformResponse,
      response
    );

    response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}


/***/ },

/***/ "./node_modules/axios/lib/core/mergeConfig.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeConfig)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, prop, caseless) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge.call({caseless}, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, prop, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(Object.keys({...config1, ...config2}), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


/***/ },

/***/ "./node_modules/axios/lib/core/settle.js"
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settle)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}


/***/ },

/***/ "./node_modules/axios/lib/core/transformData.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transformData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_1__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ },

/***/ "./node_modules/axios/lib/defaults/index.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_2__["default"],

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

    if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_6__["default"])(data)) : data;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)
    ) {
      return data;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_4__["default"])(data, this.formSerializer).toString();
      }

      if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isResponse(data) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)) {
      return data;
    }

    if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);


/***/ },

/***/ "./node_modules/axios/lib/defaults/transitional.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});


/***/ },

/***/ "./node_modules/axios/lib/env/data.js"
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
const VERSION = "1.13.2";

/***/ },

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js"
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosURLSearchParams);


/***/ },

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpStatusCode);


/***/ },

/***/ "./node_modules/axios/lib/helpers/bind.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });


/**
 * Create a bound version of a function with a specified `this` context
 *
 * @param {Function} fn - The function to bind
 * @param {*} thisArg - The value to be passed as the `this` parameter
 * @returns {Function} A new function that will call the original function with the specified `this` context
 */
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/buildURL.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildURL)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(options)) {
    options = {
      serialize: options
    };
  } 

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
      params.toString() :
      new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/combineURLs.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ combineURLs)
/* harmony export */ });


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/composeSignals.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/composeSignals.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const composeSignals = (signals, timeout) => {
  const {length} = (signals = signals ? signals.filter(Boolean) : []);

  if (timeout || length) {
    let controller = new AbortController();

    let aborted;

    const onabort = function (reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? err : new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](err instanceof Error ? err.message : err));
      }
    }

    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](`timeout ${timeout} of ms exceeded`, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ETIMEDOUT))
    }, timeout)

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
      }
    }

    signals.forEach((signal) => signal.addEventListener('abort', onabort));

    const {signal} = controller;

    signal.unsubscribe = () => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].asap(unsubscribe);

    return signal;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (composeSignals);


/***/ },

/***/ "./node_modules/axios/lib/helpers/cookies.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === 'undefined') return;

      const cookie = [`${name}=${encodeURIComponent(value)}`];

      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push('secure');
      }
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }

      document.cookie = cookie.join('; ');
    },

    read(name) {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000, '/');
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  });



/***/ },

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formDataToJSON);


/***/ },

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAbsoluteURL)
/* harmony export */ });


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAxiosError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js"
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
  url = new URL(url, _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin);

  return (
    origin.protocol === url.protocol &&
    origin.host === url.host &&
    (isMSIE || origin.port === url.port)
  );
})(
  new URL(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin),
  _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigator && /(msie|trident)/i.test(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigator.userAgent)
) : () => true);


/***/ },

/***/ "./node_modules/axios/lib/helpers/null.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// eslint-disable-next-line strict
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);


/***/ },

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});


/***/ },

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProtocol)
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/progressEventReducer.js"
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/progressEventReducer.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncDecorator: () => (/* binding */ asyncDecorator),
/* harmony export */   progressEventDecorator: () => (/* binding */ progressEventDecorator),
/* harmony export */   progressEventReducer: () => (/* binding */ progressEventReducer)
/* harmony export */ });
/* harmony import */ var _speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/axios/lib/helpers/throttle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = (0,_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

  return (0,_throttle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true
    };

    listener(data);
  }, freq);
}

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
}

const asyncDecorator = (fn) => (...args) => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].asap(() => fn(...args));


/***/ },

/***/ "./node_modules/axios/lib/helpers/resolveConfig.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/resolveConfig.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _cookies_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((config) => {
  const newConfig = (0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_5__["default"])({}, config);

  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;

  newConfig.headers = headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_6__["default"].from(headers);

  newConfig.url = (0,_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__["default"])(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data)) {
    if (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // browser handles it
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(data.getHeaders)) {
      // Node.js FormData (like form-data package)
      const formHeaders = data.getHeaders();
      // Only set safe headers to avoid overwriting security headers
      const allowedHeaders = ['content-type', 'content-length'];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }  

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv) {
    withXSRFToken && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && (0,_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_2__["default"])(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && _cookies_js__WEBPACK_IMPORTED_MODULE_3__["default"].read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
});



/***/ },

/***/ "./node_modules/axios/lib/helpers/speedometer.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (speedometer);


/***/ },

/***/ "./node_modules/axios/lib/helpers/spread.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ spread)
/* harmony export */ });


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/throttle.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/throttle.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  }

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if ( passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs)
        }, threshold - passed);
      }
    }
  }

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ },

/***/ "./node_modules/axios/lib/helpers/toFormData.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform/node/classes/FormData.js */ "./node_modules/axios/lib/helpers/null.js");




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSpecCompliantForm(formData);

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(value)) {
      return value.toString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]')) && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(
        formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toFormData);


/***/ },

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js"
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toURLEncodedForm)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/trackStream.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/trackStream.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readBytes: () => (/* binding */ readBytes),
/* harmony export */   streamChunk: () => (/* binding */ streamChunk),
/* harmony export */   trackStream: () => (/* binding */ trackStream)
/* harmony export */ });

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
}

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
}

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
}

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  }

  return new ReadableStream({
    async pull(controller) {
      try {
        const {done, value} = await iterator.next();

        if (done) {
         _onFinish();
          controller.close();
          return;
        }

        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/validator.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  }
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  assertOptions,
  validators
});


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/Blob.js"
/*!*****************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/Blob.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Blob !== 'undefined' ? Blob : null);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js"
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof FormData !== 'undefined' ? FormData : null);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js"
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");
/* harmony import */ var _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Blob.js */ "./node_modules/axios/lib/platform/browser/classes/Blob.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob: _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ },

/***/ "./node_modules/axios/lib/platform/common/utils.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/platform/common/utils.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBrowserEnv: () => (/* binding */ hasBrowserEnv),
/* harmony export */   hasStandardBrowserEnv: () => (/* binding */ hasStandardBrowserEnv),
/* harmony export */   hasStandardBrowserWebWorkerEnv: () => (/* binding */ hasStandardBrowserWebWorkerEnv),
/* harmony export */   navigator: () => (/* binding */ _navigator),
/* harmony export */   origin: () => (/* binding */ origin)
/* harmony export */ });
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = typeof navigator === 'object' && navigator || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = hasBrowserEnv && window.location.href || 'http://localhost';




/***/ },

/***/ "./node_modules/axios/lib/platform/index.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/platform/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils.js */ "./node_modules/axios/lib/platform/common/utils.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ..._common_utils_js__WEBPACK_IMPORTED_MODULE_1__,
  ..._node_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]
});


/***/ },

/***/ "./node_modules/axios/lib/utils.js"
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");




// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;
const {iterator, toStringTag} = Symbol;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
}

/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */
const isEmptyObject = (val) => {
  // Early return for non-objects or Buffers to prevent RangeError
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }

  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    // Fallback for any other objects that might cause RangeError with Object.keys()
    return false;
  }
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Buffer check
    if (isBuffer(obj)) {
      return;
    }

    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  if (isBuffer(obj)){
    return null;
  }

  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : globalThis)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless, skipUndefined} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
}



/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      //Buffer check
      if (isBuffer(source)) {
        return source;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({source, data}) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);

    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    }
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === 'function',
  isFunction(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************


const isIterable = (thing) => thing != null && isFunction(thing[iterator]);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
});


/***/ },

/***/ "./node_modules/classnames/index.js"
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ },

/***/ "./src/js/admin.js"
/*!*************************!*\
  !*** ./src/js/admin.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/js/components/App.js");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/style.scss */ "./src/sass/style.scss");


__webpack_require__(/*! ./helpers/otherPlugins */ "./src/js/helpers/otherPlugins.js");


// Render App.
var app = document.getElementById('app');
if (_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot) {
  var root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(app);
  root.render(/*#__PURE__*/React.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], null));
} else {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/React.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], null), app);
}

/***/ },

/***/ "./src/js/components/App.js"
/*!**********************************!*\
  !*** ./src/js/components/App.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-library */ "@wordpress/block-library");
/* harmony import */ var _wordpress_block_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions/blocks */ "./src/js/functions/blocks.js");
/* harmony import */ var _functions_getCategoryData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/getCategoryData */ "./src/js/functions/getCategoryData.js");
/* harmony import */ var _Blocks_Blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Blocks/Blocks */ "./src/js/components/Blocks/Blocks.js");
/* harmony import */ var _Categories_Categories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Categories/Categories */ "./src/js/components/Categories/Categories.js");
/* harmony import */ var _Patterns_Patterns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Patterns/Patterns */ "./src/js/components/Patterns/Patterns.js");
/* harmony import */ var _BlockFinder_BlockFinder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BlockFinder/BlockFinder */ "./src/js/components/BlockFinder/BlockFinder.js");








function App() {
  var _window;
  var _gbm_localize = gbm_localize,
    _gbm_localize$filtere = _gbm_localize.filteredCategoriesAll,
    filteredCategoriesAll = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere;
  (0,_wordpress_block_library__WEBPACK_IMPORTED_MODULE_0__.registerCoreBlocks)();
  var blocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.getBlockTypes)();
  var categories = (0,_functions_getCategoryData__WEBPACK_IMPORTED_MODULE_3__["default"])();

  // Parse URL to get current view.
  var url = (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.href;
  var type = 'blocks';
  type = url.includes('categories') ? 'categories' : type;
  type = url.includes('patterns') ? 'patterns' : type;
  type = url.includes('block-finder') ? 'block-finder' : type;
  function Display() {
    switch (type) {
      case 'block-finder':
        return /*#__PURE__*/React.createElement(_BlockFinder_BlockFinder__WEBPACK_IMPORTED_MODULE_7__["default"], {
          wpBlocks: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlocksData)(blocks, filteredCategoriesAll),
          wpCategories: categories
        });
      case 'patterns':
        return /*#__PURE__*/React.createElement(_Patterns_Patterns__WEBPACK_IMPORTED_MODULE_6__["default"], null);
      case 'categories':
        return /*#__PURE__*/React.createElement(_Categories_Categories__WEBPACK_IMPORTED_MODULE_5__["default"], {
          wpBlocks: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlockCategoryData)(blocks),
          wpCategories: categories
        });
      default:
        return /*#__PURE__*/React.createElement(_Blocks_Blocks__WEBPACK_IMPORTED_MODULE_4__["default"], {
          wpBlocks: (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_2__.getBlocksData)(blocks, filteredCategoriesAll),
          wpCategories: categories
        });
    }
  }
  return /*#__PURE__*/React.createElement(Display, null);
}

/***/ },

/***/ "./src/js/components/BlockFinder/BlockFinder.js"
/*!******************************************************!*\
  !*** ./src/js/components/BlockFinder/BlockFinder.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockFinder)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/BlockFinder/components/Sidebar.js");
/* harmony import */ var _components_ResultItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/ResultItem */ "./src/js/components/BlockFinder/components/ResultItem.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








/**
 * Render the Block Finder component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The BlockFinder component.
 */
function BlockFinder(_ref) {
  var _gbm_localize;
  var wpBlocks = _ref.wpBlocks,
    wpCategories = _ref.wpCategories;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    searching = _useState4[0],
    setSearching = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedBlock = _useState6[0],
    setSelectedBlock = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    results = _useState8[0],
    setResults = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState0 = _slicedToArray(_useState9, 2),
    total = _useState0[0],
    setTotal = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState10 = _slicedToArray(_useState1, 2),
    page = _useState10[0],
    setPage = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(50),
    _useState12 = _slicedToArray(_useState11, 2),
    perPage = _useState12[0],
    setPerPage = _useState12[1];
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    notifications = _useState14[0],
    setNotifications = _useState14[1];
  var _useState15 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    blocks = _useState16[0],
    setBlocks = _useState16[1];
  var postTypes = ((_gbm_localize = gbm_localize) === null || _gbm_localize === void 0 ? void 0 : _gbm_localize.postTypes) || [];

  /**
   * Get the label for a post type.
   *
   * @param {string} type The post type name.
   * @return {string}     The post type label.
   */
  function getPostTypeLabel(type) {
    var found = postTypes.find(function (pt) {
      return pt.name === type;
    });
    return found ? found.label : type;
  }

  /**
   * Search for posts containing a block.
   *
   * @param {string} blockName The block name to search for.
   * @param {number} pageNum   The page number.
   */
  function findBlock(blockName) {
    var pageNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    setSearching(true);
    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/block_finder/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        block: blockName,
        page: pageNum
      }
    }).then(function (res) {
      var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data;
      if (data !== null && data !== void 0 && data.success) {
        if (pageNum === 1) {
          setResults(data.posts);
        } else {
          setResults(function (prev) {
            return [].concat(_toConsumableArray(prev), _toConsumableArray(data.posts));
          });
        }
        setTotal(data.total);
        setPage(pageNum);
        setPerPage(data.per_page);
      } else {
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: (data === null || data === void 0 ? void 0 : data.msg) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred', 'block-manager'),
            success: false
          }]);
        });
      }
      setSearching(false);
    })["catch"](function (error) {
      console.warn(error);
      setSearching(false);
    });
  }

  /**
   * Handle block selection from sidebar.
   *
   * @param {Object} block The selected block.
   */
  function selectBlock(block) {
    setSelectedBlock(block);
    setResults([]);
    setTotal(0);
    setPage(1);
    findBlock(block.name, 1);

    // Update URL for deep linking.
    var url = new URL(window.location.href);
    url.searchParams.set('block', block.name);
    window.history.replaceState(null, '', url.toString());
  }

  /**
   * Load more results.
   */
  function loadMore() {
    if (selectedBlock) {
      findBlock(selectedBlock.name, page + 1);
    }
  }

  /**
   * Organize blocks into a flat sorted list.
   */
  function organizeBlocks() {
    if (!(wpBlocks !== null && wpBlocks !== void 0 && wpBlocks.length)) {
      return;
    }
    var sorted = _toConsumableArray(wpBlocks).sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    setBlocks(sorted);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    organizeBlocks();

    // Check URL for deep-linked block.
    var url = new URL(window.location.href);
    var blockParam = url.searchParams.get('block');
    if (blockParam && wpBlocks !== null && wpBlocks !== void 0 && wpBlocks.length) {
      var match = wpBlocks.find(function (b) {
        return b.name === blockParam;
      });
      if (match) {
        setSelectedBlock(match);
        findBlock(match.name, 1);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  var hasMore = results.length < total;
  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    callback: setLoading
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "gbm-block-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-header--title"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Finder', 'block-manager')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Find all posts and pages that contain a specific block.', 'block-manager'))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    blocks: blocks,
    selectedBlock: selectedBlock,
    onSelect: selectBlock
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks gbm-finder-results"
  }, !selectedBlock && /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-empty"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a block from the sidebar to find posts that use it.', 'block-manager'))), selectedBlock && searching && results.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-searching"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Searching…', 'block-manager'))), selectedBlock && !searching && results.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-empty"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No posts found containing this block.', 'block-manager'))), results.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-results-header"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, total), ' ', total === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('post found', 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('posts found', 'block-manager'))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-results-list"
  }, results.map(function (post) {
    return /*#__PURE__*/React.createElement(_components_ResultItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: post.id,
      post: post,
      postTypeLabel: getPostTypeLabel(post.type)
    });
  })), hasMore && /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-load-more"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: loadMore,
    disabled: searching
  }, searching ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Load More', 'block-manager'))))))), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_4__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ },

/***/ "./src/js/components/BlockFinder/components/ResultItem.js"
/*!****************************************************************!*\
  !*** ./src/js/components/BlockFinder/components/ResultItem.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResultItem)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Render a single result item in the Block Finder.
 *
 * @param {Object} props               The component props.
 * @param {Object} props.post          The post data.
 * @param {string} props.postTypeLabel The human-readable post type label.
 * @return {Element}                   The ResultItem component.
 */
function ResultItem(_ref) {
  var post = _ref.post,
    postTypeLabel = _ref.postTypeLabel;
  var id = post.id,
    title = post.title,
    type = post.type,
    edit_url = post.edit_url;
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-result-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-finder-result-item--info"
  }, /*#__PURE__*/React.createElement("a", {
    href: edit_url,
    target: "_blank",
    rel: "noopener noreferrer",
    title: "".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit', 'block-manager'), ": ").concat(title)
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "gbm-finder-result-item--type"
  }, postTypeLabel)), /*#__PURE__*/React.createElement("a", {
    className: "gbm-finder-result-item--edit",
    href: edit_url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit', 'block-manager'), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: "12",
    height: "12"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-160c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
  }))));
}

/***/ },

/***/ "./src/js/components/BlockFinder/components/Sidebar.js"
/*!*************************************************************!*\
  !*** ./src/js/components/BlockFinder/components/Sidebar.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/**
 * Render the Block Finder Sidebar.
 *
 * @param {Object}   props               The component props.
 * @param {Array}    props.blocks        Array of all blocks.
 * @param {Object}   props.selectedBlock The currently selected block.
 * @param {Function} props.onSelect      Callback when a block is selected.
 * @return {Element}                     The Sidebar component.
 */
function Sidebar(_ref) {
  var blocks = _ref.blocks,
    selectedBlock = _ref.selectedBlock,
    onSelect = _ref.onSelect;
  var inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var filtered = search ? blocks.filter(function (block) {
    return block.title.toLowerCase().includes(search.toLowerCase());
  }) : blocks;
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-searchbox"
  }, /*#__PURE__*/React.createElement("label", {
    className: "offscreen",
    htmlFor: "gbm-finder-search"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search Blocks', 'block-manager')), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "gbm-finder-search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search Blocks', 'block-manager'),
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    },
    ref: inputRef
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _inputRef$current;
      return inputRef === null || inputRef === void 0 || (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search', 'block-manager')), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-finder-block-list"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Blocks', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "gbm-finder-no-blocks"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No blocks found.', 'block-manager')), filtered.map(function (block) {
    return /*#__PURE__*/React.createElement("button", {
      key: block.name,
      type: "button",
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('gbm-finder-block-item', {
        'is-selected': (selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.name) === block.name
      }),
      onClick: function onClick() {
        return onSelect(block);
      },
      title: block.name
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockIcon, {
      icon: block.icon
    }), /*#__PURE__*/React.createElement("span", null, block.title));
  }))));
}

/***/ },

/***/ "./src/js/components/Blocks/Blocks.js"
/*!********************************************!*\
  !*** ./src/js/components/Blocks/Blocks.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Blocks)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _functions_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions/blocks */ "./src/js/functions/blocks.js");
/* harmony import */ var _functions_bulkProcess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../functions/bulkProcess */ "./src/js/functions/bulkProcess.js");
/* harmony import */ var _functions_export__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../functions/export */ "./src/js/functions/export.js");
/* harmony import */ var _functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../functions/setCategoryStatus */ "./src/js/functions/setCategoryStatus.js");
/* harmony import */ var _Global_Export__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/Export */ "./src/js/components/Global/Export.js");
/* harmony import */ var _Global_ExportModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Global/ExportModal */ "./src/js/components/Global/ExportModal.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
/* harmony import */ var _Global_Reset__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Global/Reset */ "./src/js/components/Global/Reset.js");
/* harmony import */ var _Global_SearchResults__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Global/SearchResults */ "./src/js/components/Global/SearchResults.js");
/* harmony import */ var _Global_SlidePanel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Global/SlidePanel */ "./src/js/components/Global/SlidePanel.js");
/* harmony import */ var _components_Category__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/Category */ "./src/js/components/Blocks/components/Category.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/Blocks/components/Sidebar.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Global/Search */ "./src/js/components/Global/Search.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


















/**
 * Render the Blocks component.
 *
 * @param {Object} props              The component props.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories.
 * @return {Element}                  The Blocks component.
 */
function Blocks(_ref) {
  var _gbm_localize, _gbm_localize2;
  var wpBlocks = _ref.wpBlocks,
    wpCategories = _ref.wpCategories;
  var resetButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportModalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      term: '',
      results: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    notifications = _useState6[0],
    setNotifications = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    blocks = _useState8[0],
    setBlocks = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    infoPanelBlock = _useState0[0],
    setInfoPanelBlock = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)((_gbm_localize = gbm_localize) === null || _gbm_localize === void 0 ? void 0 : _gbm_localize.disabledBlocks),
    _useState10 = _slicedToArray(_useState1, 2),
    disabledBlocks = _useState10[0],
    setDisabled = _useState10[1];
  var filteredBlocks = ((_gbm_localize2 = gbm_localize) === null || _gbm_localize2 === void 0 ? void 0 : _gbm_localize2.filteredBlocks) || [];

  // Count the disabled & filtered blocks.
  var _countDisabledBlocks = (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_3__.countDisabledBlocks)(wpBlocks, disabledBlocks, filteredBlocks),
    disabledCount = _countDisabledBlocks.disabledCount,
    filteredCount = _countDisabledBlocks.filteredCount;

  /**
   * Toggle the status of a block.
   *
   * @param {Element} element The target element.
   * @param {string}  block   Block name.
   * @param {string}  title   Block title.
   */
  function toggleBlock(element, block, title) {
    if (!element || element.classList.contains('loading')) {
      return false;
    }
    element.classList.add('loading');
    var type = element.classList.contains('disabled') ? 'enable' : 'disable';

    // Send API Request
    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/toggle/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        block: block,
        title: title,
        type: type
      }
    }).then(function (res) {
      var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data,
        status = res.status;
      var _data$success = data.success,
        success = _data$success === void 0 ? true : _data$success;
      if (data && status === 200) {
        if (success) {
          if (type === 'disable') {
            element.classList.add('disabled');
          } else {
            element.classList.remove('disabled');
          }
          element.classList.remove('loading');
          (0,_functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_6__["default"])(element);
        }
        setDisabled(data.disabled_blocks);
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: data === null || data === void 0 ? void 0 : data.msg,
            success: success
          }]);
        });
      } else {
        element.classList.remove('loading');
        console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error has occurred', 'block-manager'));
      }
    })["catch"](function (error) {
      element.classList.remove('loading');
      console.warn(error);
    });
  }

  /**
   * Reset blocks to default state.
   */
  function resetBlocks() {
    var _resetButtonRef$curre;
    resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre = resetButtonRef.current) === null || _resetButtonRef$curre === void 0 || _resetButtonRef$curre.classList.add('spin'); // Loading state.

    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/blocks_reset/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      var _res$data2 = res.data,
        data = _res$data2 === void 0 ? {} : _res$data2;
      var items = document.querySelectorAll('.gbm-block-list .item.disabled:not(.filtered)');
      if (items) {
        items.forEach(function (item) {
          item.classList.remove('disabled');
        });
      }
      setDisabled([]);
      setNotifications(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: Date.now(),
          msg: data === null || data === void 0 ? void 0 : data.msg,
          success: true
        }]);
      });
      setTimeout(function () {
        var _resetButtonRef$curre2;
        resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre2 = resetButtonRef.current) === null || _resetButtonRef$curre2 === void 0 || _resetButtonRef$curre2.classList.remove('spin');
      }, 250);
    })["catch"](function (error) {
      var _resetButtonRef$curre3;
      console.warn(error);
      resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre3 = resetButtonRef.current) === null || _resetButtonRef$curre3 === void 0 || _resetButtonRef$curre3.classList.remove('spin');
    });
  }

  /**
   * Handle search.
   *
   * @param {string} term The search term.
   */
  function searchHandler(term) {
    var count = 0;
    var groups = document.querySelectorAll('.gbm-block-group');
    if (!(groups !== null && groups !== void 0 && groups.length)) {
      return;
    }
    if (term !== '') {
      _toConsumableArray(groups).forEach(function (group) {
        var total = 0;
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block, index) {
          var str = block.dataset.title.toLowerCase();
          var found = str.search(term.toLowerCase());

          // Show/hide blocks.
          if (found !== -1) {
            block.removeAttribute('style');
            total++;
            count++;
          } else {
            block.style.display = 'none';
          }

          // Show/hide entire group if no results.
          if (theBlocks.length === index + 1) {
            if (total === 0) {
              group.style.display = 'none';
            } else {
              group.removeAttribute('style');
            }
          }
        });
      });
      setSearch({
        term: term,
        results: count
      });
    } else {
      setSearch({
        term: '',
        results: 0
      });
      document.querySelector('#gbm-search').value = '';
      _toConsumableArray(groups).forEach(function (group) {
        group.removeAttribute('style');
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block) {
          block.removeAttribute('style');
        });
      });
    }
  }

  /**
   * Mutate Blocks on load into categories and display block variations.
   *
   * @since 1.0
   */
  function organizeBlocks() {
    if (!(wpBlocks !== null && wpBlocks !== void 0 && wpBlocks.length) || !(wpCategories !== null && wpCategories !== void 0 && wpCategories.length)) {
      return false;
    }

    // Loop block categories to build return data with category as parent.
    var data = wpCategories.map(function (category) {
      return {
        info: category,
        // Group blocks into categories.
        blocks: wpBlocks.filter(function (block) {
          return block.category === category.slug;
        })
      };
    });
    setBlocks(data); // Set blocks state.
  }

  // On Load
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    organizeBlocks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_9__["default"], {
    callback: setLoading
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "gbm-block-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-header--title"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blocks', 'block-manager')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove unwanted blocks from the block inserter.', 'block-manager'))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-options"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Reset__WEBPACK_IMPORTED_MODULE_11__["default"], {
    ref: resetButtonRef,
    callback: resetBlocks,
    total: disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.length,
    msg: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset and activate all currently disabled blocks?', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear all disabled blocks', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Export__WEBPACK_IMPORTED_MODULE_7__["default"], {
    ref: exportButtonRef,
    callback: function callback() {
      return (0,_functions_export__WEBPACK_IMPORTED_MODULE_5__.exportHook)(exportModalRef === null || exportModalRef === void 0 ? void 0 : exportModalRef.current, 'blocks');
    },
    total: disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.length,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export an array of disabled blocks as a WordPress hook', 'block-manager')
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_15__["default"], {
    blocks: blocks,
    active: (wpBlocks === null || wpBlocks === void 0 ? void 0 : wpBlocks.length) - disabledCount - filteredCount,
    disabled: disabledCount,
    filtered: filteredCount,
    search: searchHandler
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks"
  }, /*#__PURE__*/React.createElement(_Global_Search__WEBPACK_IMPORTED_MODULE_16__["default"], {
    callback: searchHandler
  }), /*#__PURE__*/React.createElement(_Global_SearchResults__WEBPACK_IMPORTED_MODULE_12__["default"], {
    data: search,
    callback: function callback() {
      return searchHandler('');
    },
    className: "blocks-render"
  }), !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (category) {
    var _category$blocks;
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: category.info.slug
    }, !!(category !== null && category !== void 0 && (_category$blocks = category.blocks) !== null && _category$blocks !== void 0 && _category$blocks.length) && /*#__PURE__*/React.createElement(_components_Category__WEBPACK_IMPORTED_MODULE_14__["default"], {
      data: category,
      toggleBlock: toggleBlock,
      disabledBlocks: disabledBlocks,
      filteredBlocks: filteredBlocks,
      callback: function callback(e) {
        return (0,_functions_bulkProcess__WEBPACK_IMPORTED_MODULE_4__["default"])(e === null || e === void 0 ? void 0 : e.currentTarget, 'blocks', setDisabled, _functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_6__["default"], setNotifications);
      },
      onInfoClick: setInfoPanelBlock
    }));
  })))), /*#__PURE__*/React.createElement(_Global_SlidePanel__WEBPACK_IMPORTED_MODULE_13__["default"], {
    block: infoPanelBlock,
    open: !!infoPanelBlock,
    onClose: function onClose() {
      return setInfoPanelBlock(null);
    },
    isDisabled: infoPanelBlock && (disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.indexOf(infoPanelBlock.name)) !== -1,
    isFiltered: infoPanelBlock && (filteredBlocks === null || filteredBlocks === void 0 ? void 0 : filteredBlocks.indexOf(infoPanelBlock.name)) !== -1
  }), /*#__PURE__*/React.createElement(_Global_ExportModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
    ref: exportModalRef,
    returnButtonRef: exportButtonRef,
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the the following code to your functions.php to remove blocks at the theme level.', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_10__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ },

/***/ "./src/js/components/Blocks/components/Block.js"
/*!******************************************************!*\
  !*** ./src/js/components/Blocks/components/Block.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Global/DisabledSVG */ "./src/js/components/Global/DisabledSVG.js");






/**
 * Render a Block component to display an individual block.
 *
 * @param {Object}   props                The component props.
 * @param {Object}   props.data           Array of WP blocks.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Function} props.onInfoClick    Function to handle info click.
 * @return {Element}                      The Block component.
 */
function Block(_ref) {
  var data = _ref.data,
    disabledBlocks = _ref.disabledBlocks,
    filteredBlocks = _ref.filteredBlocks,
    toggleBlock = _ref.toggleBlock,
    onInfoClick = _ref.onInfoClick;
  var icon = data.icon,
    name = data.name,
    title = data.title,
    description = data.description,
    category = data.category,
    _data$variation = data.variation,
    variation = _data$variation === void 0 ? '' : _data$variation,
    prefix = data.prefix;
  var blockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var disabled = (disabledBlocks === null || disabledBlocks === void 0 ? void 0 : disabledBlocks.indexOf(name)) !== -1;
  var disabledClass = disabled ? 'disabled' : '';
  var filtered = (filteredBlocks === null || filteredBlocks === void 0 ? void 0 : filteredBlocks.indexOf(name)) !== -1;
  var filteredClass = filtered ? 'filtered' : '';
  var active = !disabled && !filtered;

  /**
   * Handle the click event for the block button.
   */
  function click() {
    var target = blockRef === null || blockRef === void 0 ? void 0 : blockRef.current;
    if (target) {
      var _target$dataset = target.dataset,
        id = _target$dataset.id,
        blockTitle = _target$dataset.title;
      if (!target.classList.contains('filtered')) {
        toggleBlock(target, id, blockTitle);
        target.blur();
      } else {
        // eslint-disable-next-line no-alert
        alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("This block has been disabled via the 'gbm_disabled_blocks' hook and cannot be activated using the Block Manager interface.", 'block-manager'));
        target.blur();
      }
    }
  }
  var intro = variation ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
  // translators: Parent block slug.
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s Variation:', 'block-manager'), prefix) : "".concat(title, ":");
  return /*#__PURE__*/React.createElement("button", {
    ref: blockRef,
    tabIndex: filtered ? -1 : null,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Toggle Block Activation', 'block-manager'),
    "data-title": title,
    "data-description": description,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('item block-button', disabledClass, filteredClass, variation ? 'is-variation' : null),
    "data-id": name,
    "data-category": category,
    onClick: function onClick(e) {
      return click(e);
    }
  }, active ? /*#__PURE__*/React.createElement("div", {
    className: "item-state"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
  }))) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockIcon, {
    icon: icon
  }), !!title && /*#__PURE__*/React.createElement("p", {
    className: "block-title"
  }, !!prefix && /*#__PURE__*/React.createElement("em", {
    className: "block-title--prefix"
  }, prefix, "/"), title)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: disabled ? disabledClass : filteredClass
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      if (onInfoClick) {
        onInfoClick(data);
      }
    }
  }, "View Details"));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ },

/***/ "./src/js/components/Blocks/components/Category.js"
/*!*********************************************************!*\
  !*** ./src/js/components/Blocks/components/Category.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Block */ "./src/js/components/Blocks/components/Block.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




/**
 * Render the Category component for the category listing.
 *
 * @param {Object}   props                The component properties.
 * @param {Object}   props.data           Data for an individual block.
 * @param {Function} props.toggleBlock    Function to toggle the activation of a block.
 * @param {Array}    props.disabledBlocks Array of disabled blocks.
 * @param {Array}    props.filteredBlocks Array of filtered blocks.
 * @param {Function} props.callback       Function to call after category change.
 * @return {Element}                      The Category component.
 */
function Category(_ref) {
  var _blocks$filter;
  var data = _ref.data,
    toggleBlock = _ref.toggleBlock,
    _ref$disabledBlocks = _ref.disabledBlocks,
    disabledBlocks = _ref$disabledBlocks === void 0 ? [] : _ref$disabledBlocks,
    _ref$filteredBlocks = _ref.filteredBlocks,
    filteredBlocks = _ref$filteredBlocks === void 0 ? [] : _ref$filteredBlocks,
    callback = _ref.callback,
    onInfoClick = _ref.onInfoClick;
  var _data$blocks = data.blocks,
    blocks = _data$blocks === void 0 ? [] : _data$blocks,
    info = data.info;
  var title = info.title;

  // Get total blocks in category, include variations if displayed.
  var total = blocks === null || blocks === void 0 ? void 0 : blocks.length;

  // Combine disabled and filtered blocks.
  var disabled = [].concat(_toConsumableArray(disabledBlocks), _toConsumableArray(filteredBlocks));

  // Count disabled blocks.
  // Loop all blocks in the category and find match.
  var count = (disabled === null || disabled === void 0 ? void 0 : disabled.length) && ((_blocks$filter = blocks.filter(function (block) {
    return disabled.includes(block === null || block === void 0 ? void 0 : block.name);
  })) === null || _blocks$filter === void 0 ? void 0 : _blocks$filter.length);

  // Set toggle button attributes
  var switchClass = count === total ? 'gbm-block-switch disabled' : 'gbm-block-switch';
  var state = count === total ? 'inactive' : 'active';
  return /*#__PURE__*/React.createElement("div", {
    key: info === null || info === void 0 ? void 0 : info.slug,
    id: "block-".concat(info === null || info === void 0 ? void 0 : info.slug),
    className: "gbm-block-group",
    "data-total-blocks": total,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-heading"
  }, /*#__PURE__*/React.createElement("h3", null, title, /*#__PURE__*/React.createElement("span", null, "[", total - count, "/", total, "]")), /*#__PURE__*/React.createElement("button", {
    className: switchClass,
    "data-state": state,
    onClick: callback,
    "aria-label": state === 'inactive' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable all blocks in this category', 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable all blocks in this category', 'block-manager'),
    title: state === 'inactive' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable all blocks in this category', 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable all blocks in this category', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-switch--inner"
  }, /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list"
  }, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (block, index) {
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: "".concat(index, "-").concat(block === null || block === void 0 ? void 0 : block.name)
    }, /*#__PURE__*/React.createElement(_Block__WEBPACK_IMPORTED_MODULE_2__["default"], {
      data: block,
      toggleBlock: toggleBlock,
      disabledBlocks: disabledBlocks,
      filteredBlocks: filteredBlocks,
      onInfoClick: onInfoClick
    }));
  })));
}

/***/ },

/***/ "./src/js/components/Blocks/components/Sidebar.js"
/*!********************************************************!*\
  !*** ./src/js/components/Blocks/components/Sidebar.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_scrollToElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions/scrollToElement */ "./src/js/functions/scrollToElement.js");
/* harmony import */ var _Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/DisabledSVG */ "./src/js/components/Global/DisabledSVG.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Global/Search */ "./src/js/components/Global/Search.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object}   props          The component props.
 * @param {Array}    props.blocks   Array of WP Blocks.
 * @param {number}   props.active   Total number of active blocks.
 * @param {number}   props.disabled Total number of disabled blocks.
 * @param {number}   props.filtered Total number of filtered blocks.
 * @param {Function} props.search   The search handler function.
 * @return {Element}                The Sidebar component.
 */
function Sidebar(_ref) {
  var blocks = _ref.blocks,
    active = _ref.active,
    disabled = _ref.disabled,
    filtered = _ref.filtered,
    search = _ref.search;
  var activeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var disabledRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var mountedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(active),
    _useState2 = _slicedToArray(_useState, 2),
    activeTotal = _useState2[0],
    setActiveTotal = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(disabled),
    _useState4 = _slicedToArray(_useState3, 2),
    disabledTotal = _useState4[0],
    setDisabledTotal = _useState4[1];

  /**
   * Block total update animation.
   *
   * @param {Element}  ref      The ref element.
   * @param {number}   value    The current value.
   * @param {Function} callback The callback function.
   */
  function change(ref, value, callback) {
    var _ref$dataset, _ref$classList;
    if (!(mountedRef !== null && mountedRef !== void 0 && mountedRef.current) || !ref) {
      return;
    }
    var prev = ref === null || ref === void 0 || (_ref$dataset = ref.dataset) === null || _ref$dataset === void 0 ? void 0 : _ref$dataset.prev;
    var direction = parseInt(prev) > value ? 'up' : 'down';
    ref === null || ref === void 0 || (_ref$classList = ref.classList) === null || _ref$classList === void 0 || _ref$classList.add("slide-".concat(direction));
    setTimeout(function () {
      var _ref$classList2, _ref$classList3;
      callback(value);
      ref === null || ref === void 0 || (_ref$classList2 = ref.classList) === null || _ref$classList2 === void 0 || _ref$classList2.add("slide-".concat(direction, "-done"));
      ref === null || ref === void 0 || (_ref$classList3 = ref.classList) === null || _ref$classList3 === void 0 || _ref$classList3.remove("slide-".concat(direction));
      setTimeout(function () {
        var _ref$classList4;
        ref === null || ref === void 0 || (_ref$classList4 = ref.classList) === null || _ref$classList4 === void 0 || _ref$classList4.remove("slide-".concat(direction, "-done"));
      }, 75);
    }, 200);
  }

  // Update the active blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    change(activeRef.current, active, setActiveTotal);
  }, [active]);

  // Update the disabled blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      change(disabledRef.current, disabled, setDisabledTotal);
    }, 125);
  }, [disabled]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      mountedRef.current = true;
    }, 500);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-cta-block-legend",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current Block Status', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--total",
    title: "".concat(activeTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active Blocks & Block Variations', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: activeRef,
    "data-prev": activeTotal
  }, activeTotal))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--disabled",
    title: disabledTotal === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled Block', 'block-manager')) : "".concat(disabledTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: disabledRef,
    "data-prev": disabledTotal
  }, disabledTotal)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled', 'block-manager')), !!filtered && /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--filtered",
    title: filtered === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Block', 'block-manager')) : "".concat(filtered, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, filtered)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered', 'block-manager')))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Categories', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (category) {
    var _category$info, _category$blocks, _category$info3;
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: category === null || category === void 0 || (_category$info = category.info) === null || _category$info === void 0 ? void 0 : _category$info.slug
    }, !!(category !== null && category !== void 0 && (_category$blocks = category.blocks) !== null && _category$blocks !== void 0 && _category$blocks.length) && /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "gbm-toc",
      onClick: function onClick() {
        var _category$info2;
        return (0,_functions_scrollToElement__WEBPACK_IMPORTED_MODULE_2__["default"])("block-".concat(category === null || category === void 0 || (_category$info2 = category.info) === null || _category$info2 === void 0 ? void 0 : _category$info2.slug));
      }
    }, category === null || category === void 0 || (_category$info3 = category.info) === null || _category$info3 === void 0 ? void 0 : _category$info3.title));
  }))));
}

/***/ },

/***/ "./src/js/components/Categories/Categories.js"
/*!****************************************************!*\
  !*** ./src/js/components/Categories/Categories.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Categories)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _functions_export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions/export */ "./src/js/functions/export.js");
/* harmony import */ var _functions_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../functions/helpers */ "./src/js/functions/helpers.js");
/* harmony import */ var _Global_Export__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Global/Export */ "./src/js/components/Global/Export.js");
/* harmony import */ var _Global_ExportModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Global/ExportModal */ "./src/js/components/Global/ExportModal.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
/* harmony import */ var _Global_Reset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Global/Reset */ "./src/js/components/Global/Reset.js");
/* harmony import */ var _Global_SearchResults__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Global/SearchResults */ "./src/js/components/Global/SearchResults.js");
/* harmony import */ var _components_Block__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Block */ "./src/js/components/Categories/components/Block.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/Categories/components/Sidebar.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Global/Search */ "./src/js/components/Global/Search.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }















/**
 * Render the Categories component.
 *
 * @param {Object} props              The component properties.
 * @param {Array}  props.wpBlocks     Array of WP blocks.
 * @param {Array}  props.wpCategories Array of WP block categories
 * @return {Element}                  The Categories component.
 */
function Categories(_ref) {
  var wpBlocks = _ref.wpBlocks,
    wpCategories = _ref.wpCategories;
  var _gbm_localize = gbm_localize,
    _gbm_localize$blockCa = _gbm_localize.blockCategories,
    block_cats = _gbm_localize$blockCa === void 0 ? [] : _gbm_localize$blockCa,
    _gbm_localize$filtere = _gbm_localize.filteredCategories,
    filtered_cats = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere,
    _gbm_localize$disable = _gbm_localize.disabledBlocksAll,
    disabled_blocks = _gbm_localize$disable === void 0 ? [] : _gbm_localize$disable;
  var resetButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var exportModalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      term: '',
      results: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    notifications = _useState6[0],
    setNotifications = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(wpCategories),
    _useState8 = _slicedToArray(_useState7, 1),
    categories = _useState8[0];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(wpBlocks),
    _useState0 = _slicedToArray(_useState9, 1),
    blocks = _useState0[0];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(block_cats),
    _useState10 = _slicedToArray(_useState1, 2),
    blockCategories = _useState10[0],
    setBlockCategories = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(filtered_cats),
    _useState12 = _slicedToArray(_useState11, 1),
    filteredCategories = _useState12[0];

  // Create array containing only active block names.
  var block_names = blocks.map(function (i) {
    return i.name;
  });

  /**
   * Change the block category.
   *
   * @param {string}      block  The block ID.
   * @param {string}      title  The block title.
   * @param {HTMLElement} target The select HTML element.
   * @since 1.0
   */
  function updateCategory(block, title, target) {
    var category = target.value;
    var original = target.dataset.original;
    var type = category === original ? 'remove' : 'add';

    // Send API request.
    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/category_update/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        type: type,
        block: block,
        title: title,
        category: category
      }
    }).then(function (res) {
      var data = res.data,
        status = res.status;
      if (data && status === 200 && data !== null && data !== void 0 && data.categories) {
        // Success: update state for categories and blocks.
        setBlockCategories(_toConsumableArray(data === null || data === void 0 ? void 0 : data.categories));
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: data === null || data === void 0 ? void 0 : data.msg,
            success: true
          }]);
        });
      } else {
        console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An unknown error has occurred and the block category could not be updated', 'block-manager'));
      }
    })["catch"](function (error) {
      console.warn(error);
    });
  }

  /**
   * Reset categories to default.
   */
  function resetCategories() {
    var _resetButtonRef$curre;
    resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre = resetButtonRef.current) === null || _resetButtonRef$curre === void 0 || _resetButtonRef$curre.classList.add('spin'); // Loading state.
    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/category_reset/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function () {
      var _window;
      (_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 || _window.reload();
    })["catch"](function (error) {
      var _resetButtonRef$curre2;
      console.warn(error);
      resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre2 = resetButtonRef.current) === null || _resetButtonRef$curre2 === void 0 || _resetButtonRef$curre2.classList.remove('spin');
    });
  }

  /**
   * Handle search.
   *
   * @param {string} term The search term.
   */
  function searchHandler(term) {
    var theBlocks = document.querySelectorAll('.gbm-blocks .gbm-block-list .item');
    if (term !== '') {
      var count = 0;
      _toConsumableArray(theBlocks).forEach(function (block) {
        var str = block.dataset.title.toLowerCase();
        var found = str.search(term.toLowerCase());
        if (found !== -1) {
          block.removeAttribute('style');
          count++;
        } else {
          block.style.display = 'none';
        }
      });
      setSearch({
        term: term,
        results: count
      });
    } else {
      setSearch({
        term: term,
        results: false
      });
      _toConsumableArray(theBlocks).forEach(function (block) {
        block.removeAttribute('style');
      });
    }
  }

  /**
   * Clear the block search.
   */
  function clearSearch() {
    searchHandler('');
    setSearch({
      term: '',
      results: false
    });
    var input = document.querySelector('#gbm-search');
    if (input) {
      input.value = '';
    }
  }

  // On Load
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Export settings.
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        closeExport();
      }
    }, false);
    return function () {};
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    callback: setLoading
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "gbm-block-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-header--title"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Categories', 'block-manager')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Organize the block inserter by modifying the category of each block.', 'block-manager'))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-options"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Reset__WEBPACK_IMPORTED_MODULE_9__["default"], {
    ref: resetButtonRef,
    callback: resetCategories,
    total: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    msg: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset the modified block categories?', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear all modified block categories', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Export__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ref: exportButtonRef,
    callback: function callback() {
      return (0,_functions_export__WEBPACK_IMPORTED_MODULE_3__.exportHook)(exportModalRef === null || exportModalRef === void 0 ? void 0 : exportModalRef.current, 'categories');
    },
    total: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export an array of updated blocks categories as a WordPress hook', 'block-manager')
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper categories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_12__["default"], {
    total: blocks === null || blocks === void 0 ? void 0 : blocks.length,
    updated: blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.length,
    filtered: filteredCategories === null || filteredCategories === void 0 ? void 0 : filteredCategories.length,
    updatedBlocksOffset: (0,_functions_helpers__WEBPACK_IMPORTED_MODULE_4__.categoryOffsetCount)(blockCategories, disabled_blocks, block_names),
    filteredBlocksOffset: (0,_functions_helpers__WEBPACK_IMPORTED_MODULE_4__.categoryOffsetCount)(filteredCategories, disabled_blocks, block_names)
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks"
  }, /*#__PURE__*/React.createElement(_Global_Search__WEBPACK_IMPORTED_MODULE_13__["default"], {
    callback: searchHandler
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-group"
  }, /*#__PURE__*/React.createElement(_Global_SearchResults__WEBPACK_IMPORTED_MODULE_10__["default"], {
    data: search,
    callback: clearSearch
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list categories"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, !!(blocks !== null && blocks !== void 0 && blocks.length) && blocks.map(function (block) {
    return /*#__PURE__*/React.createElement(_components_Block__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: "".concat(block === null || block === void 0 ? void 0 : block.name, "-").concat(block === null || block === void 0 ? void 0 : block.category),
      callback: updateCategory,
      categories: categories,
      data: block,
      filteredCategories: filteredCategories,
      blockCategories: blockCategories
    });
  }))))))), /*#__PURE__*/React.createElement(_Global_ExportModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: exportModalRef,
    returnButtonRef: exportButtonRef,
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the the following code to your functions.php to update block categories at the theme level.', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_8__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ },

/***/ "./src/js/components/Categories/components/Block.js"
/*!**********************************************************!*\
  !*** ./src/js/components/Categories/components/Block.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/**
 * Render the Block component for a category listing.
 *
 * @param {Object}   props                    The component properties.
 * @param {Object}   props.data               Data for an individual block.
 * @param {Array}    props.categories         Array of block categories.
 * @param {Function} props.callback           Function to call after category change.
 * @param {Array}    props.filteredCategories Array of filtered cateogries.
 * @param {Array}    props.blockCategories    Array of updated cateogries.
 * @return {Element}                          The Block component.
 */
function Block(_ref) {
  var data = _ref.data,
    categories = _ref.categories,
    callback = _ref.callback,
    filteredCategories = _ref.filteredCategories,
    blockCategories = _ref.blockCategories;
  var selectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var name = data.name,
    icon = data.icon,
    title = data.title,
    category = data.category,
    orginalCategory = data.orginalCategory;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(category),
    _useState2 = _slicedToArray(_useState, 2),
    activeCategory = _useState2[0],
    setActiveCategory = _useState2[1];

  // Is this block category filtered?
  var filtered = filteredCategories === null || filteredCategories === void 0 ? void 0 : filteredCategories.find(function (cat) {
    return cat.block === name;
  });

  // Is this block category updated?
  var updated = blockCategories === null || blockCategories === void 0 ? void 0 : blockCategories.find(function (cat) {
    return cat.block === name;
  });
  function handler() {
    var _selectRef$current;
    callback(name, title, selectRef === null || selectRef === void 0 ? void 0 : selectRef.current);
    setActiveCategory(selectRef === null || selectRef === void 0 || (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.value);
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-title": title,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('item', 'gbm-category', updated ? 'updated' : null, filtered ? 'filtered' : null),
    "data-id": name
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-category-wrap"
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockIcon, {
    icon: icon
  }), /*#__PURE__*/React.createElement("p", {
    title: title
  }, title, /*#__PURE__*/React.createElement("span", {
    title: name
  }, name))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-category-wrap category-switch"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "select-".concat(name),
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update block category', 'block-manager')), /*#__PURE__*/React.createElement("select", {
    defaultValue: category,
    onChange: function onChange() {
      return handler();
    },
    id: "select-".concat(name),
    "data-original": orginalCategory,
    disabled: filtered,
    ref: selectRef
  }, !!(categories !== null && categories !== void 0 && categories.length) && categories.map(function (cat, index) {
    return /*#__PURE__*/React.createElement("option", {
      key: "".concat(cat.slug, "-").concat(index),
      value: cat.slug
    }, cat.title, orginalCategory !== activeCategory && orginalCategory === cat.slug ? " - [".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default', 'block-manager'), "]") : null);
  }))));
}

/***/ },

/***/ "./src/js/components/Categories/components/Sidebar.js"
/*!************************************************************!*\
  !*** ./src/js/components/Categories/components/Sidebar.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Global/DisabledSVG */ "./src/js/components/Global/DisabledSVG.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/Search */ "./src/js/components/Global/Search.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/**
 * Render the Sidebar for Category Manager.
 *
 * @param {Object}   props                      The component properties.
 * @param {number}   props.total                Total blocks.
 * @param {number}   props.updated              Updated block categories.
 * @param {number}   props.filtered             Total number of filtered block categories.
 * @param {number}   props.updatedBlocksOffset  Total number of disabled blocks to offset the count.
 * @param {number}   props.filteredBlocksOffset Total number of filtered blocks to offset the count.
 * @return {Element}                            The Sidebar component.
 */
function Sidebar(_ref) {
  var total = _ref.total,
    updated = _ref.updated,
    filtered = _ref.filtered,
    updatedBlocksOffset = _ref.updatedBlocksOffset,
    filteredBlocksOffset = _ref.filteredBlocksOffset;
  var updatedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var mountedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(updated - updatedBlocksOffset),
    _useState2 = _slicedToArray(_useState, 2),
    updatedTotal = _useState2[0],
    setUpdatedTotal = _useState2[1];

  /**
   * Block total update animation.
   * @param {Element}  ref      The ref element.
   * @param {number}   value    The current value.
   * @param {Function} callback The callback function.
   */
  function change(ref, value, callback) {
    var _ref$dataset, _ref$classList;
    if (!(mountedRef !== null && mountedRef !== void 0 && mountedRef.current) || !ref) {
      return;
    }
    var prev = ref === null || ref === void 0 || (_ref$dataset = ref.dataset) === null || _ref$dataset === void 0 ? void 0 : _ref$dataset.prev;
    var direction = parseInt(prev) > value ? 'up' : 'down';
    ref === null || ref === void 0 || (_ref$classList = ref.classList) === null || _ref$classList === void 0 || _ref$classList.add("slide-".concat(direction));
    setTimeout(function () {
      var _ref$classList2, _ref$classList3;
      callback(value);
      ref === null || ref === void 0 || (_ref$classList2 = ref.classList) === null || _ref$classList2 === void 0 || _ref$classList2.add("slide-".concat(direction, "-done"));
      ref === null || ref === void 0 || (_ref$classList3 = ref.classList) === null || _ref$classList3 === void 0 || _ref$classList3.remove("slide-".concat(direction));
      setTimeout(function () {
        var _ref$classList4;
        ref === null || ref === void 0 || (_ref$classList4 = ref.classList) === null || _ref$classList4 === void 0 || _ref$classList4.remove("slide-".concat(direction, "-done"));
      }, 75);
    }, 200);
  }

  // Update the updated blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    change(updatedRef.current, updated - updatedBlocksOffset, setUpdatedTotal);
  }, [updated]); // eslint-disable-line react-hooks/exhaustive-deps

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      mountedRef.current = true;
    }, 500);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-cta-block-legend",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current Block Status', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--total",
    title: "".concat(total, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total Blocks', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, total))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Blocks', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--updated",
    title: updatedTotal === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated Block Category', 'block-manager')) : "".concat(updatedTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated Block Categories', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: updatedRef,
    "data-prev": updatedRef
  }, updatedTotal)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updated', 'block-manager')), !!filtered && /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--filtered",
    title: filtered === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Block Category', 'block-manager')) : "".concat(filtered, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Block Categories', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, filtered - filteredBlocksOffset)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered', 'block-manager')))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("What's This?", 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The Block Categories feature provides functionality to update block categories for all blocks in the editor.', 'block-manager')), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: '0px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This feature is useful for organizing blocks into categories that are more meaningful to you.', 'block-manager')))));
}

/***/ },

/***/ "./src/js/components/Global/DisabledSVG.js"
/*!*************************************************!*\
  !*** ./src/js/components/Global/DisabledSVG.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisabledSVG)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Render the DisabledSVG component.
 *
 * @param {Object} props           The component props.
 * @param {string} props.className Clasnames for component.
 * @return {Element}               The DisabledSVG component.
 */
function DisabledSVG(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/React.createElement("svg", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('disabled-svg', className && className)
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "100%",
    x2: "100%",
    y2: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%"
  }));
}

/***/ },

/***/ "./src/js/components/Global/Export.js"
/*!********************************************!*\
  !*** ./src/js/components/Global/Export.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Export blocks button.
 *
 * @return {Element} The Export component.
 */
var Export = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function Export(props, ref) {
  var callback = props.callback,
    _props$total = props.total,
    total = _props$total === void 0 ? 0 : _props$total,
    title = props.title;
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    onClick: function onClick() {
      return callback();
    },
    title: title,
    disabled: total < 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-database-export"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export', 'block-manager'));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Export);

/***/ },

/***/ "./src/js/components/Global/ExportModal.js"
/*!*************************************************!*\
  !*** ./src/js/components/Global/ExportModal.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_copyToClipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../functions/copyToClipboard */ "./src/js/functions/copyToClipboard.js");




/**
 * Render the ExportModal overlay.
 *
 * @return {Element} The ExportModal component.
 */
var ExportModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function ExportModal(props, ref) {
  var data = props.data,
    returnButtonRef = props.returnButtonRef,
    desc = props.desc;
  var copyButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var codeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  /**
   * Close modal.
   */
  function close() {
    ref.current.classList.remove('active');
    setTimeout(function () {
      if (returnButtonRef !== null && returnButtonRef !== void 0 && returnButtonRef.current) {
        // Move focus back to the previous element.
        returnButtonRef.current.focus({
          preventSrcoll: true
        });
      }
    }, 150);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Export settings.
    document.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        close();
      }
    }, false);
    return function () {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-export-modal",
    ref: ref,
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-export-modal--inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "button button-primary",
    onClick: function onClick() {
      return (0,_functions_copyToClipboard__WEBPACK_IMPORTED_MODULE_2__["default"])(codeRef.current, copyButtonRef.current);
    },
    ref: copyButtonRef
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy Code', 'block-manager')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "button",
    onClick: function onClick() {
      return close();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close', 'block-manager')))), /*#__PURE__*/React.createElement("code", {
    id: "gbm-export",
    contentEditable: "true",
    suppressContentEditableWarning: true,
    ref: codeRef
  }, data)));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExportModal);

/***/ },

/***/ "./src/js/components/Global/Loader.js"
/*!********************************************!*\
  !*** ./src/js/components/Global/Loader.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Loader component.
 *
 * @param {Object}   props          The component props.
 * @param {Function} props.callback The callback function.
 * @param {string}   props.message  Optional loading message.
 * @return {Element}                The Loader component.
 */
function Loader(_ref) {
  var callback = _ref.callback,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching Blocks…', 'block-manager') : _ref$message;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      callback();
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader-pulse-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-loader-pulse"
  })), /*#__PURE__*/React.createElement("div", null, message)));
}

/***/ },

/***/ "./src/js/components/Global/Notifications.js"
/*!***************************************************!*\
  !*** ./src/js/components/Global/Notifications.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notifications)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Notifications component.
 *
 * @param {Object}   props                  The component properties.
 * @param {Array}    props.notifications    The list of notifications to display.
 * @param {Function} props.setNotifications The callback function to remove a notification.
 * @return {Element}                        The Notifications component.
 */
function Notifications(_ref) {
  var notifications = _ref.notifications,
    setNotifications = _ref.setNotifications;
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-notification-list",
    "aria-live": "assertive"
  }, !!(notifications !== null && notifications !== void 0 && notifications.length) && notifications.map(function (item) {
    return /*#__PURE__*/React.createElement(Notification, {
      key: "notification-".concat(item.id),
      id: item.id,
      msg: item === null || item === void 0 ? void 0 : item.msg,
      success: item === null || item === void 0 ? void 0 : item.success,
      callback: setNotifications
    });
  }));
}

/**
 * Render an individual Notification display.
 *
 * @param {Object}   props          The component properties.
 * @param {string}   props.id       Notification ID.
 * @param {string}   props.msg      Message to display.
 * @param {boolean}  props.success  Type of message.
 * @param {Function} props.callback Function to call after message is displayed.
 * @return {Element}                The Notification component.
 */
function Notification(_ref2) {
  var id = _ref2.id,
    _ref2$msg = _ref2.msg,
    msg = _ref2$msg === void 0 ? '' : _ref2$msg,
    _ref2$success = _ref2.success,
    success = _ref2$success === void 0 ? true : _ref2$success,
    callback = _ref2.callback;
  var ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Use timeouts to display and then remove the notification.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _ref$current;
    ref === null || ref === void 0 || (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.classList.add('active');
    if (msg) {
      setTimeout(function () {
        var _ref$current2;
        ref === null || ref === void 0 || (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || _ref$current2.classList.add('out');
        setTimeout(function () {
          // Add an extra long delay before deleting the notification.
          removeNotification(id, callback);
        }, 1000);
      }, 3000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--".concat(success ? 'success' : 'error')),
    role: "alert",
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-".concat(success ? 'yes-alt' : 'no')
  }), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: msg
    }
  })));
}

/**
 * Remove a notification.
 *
 * @param {string}   id       The notification ID.
 * @param {Function} callback Function to call after updating state.
 */
function removeNotification(id, callback) {
  callback(function (prev) {
    return prev.filter(function (notification) {
      return notification.id !== id;
    });
  });
}

/* eslint-disable no-unused-vars */
function TestNotifications() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--success", 'active'),
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-yes-alt"
  }), /*#__PURE__*/React.createElement("span", null, "Block Activated")), /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-notification', "gbm-notification--error", 'active'),
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-no"
  }), /*#__PURE__*/React.createElement("span", null, "Error Accessing API")));
}
/* eslint-enable no-unused-vars */

/***/ },

/***/ "./src/js/components/Global/Reset.js"
/*!*******************************************!*\
  !*** ./src/js/components/Global/Reset.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the Reset blocks button.
 *
 * @return {Element} The Reset component.
 */
var Reset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function Reset(props, ref) {
  var callback = props.callback,
    _props$total = props.total,
    total = _props$total === void 0 ? 0 : _props$total,
    msg = props.msg,
    title = props.title;

  /**
   * Confirm user wants to clear disabled blocks.
   */
  function confirm() {
    var _window;
    if (// eslint-disable-next-line no-alert
    (_window = window) !== null && _window !== void 0 && _window.confirm(msg)) {
      callback();
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    onClick: function onClick() {
      return confirm();
    },
    title: title,
    disabled: total < 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-update-alt"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset', 'block-manager'));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Reset);

/***/ },

/***/ "./src/js/components/Global/Search.js"
/*!********************************************!*\
  !*** ./src/js/components/Global/Search.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the block Search component.
 *
 * @param {Object}   props             The component properties.
 * @param {Function} props.callback    The callback function to dispatch.
 * @param {string}   props.placeholder The placeholder text for input.
 * @return {Element}                   The Search component.
 */
function Search(_ref) {
  var callback = _ref.callback,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Blocks', 'block-manager') : _ref$placeholder;
  var inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Watch for the '/' key to focus the search input.
    window.addEventListener('keyup', function (e) {
      var key = e.key;
      if (key === '/') {
        var _inputRef$current;
        inputRef === null || inputRef === void 0 || (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus({
          preventScroll: true
        });
      }
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-searchbox"
  }, /*#__PURE__*/React.createElement("label", {
    className: "offscreen",
    htmlFor: "gbm-search"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Blocks', 'block-manager')), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "gbm-search",
    placeholder: placeholder,
    onKeyUp: function onKeyUp() {
      var _inputRef$current2;
      return callback(inputRef === null || inputRef === void 0 || (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.value);
    },
    ref: inputRef
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _inputRef$current3;
      return callback(inputRef === null || inputRef === void 0 || (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.value);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "offscreen"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Submit', 'block-manager')), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
  }))));
}

/***/ },

/***/ "./src/js/components/Global/SearchResults.js"
/*!***************************************************!*\
  !*** ./src/js/components/Global/SearchResults.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchResults)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Render the SearchResults component.
 *
 * @param {Object}   props           The component properties.
 * @param {Object}   props.data      The search data.
 * @param {Function} props.callback  Trigger the reset search function.
 * @param {string}   props.className Optional div classname.
 * @return {Element}                 The SearchResults component.
 */
function SearchResults(_ref) {
  var data = _ref.data,
    callback = _ref.callback,
    className = _ref.className;
  return /*#__PURE__*/React.createElement(React.Fragment, null, !!(data !== null && data !== void 0 && data.term) && /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('gbm-search-results', className && className)
  }, (data === null || data === void 0 ? void 0 : data.results) > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      // translators: 1: The search term. 2: Total results.
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your block search for %1$s returned %2$s result(s)', 'block-manager'), "<strong>".concat(data === null || data === void 0 ? void 0 : data.term, "</strong>"), "<strong>".concat(data === null || data === void 0 ? void 0 : data.results, "</strong>"))
    }
  }), /*#__PURE__*/React.createElement("span", null, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: callback
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear Search', 'block-manager'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "gbm-no-results",
    dangerouslySetInnerHTML: {
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(
      // translators: The search term
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No blocks found for %s', 'block-manager'), "<strong>".concat(data === null || data === void 0 ? void 0 : data.term, "</strong>"))
    }
  }), /*#__PURE__*/React.createElement("span", null, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: callback
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear Search', 'block-manager')))));
}

/***/ },

/***/ "./src/js/components/Global/SlidePanel.js"
/*!************************************************!*\
  !*** ./src/js/components/Global/SlidePanel.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlidePanel)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _BlockFinder_components_ResultItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BlockFinder/components/ResultItem */ "./src/js/components/BlockFinder/components/ResultItem.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






/**
 * Render a slide panel with block details and finder results.
 *
 * @param {Object}   props            The component props.
 * @param {Object}   props.block      The block data to display.
 * @param {boolean}  props.open       Whether the panel is open.
 * @param {Function} props.onClose    Callback to close the panel.
 * @param {boolean}  props.isDisabled Whether the block is disabled.
 * @param {boolean}  props.isFiltered Whether the block is filtered.
 * @return {Element}                  The SlidePanel component.
 */
function SlidePanel(_ref) {
  var _gbm_localize;
  var block = _ref.block,
    open = _ref.open,
    onClose = _ref.onClose,
    isDisabled = _ref.isDisabled,
    isFiltered = _ref.isFiltered;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    results = _useState2[0],
    setResults = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    total = _useState4[0],
    setTotal = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    page = _useState6[0],
    setPage = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(20),
    _useState8 = _slicedToArray(_useState7, 2),
    perPage = _useState8[0],
    setPerPage = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    searching = _useState0[0],
    setSearching = _useState0[1];
  var postTypes = ((_gbm_localize = gbm_localize) === null || _gbm_localize === void 0 ? void 0 : _gbm_localize.postTypes) || [];

  /**
   * Get the label for a post type.
   *
   * @param {string} type The post type name.
   * @return {string}     The post type label.
   */
  function getPostTypeLabel(type) {
    var found = postTypes.find(function (pt) {
      return pt.name === type;
    });
    return found ? found.label : type;
  }

  /**
   * Search for posts containing this block.
   *
   * @param {string} blockName The block name.
   * @param {number} pageNum   The page number.
   */
  function findBlock(blockName) {
    var pageNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    setSearching(true);
    (0,axios__WEBPACK_IMPORTED_MODULE_3__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/block_finder/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        block: blockName,
        page: pageNum
      }
    }).then(function (res) {
      var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data;
      if (data !== null && data !== void 0 && data.success) {
        if (pageNum === 1) {
          setResults(data.posts);
        } else {
          setResults(function (prev) {
            return [].concat(_toConsumableArray(prev), _toConsumableArray(data.posts));
          });
        }
        setTotal(data.total);
        setPage(pageNum);
        setPerPage(data.per_page);
      }
      setSearching(false);
    })["catch"](function (error) {
      console.warn(error);
      setSearching(false);
    });
  }

  /**
   * Load more results.
   */
  function loadMore() {
    if (block) {
      findBlock(block.name, page + 1);
    }
  }

  // Auto-search when panel opens with a new block.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (open && block) {
      setResults([]);
      setTotal(0);
      setPage(1);
      findBlock(block.name, 1);
    }
  }, [open, block === null || block === void 0 ? void 0 : block.name]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle Escape key.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent body scroll when open.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return function () {
      document.body.style.overflow = '';
    };
  }, [open]);
  if (!block) {
    return null;
  }
  var hasMore = results.length < total;

  // Determine status label.
  var status = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'block-manager');
  var statusClass = 'active';
  if (isFiltered) {
    status = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filtered', 'block-manager');
    statusClass = 'filtered';
  } else if (isDisabled) {
    status = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Disabled', 'block-manager');
    statusClass = 'disabled';
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel-overlay".concat(open ? ' active' : ''),
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel".concat(open ? ' active' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--header"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Block Details', 'block-manager')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gbm-slide-panel--close",
    onClick: onClose,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close panel', 'block-manager')
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "20",
    height: "20"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--block-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--block-icon"
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockIcon, {
    icon: block.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--block-meta"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "gbm-slide-panel--block-title"
  }, block.title), /*#__PURE__*/React.createElement("code", {
    className: "gbm-slide-panel--block-name"
  }, block.name))), !!block.description && /*#__PURE__*/React.createElement("p", {
    className: "gbm-slide-panel--block-desc"
  }, block.description), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Category', 'block-manager')), /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-value"
  }, block.category)), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Status', 'block-manager')), /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-status gbm-slide-panel--detail-status--".concat(statusClass)
  }, status)), !!block.variation && /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Variation of', 'block-manager')), /*#__PURE__*/React.createElement("span", {
    className: "gbm-slide-panel--detail-value"
  }, block.variation))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--finder"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Block Finder', 'block-manager')), searching && results.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "gbm-slide-panel--finder-searching"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Searching for posts\u2026", 'block-manager')), !searching && results.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "gbm-slide-panel--finder-empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No posts found containing this block.', 'block-manager')), results.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "gbm-slide-panel--finder-count"
  }, /*#__PURE__*/React.createElement("strong", null, total), ' ', total === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('post found', 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('posts found', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--finder-results"
  }, results.map(function (post) {
    return /*#__PURE__*/React.createElement(_BlockFinder_components_ResultItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: post.id,
      post: post,
      postTypeLabel: getPostTypeLabel(post.type)
    });
  })), hasMore && /*#__PURE__*/React.createElement("div", {
    className: "gbm-slide-panel--finder-load-more"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: loadMore,
    disabled: searching
  }, searching ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Loading\u2026", 'block-manager') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Load More', 'block-manager'))))))));
}

/***/ },

/***/ "./src/js/components/Patterns/Patterns.js"
/*!************************************************!*\
  !*** ./src/js/components/Patterns/Patterns.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Patterns)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _functions_bulkProcess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functions/bulkProcess */ "./src/js/functions/bulkProcess.js");
/* harmony import */ var _functions_export__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../functions/export */ "./src/js/functions/export.js");
/* harmony import */ var _functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../functions/setCategoryStatus */ "./src/js/functions/setCategoryStatus.js");
/* harmony import */ var _Global_Export__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Global/Export */ "./src/js/components/Global/Export.js");
/* harmony import */ var _Global_ExportModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Global/ExportModal */ "./src/js/components/Global/ExportModal.js");
/* harmony import */ var _Global_Loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Global/Loader */ "./src/js/components/Global/Loader.js");
/* harmony import */ var _Global_Notifications__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Global/Notifications */ "./src/js/components/Global/Notifications.js");
/* harmony import */ var _Global_Reset__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Global/Reset */ "./src/js/components/Global/Reset.js");
/* harmony import */ var _components_Category__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Category */ "./src/js/components/Patterns/components/Category.js");
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Sidebar */ "./src/js/components/Patterns/components/Sidebar.js");
/* harmony import */ var _functions_blocks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../functions/blocks */ "./src/js/functions/blocks.js");
/* harmony import */ var _Global_SearchResults__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Global/SearchResults */ "./src/js/components/Global/SearchResults.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Global/Search */ "./src/js/components/Global/Search.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

















/**
 * Render the Patterns component.
 *
 * @return {Element} The Patterns component.
 */
function Patterns() {
  var _gbm_localize2;
  var _gbm_localize = gbm_localize,
    _gbm_localize$pattern = _gbm_localize.patterns,
    categories = _gbm_localize$pattern === void 0 ? [] : _gbm_localize$pattern,
    _gbm_localize$filtere = _gbm_localize.filteredPatterns,
    filteredPatterns = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere;
  var allPatterns = [];
  // Loop categories to pluck all patterns.
  for (var _i = 0, _Object$values = Object.values(categories); _i < _Object$values.length; _i++) {
    var value = _Object$values[_i];
    allPatterns.push.apply(allPatterns, _toConsumableArray(value === null || value === void 0 ? void 0 : value.patterns));
  }
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      term: '',
      results: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    search = _useState2[0],
    setSearch = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    notifications = _useState6[0],
    setNotifications = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)((_gbm_localize2 = gbm_localize) === null || _gbm_localize2 === void 0 ? void 0 : _gbm_localize2.disabledPatterns),
    _useState8 = _slicedToArray(_useState7, 2),
    disabledPatterns = _useState8[0],
    setDisabled = _useState8[1];
  var resetButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var exportModalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var exportButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  // Count disabled & filtered patterns.
  var _countDisabledBlocks = (0,_functions_blocks__WEBPACK_IMPORTED_MODULE_13__.countDisabledBlocks)(allPatterns, disabledPatterns, filteredPatterns),
    disabledCount = _countDisabledBlocks.disabledCount,
    filteredCount = _countDisabledBlocks.filteredCount;

  /**
   * Toggle the status of a pattern.
   *
   * @param {Element} element The target element.
   * @param {string}  pattern Pattern name.
   * @param {string}  title   Pattern title.
   */
  function togglePattern(element, pattern, title) {
    if (!element || element.classList.contains('loading')) {
      return false;
    }
    element.classList.add('loading');
    var type = element.classList.contains('disabled') ? 'enable' : 'disable';

    // Send API Request
    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/pattern/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        pattern: pattern,
        title: title,
        type: type
      }
    }).then(function (res) {
      var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data,
        status = res.status;
      var _data$success = data.success,
        success = _data$success === void 0 ? true : _data$success;
      if (data && status === 200) {
        if (success) {
          if (type === 'disable') {
            element.classList.add('disabled');
          } else {
            element.classList.remove('disabled');
          }
          element.classList.remove('loading');
          (0,_functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
        }
        setDisabled(data.disabled_patterns);
        setNotifications(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            id: Date.now(),
            msg: data === null || data === void 0 ? void 0 : data.msg,
            success: success
          }]);
        });
      } else {
        element.classList.remove('loading');
        console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error has occurred', 'block-manager'));
      }
    })["catch"](function (error) {
      element.classList.remove('loading');
      console.warn(error);
    });
  }

  /**
   * Reset blocks to default state.
   */
  function resetPatterns() {
    var _resetButtonRef$curre;
    resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre = resetButtonRef.current) === null || _resetButtonRef$curre === void 0 || _resetButtonRef$curre.classList.add('spin'); // Loading state.

    (0,axios__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/patterns_reset/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      var _res$data2 = res.data,
        data = _res$data2 === void 0 ? {} : _res$data2;
      var items = document.querySelectorAll('.gbm-block-list .item.disabled:not(.filtered)');
      if (items) {
        items.forEach(function (item) {
          item.classList.remove('disabled');
        });
      }
      setDisabled([]);
      setNotifications(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: Date.now(),
          msg: data === null || data === void 0 ? void 0 : data.msg,
          success: true
        }]);
      });
      setTimeout(function () {
        var _resetButtonRef$curre2;
        resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre2 = resetButtonRef.current) === null || _resetButtonRef$curre2 === void 0 || _resetButtonRef$curre2.classList.remove('spin');
      }, 250);
    })["catch"](function (error) {
      var _resetButtonRef$curre3;
      console.warn(error);
      resetButtonRef === null || resetButtonRef === void 0 || (_resetButtonRef$curre3 = resetButtonRef.current) === null || _resetButtonRef$curre3 === void 0 || _resetButtonRef$curre3.classList.remove('spin');
    });
  }
  /**
   * Handle search.
   *
   * @param {string} term The search term.
   */
  function searchHandler(term) {
    var count = 0;
    var groups = document.querySelectorAll('.gbm-block-group');
    if (!(groups !== null && groups !== void 0 && groups.length)) {
      return;
    }
    if (term !== '') {
      _toConsumableArray(groups).forEach(function (group) {
        var total = 0;
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block, index) {
          var str = block.dataset.title.toLowerCase();
          var found = str.search(term.toLowerCase());

          // Show/hide blocks.
          if (found !== -1) {
            block.removeAttribute('style');
            total++;
            count++;
          } else {
            block.style.display = 'none';
          }

          // Show/hide entire group if no results.
          if (theBlocks.length === index + 1) {
            if (total === 0) {
              group.style.display = 'none';
            } else {
              group.removeAttribute('style');
            }
          }
        });
      });
      setSearch({
        term: term,
        results: count
      });
    } else {
      setSearch({
        term: '',
        results: 0
      });
      document.querySelector('#gbm-search').value = '';
      _toConsumableArray(groups).forEach(function (group) {
        group.removeAttribute('style');
        var theBlocks = group.querySelectorAll('.item');
        _toConsumableArray(theBlocks).forEach(function (block) {
          block.removeAttribute('style');
        });
      });
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(_Global_Loader__WEBPACK_IMPORTED_MODULE_8__["default"], {
    callback: setLoading,
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching Patterns…', 'block-manager')
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "gbm-block-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-header--title"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Patterns', 'block-manager')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select patterns to be removed from the pattern selector.', 'block-manager'))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-options"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Global_Reset__WEBPACK_IMPORTED_MODULE_10__["default"], {
    ref: resetButtonRef,
    callback: resetPatterns,
    total: disabledPatterns === null || disabledPatterns === void 0 ? void 0 : disabledPatterns.length,
    msg: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset the modified Block Patterns?', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear all Block Patterns', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Export__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: exportButtonRef,
    callback: function callback() {
      return (0,_functions_export__WEBPACK_IMPORTED_MODULE_4__.exportHook)(exportModalRef === null || exportModalRef === void 0 ? void 0 : exportModalRef.current, 'patterns');
    },
    total: disabledPatterns === null || disabledPatterns === void 0 ? void 0 : disabledPatterns.length,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export an array of disabled patterns as a WordPress hook', 'block-manager')
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-wrapper categories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-container"
  }, /*#__PURE__*/React.createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_12__["default"], {
    categories: categories,
    active: (allPatterns === null || allPatterns === void 0 ? void 0 : allPatterns.length) - disabledCount - filteredCount,
    disabled: disabledCount,
    filtered: filteredCount,
    patterns: disabledPatterns,
    setDisabled: setDisabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-blocks"
  }, /*#__PURE__*/React.createElement(_Global_Search__WEBPACK_IMPORTED_MODULE_15__["default"], {
    callback: searchHandler,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Patterns', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_SearchResults__WEBPACK_IMPORTED_MODULE_14__["default"], {
    data: search,
    callback: function callback() {
      return searchHandler('');
    },
    className: "blocks-render"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-groups"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-lists patterns"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, Object.keys(categories).map(function (category, index) {
    return /*#__PURE__*/React.createElement(_components_Category__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: index,
      data: categories[category],
      togglePattern: togglePattern,
      disabledPatterns: disabledPatterns,
      filteredPatterns: filteredPatterns,
      callback: function callback(e) {
        return (0,_functions_bulkProcess__WEBPACK_IMPORTED_MODULE_3__["default"])(e === null || e === void 0 ? void 0 : e.currentTarget, 'patterns', setDisabled, _functions_setCategoryStatus__WEBPACK_IMPORTED_MODULE_5__["default"], setNotifications);
      }
    });
  }))))))), /*#__PURE__*/React.createElement(_Global_ExportModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    ref: exportModalRef,
    returnButtonRef: exportButtonRef,
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the the following code to your functions.php to remove patterns at the theme level.', 'block-manager')
  }), /*#__PURE__*/React.createElement(_Global_Notifications__WEBPACK_IMPORTED_MODULE_9__["default"], {
    notifications: notifications,
    setNotifications: setNotifications
  })));
}

/***/ },

/***/ "./src/js/components/Patterns/components/Category.js"
/*!***********************************************************!*\
  !*** ./src/js/components/Patterns/components/Category.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Category)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Pattern__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pattern */ "./src/js/components/Patterns/components/Pattern.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



/**
 * Render the Category component for the pattern listing.
 *
 * @param {Object}   props                  The component properties.
 * @param {Object}   props.data             Data for an individual block.
 * @param {Function} props.togglePattern    Function to toggle the activation of a pattern.
 * @param {Array}    props.disabledPatterns Array of disabled patterns.
 * @param {Array}    props.filteredPatterns Array of filtered patterns.
 * @param {Function} props.callback         Function to call after category change.
 * @return {Element}                        The Category component.
 */
function Category(_ref) {
  var _patterns$filter;
  var data = _ref.data,
    togglePattern = _ref.togglePattern,
    _ref$disabledPatterns = _ref.disabledPatterns,
    disabledPatterns = _ref$disabledPatterns === void 0 ? [] : _ref$disabledPatterns,
    _ref$filteredPatterns = _ref.filteredPatterns,
    filteredPatterns = _ref$filteredPatterns === void 0 ? [] : _ref$filteredPatterns,
    callback = _ref.callback;
  var _data$patterns = data.patterns,
    patterns = _data$patterns === void 0 ? [] : _data$patterns,
    _data$label = data.label,
    label = _data$label === void 0 ? '' : _data$label,
    slug = data.name;
  if (!(patterns !== null && patterns !== void 0 && patterns.length)) {
    return null;
  }

  // Get total patterns in category.
  var total = patterns === null || patterns === void 0 ? void 0 : patterns.length;

  // Combine disabled and filtered blocks.
  var disabled = [].concat(_toConsumableArray(disabledPatterns), _toConsumableArray(filteredPatterns));

  // Count disabled patterns.
  // Loop all blocks in the category and find match.
  var count = (disabled === null || disabled === void 0 ? void 0 : disabled.length) && ((_patterns$filter = patterns.filter(function (pattern) {
    return disabled.includes(pattern === null || pattern === void 0 ? void 0 : pattern.name);
  })) === null || _patterns$filter === void 0 ? void 0 : _patterns$filter.length);
  return /*#__PURE__*/React.createElement("div", {
    key: "pattern-".concat(slug),
    id: "block-".concat(slug),
    className: "gbm-block-group",
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list-heading"
  }, /*#__PURE__*/React.createElement("h3", null, label, /*#__PURE__*/React.createElement("span", null, "[", total - count, "/", total, "]")), /*#__PURE__*/React.createElement("button", {
    className: "gbm-block-switch".concat(count === total ? ' disabled' : ''),
    "data-state": count === total ? 'inactive' : 'active',
    onClick: callback,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Toggle all patterns in this category', 'block-manager'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Toggle all patterns in this category', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-switch--inner"
  }, /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-list"
  }, patterns.map(function (pattern) {
    return /*#__PURE__*/React.createElement(_Pattern__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: pattern === null || pattern === void 0 ? void 0 : pattern.name,
      data: pattern,
      togglePattern: togglePattern,
      disabledPatterns: disabledPatterns,
      filteredPatterns: filteredPatterns
    });
  })));
}

/***/ },

/***/ "./src/js/components/Patterns/components/Pattern.js"
/*!**********************************************************!*\
  !*** ./src/js/components/Patterns/components/Pattern.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Render a Pattern component to display an individual block pattern.
 *
 * @param {Object}   props                  The component props.
 * @param {Object}   props.data             Pattern object.
 * @param {Array}    props.disabledPatterns Array of disabled patterns.
 * @param {Array}    props.filteredPatterns Array of filtered patterns.
 * @param {Function} props.togglePattern    Function to toggle the activation of a pattern.
 * @return {Element}                        The Pattern component.
 */
function Pattern(_ref) {
  var data = _ref.data,
    disabledPatterns = _ref.disabledPatterns,
    filteredPatterns = _ref.filteredPatterns,
    togglePattern = _ref.togglePattern;
  var name = data.name,
    title = data.title,
    content = data.content;
  var patternRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var disabled = (disabledPatterns === null || disabledPatterns === void 0 ? void 0 : disabledPatterns.indexOf(name)) !== -1;
  var disabledClass = disabled ? 'disabled' : '';
  var filtered = (filteredPatterns === null || filteredPatterns === void 0 ? void 0 : filteredPatterns.indexOf(name)) !== -1;
  var filteredClass = filtered ? 'filtered' : '';

  /**
   * Handle the click event for the block button.
   */
  function click() {
    var target = patternRef === null || patternRef === void 0 ? void 0 : patternRef.current;
    if (target) {
      if (!target.classList.contains('filtered')) {
        togglePattern(target, name, title);
        target.blur();
      } else {
        // eslint-disable-next-line no-alert
        alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This pattern has been disabled via the 'gbm_disabled_patterns' hook and cannot be activated using the Block Manager interface.", 'block-manager'));
        target.blur();
      }
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !!title && /*#__PURE__*/React.createElement("button", {
    ref: patternRef,
    tabIndex: filtered ? -1 : null,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle Pattern Activation', 'block-manager'),
    "data-title": title,
    "data-id": name,
    onClick: function onClick(e) {
      return click(e);
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('item block-button', disabledClass, filteredClass),
    title: name
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "block-title block-title--pattern"
  }, title))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pattern);

/***/ },

/***/ "./src/js/components/Patterns/components/Sidebar.js"
/*!**********************************************************!*\
  !*** ./src/js/components/Patterns/components/Sidebar.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _functions_scrollToElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../functions/scrollToElement */ "./src/js/functions/scrollToElement.js");
/* harmony import */ var _Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/DisabledSVG */ "./src/js/components/Global/DisabledSVG.js");
/* harmony import */ var _Global_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Global/Search */ "./src/js/components/Global/Search.js");
/* harmony import */ var _ToggleSwitch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToggleSwitch */ "./src/js/components/Patterns/components/ToggleSwitch.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







/**
 * Render the Sidebar for Block Manager.
 *
 * @param {Object}   props             The component props.
 * @param {Object}   props.categories  Object of pattern categories.
 * @param {number}   props.active      Total number of active blocks.
 * @param {number}   props.disabled    Total number of disabled blocks.
 * @param {number}   props.filtered    Total number of filtered blocks.
 * @param {Array}    props.patterns    Array of disabled patterns.
 * @param {Function} props.setDisabled State handler for disabled patterns.
 * @return {Element}                   The Sidebar component.
 */
function Sidebar(_ref) {
  var categories = _ref.categories,
    active = _ref.active,
    disabled = _ref.disabled,
    filtered = _ref.filtered,
    patterns = _ref.patterns,
    setDisabled = _ref.setDisabled;
  var _gbm_localize = gbm_localize,
    _gbm_localize$filtere = _gbm_localize.filteredPatterns,
    filteredPatterns = _gbm_localize$filtere === void 0 ? [] : _gbm_localize$filtere;
  var activeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var disabledRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var mountedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(active),
    _useState2 = _slicedToArray(_useState, 2),
    activeTotal = _useState2[0],
    setActiveTotal = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(disabled),
    _useState4 = _slicedToArray(_useState3, 2),
    disabledTotal = _useState4[0],
    setDisabledTotal = _useState4[1];

  /**
   * Block total update animation.
   *
   * @param {Element}  ref      The ref element.
   * @param {number}   value    The current value.
   * @param {Function} callback The callback function.
   */
  function change(ref, value, callback) {
    var _ref$dataset, _ref$classList;
    if (!(mountedRef !== null && mountedRef !== void 0 && mountedRef.current) || !ref) {
      return;
    }
    var prev = ref === null || ref === void 0 || (_ref$dataset = ref.dataset) === null || _ref$dataset === void 0 ? void 0 : _ref$dataset.prev;
    var direction = parseInt(prev) > value ? 'up' : 'down';
    ref === null || ref === void 0 || (_ref$classList = ref.classList) === null || _ref$classList === void 0 || _ref$classList.add("slide-".concat(direction));
    setTimeout(function () {
      var _ref$classList2, _ref$classList3;
      callback(value);
      ref === null || ref === void 0 || (_ref$classList2 = ref.classList) === null || _ref$classList2 === void 0 || _ref$classList2.add("slide-".concat(direction, "-done"));
      ref === null || ref === void 0 || (_ref$classList3 = ref.classList) === null || _ref$classList3 === void 0 || _ref$classList3.remove("slide-".concat(direction));
      setTimeout(function () {
        var _ref$classList4;
        ref === null || ref === void 0 || (_ref$classList4 = ref.classList) === null || _ref$classList4 === void 0 || _ref$classList4.remove("slide-".concat(direction, "-done"));
      }, 75);
    }, 200);
  }

  // Update the active blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    change(activeRef.current, active, setActiveTotal);
  }, [active]);

  // Update the disabled blocks.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      change(disabledRef.current, disabled, setDisabledTotal);
    }, 125);
  }, [disabled]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTimeout(function () {
      mountedRef.current = true;
    }, 500);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta gbm-cta-block-legend",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current Block Status', 'block-manager')
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--total",
    title: "".concat(activeTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active Blocks & Block Variations', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: activeRef,
    "data-prev": activeTotal
  }, activeTotal))), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--disabled",
    title: disabledTotal === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled Pattern', 'block-manager')) : "".concat(disabledTotal, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled Patterns', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    ref: disabledRef,
    "data-prev": disabledTotal
  }, disabledTotal)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disabled', 'block-manager')), !!filtered && /*#__PURE__*/React.createElement("div", {
    className: "gbm-legend gbm-legend--filtered",
    title: filtered === 1 ? "1 ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Pattern', 'block-manager')) : "".concat(filtered, " ").concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered Patterns', 'block-manager'))
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, filtered)), /*#__PURE__*/React.createElement(_Global_DisabledSVG__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "disabled"
  })), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filtered', 'block-manager')))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pattern Visibility', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, /*#__PURE__*/React.createElement(_ToggleSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
    option: "gbm/core-patterns",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Core Patterns', 'block-manager'),
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove all core block patterns from the pattern selector.', 'block-manager'),
    active: !patterns.includes('gbm/core-patterns'),
    disabled: filteredPatterns.includes('gbm/core-patterns'),
    callback: setDisabled
  }), /*#__PURE__*/React.createElement(_ToggleSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
    option: "gbm/remote-patterns",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remote Patterns', 'block-manager'),
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Prevent users from searching for remote block patterns.', 'block-manager'),
    active: !patterns.includes('gbm/remote-patterns'),
    disabled: filteredPatterns.includes('gbm/remote-patterns'),
    callback: setDisabled
  }), /*#__PURE__*/React.createElement(_ToggleSwitch__WEBPACK_IMPORTED_MODULE_5__["default"], {
    option: "gbm/uncategorized-patterns",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uncategorized Patterns', 'block-manager'),
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove all block patterns without an assigned category.', 'block-manager'),
    active: !patterns.includes('gbm/uncategorized-patterns'),
    disabled: filteredPatterns.includes('gbm/uncategorized-patterns'),
    callback: setDisabled
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Categories', 'block-manager')), /*#__PURE__*/React.createElement("div", {
    className: "gbm-cta-wrap"
  }, Object.keys(categories).map(function (category) {
    var _categories$category, _categories$category3;
    return /*#__PURE__*/React.createElement("button", {
      key: (_categories$category = categories[category]) === null || _categories$category === void 0 ? void 0 : _categories$category.name,
      className: "gbm-toc",
      type: "button",
      onClick: function onClick() {
        var _categories$category2;
        return (0,_functions_scrollToElement__WEBPACK_IMPORTED_MODULE_2__["default"])("block-".concat((_categories$category2 = categories[category]) === null || _categories$category2 === void 0 ? void 0 : _categories$category2.name));
      }
    }, (_categories$category3 = categories[category]) === null || _categories$category3 === void 0 ? void 0 : _categories$category3.label);
  }))));
}

/***/ },

/***/ "./src/js/components/Patterns/components/ToggleSwitch.js"
/*!***************************************************************!*\
  !*** ./src/js/components/Patterns/components/ToggleSwitch.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleSwitch)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");



/**
 * Render the block ToggleSwitch component.
 *
 * @param {Object}   props          The component properties.
 * @param {boolean}  props.active   Is the button active?
 * @param {string}   props.option   The WP option name.
 * @param {string}   props.label    The switch label.
 * @param {string}   props.desc     The switch description.
 * @param {boolean}  props.disabled Is the button disabled?
 * @param {Function} props.callback Callback function.
 * @return {Element}                The ToggleSwitch component.
 */
function ToggleSwitch(_ref) {
  var _ref$active = _ref.active,
    active = _ref$active === void 0 ? true : _ref$active,
    option = _ref.option,
    label = _ref.label,
    desc = _ref.desc,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    callback = _ref.callback;
  var buttonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  if (!option) {
    return null;
  }

  /**
   * Toggle the status of a pattern toggle switch.
   */
  function handler() {
    if (buttonRef.current.classList.contains('loading')) {
      return false;
    }
    buttonRef.current.classList.add('loading');
    var type = buttonRef.current.classList.contains('disabled') ? 'disable' : 'enable';

    // Send API Request.
    (0,axios__WEBPACK_IMPORTED_MODULE_1__["default"])({
      method: 'POST',
      url: gbm_localize.root + 'gbm/pattern/',
      headers: {
        'X-WP-Nonce': gbm_localize.nonce,
        'Content-Type': 'application/json'
      },
      data: {
        pattern: option,
        title: label,
        type: type
      }
    }).then(function (res) {
      var _res$data = res.data,
        data = _res$data === void 0 ? {} : _res$data,
        status = res.status;
      var _data$success = data.success,
        success = _data$success === void 0 ? true : _data$success,
        _data$disabled_patter = data.disabled_patterns,
        disabled_patterns = _data$disabled_patter === void 0 ? [] : _data$disabled_patter;
      if (data && status === 200) {
        if (success) {
          if (type === 'disable') {
            buttonRef.current.classList.remove('disabled');
          } else {
            buttonRef.current.classList.add('disabled');
          }
          callback(disabled_patterns);
        }
        buttonRef.current.classList.remove('loading');
      } else {
        buttonRef.current.classList.remove('loading');
        console.warn(__('An error has occurred', 'block-manager'));
      }
    })["catch"](function (error) {
      buttonRef.current.classList.remove('loading');
      console.warn(error);
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-switch--container"
  }, /*#__PURE__*/React.createElement("button", {
    ref: buttonRef,
    className: "gbm-block-switch".concat(active ? ' disabled' : ''),
    onClick: function onClick() {
      return handler();
    },
    "aria-label": label,
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "gbm-block-switch--inner"
  }, /*#__PURE__*/React.createElement("span", null)), label && /*#__PURE__*/React.createElement("span", null, label)), desc && /*#__PURE__*/React.createElement("p", null, desc));
}

/***/ },

/***/ "./src/js/constants.js"
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excludedBlocks: () => (/* binding */ excludedBlocks),
/* harmony export */   variationBlocks: () => (/* binding */ variationBlocks)
/* harmony export */ });
var excludedBlocks = ['core/missing', 'core/text-columns', 'core/navigation-submenu'];
var variationBlocks = ['core/embed', 'core/paragraph', 'core/heading'];

/***/ },

/***/ "./src/js/functions/blocks.js"
/*!************************************!*\
  !*** ./src/js/functions/blocks.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countBlocks: () => (/* binding */ countBlocks),
/* harmony export */   countDisabledBlocks: () => (/* binding */ countDisabledBlocks),
/* harmony export */   getAllBlocksAndVariations: () => (/* binding */ getAllBlocksAndVariations),
/* harmony export */   getBlockCategoryData: () => (/* binding */ getBlockCategoryData),
/* harmony export */   getBlocksData: () => (/* binding */ getBlocksData)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/js/functions/helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Get array of blocks for the Category listing.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
function getBlockCategoryData(blocks) {
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.removeDisabledBlocks)((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.setBlockCategory)((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.sortBlocks)(blocks)));
}

/**
 * Get all WP blocks and variations with updated categories.
 *
 * @param {Array} blocks             Array of WP Blocks.
 * @param {Array} filteredCategories The filtered categories.
 * @return {Array}                   The list of blocks.
 */
function getBlocksData(blocks) {
  var filteredCategories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }

  // Get and sort blocks.
  var wpBlocks = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.sortBlocks)(blocks);

  // Update block categories.
  if (filteredCategories !== null && filteredCategories !== void 0 && filteredCategories.length) {
    // Loop saved categories.
    filteredCategories.forEach(function (item) {
      var name = item.block,
        category = item.cat;

      // Find block by name and update category.
      var match = wpBlocks.find(function (block) {
        return block.name === name;
      });
      if (match) {
        match.category = category;
      }
    });
  }
  return getAllBlocksAndVariations(wpBlocks);
}

/**
 * Get an array of blocks and any block variations.
 * Block variations are stored in a nested `variations` array of each block.
 *
 * @param {Array} blocks Array of blocks.
 * @return {Array}       Array of blocks with variations included.
 */
function getAllBlocksAndVariations(blocks) {
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }
  var WPBlocks = [];

  // Loop all blocks.
  blocks.forEach(function (block) {
    var name = block.name,
      variations = block.variations,
      category = block.category,
      title = block.title;
    WPBlocks.push(block);
    if (!(_constants__WEBPACK_IMPORTED_MODULE_0__.variationBlocks !== null && _constants__WEBPACK_IMPORTED_MODULE_0__.variationBlocks !== void 0 && _constants__WEBPACK_IMPORTED_MODULE_0__.variationBlocks.length)) {
      return;
    }
    if (_constants__WEBPACK_IMPORTED_MODULE_0__.variationBlocks.includes(name) && variations !== null && variations !== void 0 && variations.length) {
      // Loop block variations and push into blocks array as a top level item.
      variations.forEach(function (variation) {
        if (title === (variation === null || variation === void 0 ? void 0 : variation.title)) {
          /**
           * Skip if variation title matches parent block title.
           * This fix is needed for paragraph and heading blocks which
           * have a variation with the same title as the parent block.
           */
          return;
        }
        console.log(variation);
        WPBlocks.push(_objectSpread(_objectSpread({}, variation), {}, {
          name: "variation;".concat(name, ";").concat(variation === null || variation === void 0 ? void 0 : variation.name),
          variation: name,
          prefix: title,
          category: category
        }));
      });
    }
  });
  return WPBlocks;
}

/**
 * Count total disabled and filtered blocks.
 * Make sure block is installed when being counted.
 *
 * @param {Array} blocks   Array of blocks with parent categories.
 * @param {Array} disabled Array of disabled blocks.
 * @param {Array} filtered Array of filtered blocks.
 * @return {Object}        Total number of blocks in an object.
 */
function countDisabledBlocks(blocks, disabled, filtered) {
  var _blocks$filter, _blocks$filter2;
  return {
    disabledCount: (_blocks$filter = blocks.filter(function (block) {
      return disabled === null || disabled === void 0 ? void 0 : disabled.includes(block.name);
    })) === null || _blocks$filter === void 0 ? void 0 : _blocks$filter.length,
    filteredCount: (_blocks$filter2 = blocks.filter(function (block) {
      return filtered === null || filtered === void 0 ? void 0 : filtered.includes(block.name);
    })) === null || _blocks$filter2 === void 0 ? void 0 : _blocks$filter2.length
  };
}

/**
 * Count total blocks including variations.
 * Loop blocks and return total count.
 *
 * @param {Array} blocks Array of blocks with parent categories
 * @return {number}      Total number of blocks
 * @deprecated 2.1
 */
function countBlocks(blocks) {
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return 0;
  }
  var count = 0;
  blocks.forEach(function (category) {
    var _category$blocks;
    count += category === null || category === void 0 || (_category$blocks = category.blocks) === null || _category$blocks === void 0 ? void 0 : _category$blocks.length;
  });
  return count;
}

/***/ },

/***/ "./src/js/functions/bulkProcess.js"
/*!*****************************************!*\
  !*** ./src/js/functions/bulkProcess.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bulkProcess)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



/**
 * Toggle all items in a category.
 *
 * @param {Element}  target            The target element.
 * @param {string}   type              The type of content (blocks/patterns)
 * @param {Function} setDisabled       Sets the disabled state.
 * @param {Function} setCategoryStatus Sets the category state.
 * @param {Function} setNotifications  Sets the notifications state
 */
function bulkProcess(target) {
  var _target$parentNode;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'blocks';
  var setDisabled = arguments.length > 2 ? arguments[2] : undefined;
  var setCategoryStatus = arguments.length > 3 ? arguments[3] : undefined;
  var setNotifications = arguments.length > 4 ? arguments[4] : undefined;
  var state = target.dataset.state;
  var direction = state === 'active' ? 'disable' : 'enable';
  if (state === 'active') {
    target.classList.add('disabled');
    target.dataset.state = 'inactive';
  } else {
    target.dataset.state = 'active';
  }
  var container = target === null || target === void 0 || (_target$parentNode = target.parentNode) === null || _target$parentNode === void 0 || (_target$parentNode = _target$parentNode.parentNode) === null || _target$parentNode === void 0 ? void 0 : _target$parentNode.querySelector('.gbm-block-list');
  var items = container === null || container === void 0 ? void 0 : container.querySelectorAll('.item:not(.filtered)');
  if (!items) {
    return;
  }
  var itemArray = _toConsumableArray(items).map(function (block) {
    return block.dataset.id;
  }); // Create array of block IDs/names.

  if (!(itemArray !== null && itemArray !== void 0 && itemArray.length)) {
    return;
  }
  container.classList.add('loading'); // Add loading state.

  (0,axios__WEBPACK_IMPORTED_MODULE_1__["default"])({
    method: 'POST',
    url: gbm_localize.root + 'gbm/bulk_process/',
    headers: {
      'X-WP-Nonce': gbm_localize.nonce,
      'Content-Type': 'application/json'
    },
    data: {
      blocks: itemArray,
      type: type,
      direction: direction
    }
  }).then(function (res) {
    var _res$data = res.data,
      data = _res$data === void 0 ? {} : _res$data,
      status = res.status;
    var _data$success = data.success,
      success = _data$success === void 0 ? true : _data$success;
    if (status === 200 && success) {
      _toConsumableArray(items).forEach(function (item) {
        if (direction === 'enable') {
          item.classList.remove('disabled');
        } else {
          item.classList.add('disabled');
        }
      });
      container.classList.remove('loading');
      setDisabled(data.disabled);
      setCategoryStatus(items[0]);
      setNotifications(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: Date.now(),
          msg: data === null || data === void 0 ? void 0 : data.msg,
          success: success
        }]);
      });
    } else {
      container.classList.remove('loading');
      console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('An error has occurred', 'block-manager'));
    }
  })["catch"](function (error) {
    container.classList.remove('loading');
    console.warn(error);
  });
}

/***/ },

/***/ "./src/js/functions/copyToClipboard.js"
/*!*********************************************!*\
  !*** ./src/js/functions/copyToClipboard.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ copyToClipboard)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Copy export code to clipboard.
 *
 * @param {Element} input   The code input element.
 * @param {Element} trigger The button trigger element.
 */
function copyToClipboard(input, trigger) {
  var _window;
  if (!input) return;
  var range = document.createRange();
  range.selectNodeContents(input);
  var sel = (_window = window) === null || _window === void 0 ? void 0 : _window.getSelection(); //eslint-disable-line
  sel.removeAllRanges();
  sel.addRange(range);

  // Copy to clipboard.
  document.execCommand('copy');
  if (trigger) {
    // Set the Copy button text.
    trigger.innerHTML = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Copied', 'block-manager');
    setTimeout(function () {
      trigger.disabled = true;
    }, 500);
  }
}

/***/ },

/***/ "./src/js/functions/export.js"
/*!************************************!*\
  !*** ./src/js/functions/export.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportHook: () => (/* binding */ exportHook)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");



/**
 * Export as PHP code.
 *
 * @param {Element} ref  The export modal reference.
 * @param {string}  type The type of export.
 */
function exportHook(ref) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'blocks';
  ref === null || ref === void 0 || ref.classList.add('active'); // Loading state.

  var hooks = {
    blocks: 'gbm_disabled_blocks',
    patterns: 'gbm_disabled_patterns',
    categories: 'gbm_block_categories'
  };
  (0,axios__WEBPACK_IMPORTED_MODULE_1__["default"])({
    method: 'GET',
    url: "".concat(gbm_localize.root, "gbm/export/?type=").concat(type),
    headers: {
      'X-WP-Nonce': gbm_localize.nonce,
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    var data = res.data,
      status = res.status;
    if (status === 200 && data !== null && data !== void 0 && data.success && data !== null && data !== void 0 && data.code) {
      var code = '';

      // Blocks return data.
      if (type === 'blocks' || type === 'patterns') {
        code = data.code;
        code = code.replace(/\\/g, ''); // Replace `\`.
        code = code.replace(/"/g, "'"); // Replace `"`.
        code = code.replace(/,'/g, ", '"); // Replace `,'`.
      }

      // Category return data.
      if (type === 'categories') {
        var entries = JSON.parse(data.code);
        if (entries !== null && entries !== void 0 && entries.length) {
          code = '[';
          entries.forEach(function (entry, index) {
            code += '[';
            code += "'block' => '".concat(entry.block, "', 'cat' => '").concat(entry.cat, "'");
            code += ']';
            code += index === entries.length - 1 ? '' : ', ';
          });
          code += ']';
        }
      }
      var results = "// functions.php<br/>add_filter( '".concat(hooks[type], "', function() {<br/>&nbsp;&nbsp;&nbsp;return ").concat(code, ";<br/>} );");
      var target = ref === null || ref === void 0 ? void 0 : ref.querySelector('#gbm-export');
      target.innerHTML = results;
      setTimeout(function () {
        target.focus();
      }, 250);
    } else {
      console.warn((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('There was an error fetching export data.', 'block-manager'));
      ref === null || ref === void 0 || ref.classList.remove('active');
    }
  })["catch"](function (error) {
    console.warn(error);
    ref === null || ref === void 0 || ref.classList.remove('active');
  });
}

/***/ },

/***/ "./src/js/functions/getCategoryData.js"
/*!*********************************************!*\
  !*** ./src/js/functions/getCategoryData.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCategoryData)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Get all WP block categories.
 *
 * @return {Array} The array of categories.
 */
function getCategoryData() {
  var wpCategories = [];

  // Get WP Block Categories
  var categories = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getCategories)();
  if (categories !== null && categories !== void 0 && categories.length) {
    // Sort categories by name.
    wpCategories = categories.sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0; // eslint-disable-line
    });

    // Filter categories for `reusable`.
    wpCategories = wpCategories.filter(function (cat) {
      return cat.slug !== 'reusable';
    });
  }
  return wpCategories;
}

/***/ },

/***/ "./src/js/functions/helpers.js"
/*!*************************************!*\
  !*** ./src/js/functions/helpers.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   categoryOffsetCount: () => (/* binding */ categoryOffsetCount),
/* harmony export */   removeDisabledBlocks: () => (/* binding */ removeDisabledBlocks),
/* harmony export */   setBlockCategory: () => (/* binding */ setBlockCategory),
/* harmony export */   sortBlocks: () => (/* binding */ sortBlocks)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");


/**
 * Sort the blocks alpha and then remove excluded blocks.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       The sorted array of blocks.
 */
function sortBlocks(blocks) {
  return blocks.sort(function (a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0; //eslint-disable-line
  }).filter(function (block) {
    return _constants__WEBPACK_IMPORTED_MODULE_0__.excludedBlocks.indexOf(block.name) === -1;
  });
}

/**
 * Remove all disabled blocks from blocks array.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Filtered array of blocks.
 */
function removeDisabledBlocks() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!(blocks !== null && blocks !== void 0 && blocks.length)) {
    return [];
  }
  var _gbm_localize = gbm_localize,
    _gbm_localize$disable = _gbm_localize.disabledBlocksAll,
    disabled = _gbm_localize$disable === void 0 ? [] : _gbm_localize$disable;
  if (!(disabled !== null && disabled !== void 0 && disabled.length)) {
    return blocks;
  }
  return blocks === null || blocks === void 0 ? void 0 : blocks.filter(function (block) {
    return !(disabled !== null && disabled !== void 0 && disabled.includes(block === null || block === void 0 ? void 0 : block.name));
  });
}

/**
 * Set block categories.
 *
 * @param {Array} blocks Array of WP Blocks.
 * @return {Array}       Modified blocks with categories.
 */
function setBlockCategory() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _gbm_localize2 = gbm_localize,
    _gbm_localize2$filter = _gbm_localize2.filteredCategoriesAll,
    filteredCategoriesAll = _gbm_localize2$filter === void 0 ? [] : _gbm_localize2$filter;
  return blocks.map(function (block) {
    if (filteredCategoriesAll !== null && filteredCategoriesAll !== void 0 && filteredCategoriesAll.length) {
      var match = filteredCategoriesAll.find(function (item) {
        return item.block === block.name;
      });
      if (match) {
        block.orginalCategory = block.category;
        block.category = match.cat;
      } else {
        block.orginalCategory = block.category;
      }
    }
    return block;
  });
}

/**
 * Filter blocks to see if they are disabled or not active(installed) on the site.
 *
 * @param {Array} data        The data to filter.
 * @param {Array} disabled    Array of disabled blocks.
 * @param {Array} block_names Array of block names.
 * @return {number}           Length of the array.
 */
function categoryOffsetCount(data, disabled, block_names) {
  return data.filter(function (item) {
    // Increment count if block is disabled or not in the block_names array.
    return disabled.includes(item.block) || !block_names.includes(item === null || item === void 0 ? void 0 : item.block);
  }).length;
}

/***/ },

/***/ "./src/js/functions/scrollToElement.js"
/*!*********************************************!*\
  !*** ./src/js/functions/scrollToElement.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ scrollToElement)
/* harmony export */ });
/**
 * Scroll to the element with the given id.
 *
 * @param {string} id Element ID
 */
function scrollToElement(id) {
  if (!id) {
    return;
  }
  var target = document.querySelector("#".concat(id));
  if (target) {
    var top = target.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
    target.focus({
      preventScroll: true
    });
  }
}

/***/ },

/***/ "./src/js/functions/setCategoryStatus.js"
/*!***********************************************!*\
  !*** ./src/js/functions/setCategoryStatus.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setCategoryStatus)
/* harmony export */ });
/**
 * Set the status indicator and button states for each category.
 *
 * @param {Element} element The target element.
 */
function setCategoryStatus(element) {
  if (!element) {
    return false;
  }
  var parent = element.parentNode.parentNode;
  var toggleBtn = parent.querySelector('.gbm-block-switch');
  var items = parent.querySelectorAll('.gbm-block-list .item');
  if (items) {
    var blockArr = Array.prototype.slice.call(items);
    var disabledBlocksFiltered = blockArr.filter(function (block) {
      return block.classList.contains('disabled');
    });

    // If disabled === total items, toggle the switch
    if (disabledBlocksFiltered.length === items.length) {
      toggleBtn.classList.add('disabled');
      toggleBtn.dataset.state = 'inactive';
    } else {
      toggleBtn.classList.remove('disabled');
      toggleBtn.dataset.state = 'active';
    }
  }
}

/***/ },

/***/ "./src/js/helpers/otherPlugins.js"
/*!****************************************!*\
  !*** ./src/js/helpers/otherPlugins.js ***!
  \****************************************/
() {

/**
 * Toggle Other Plugins display.
 */
var otherPluginsClick = function otherPluginsClick() {
  var otherPluginsDiv = document.getElementById('gbm-other-plugins');
  if (!otherPluginsDiv) {
    return false;
  }
  if (otherPluginsDiv.style.display === 'block') {
    otherPluginsDiv.style.display = 'none';
  } else {
    otherPluginsDiv.style.display = 'block';
  }
  var container = document.getElementById('gbm-container');
  container.focus({
    preventScroll: true
  });
};
var otherPluginsBtn = document.getElementById('otherPlugins');
var otherPluginsClose = document.getElementById('otherPluginsClose');
if (otherPluginsBtn) {
  otherPluginsBtn.addEventListener('click', otherPluginsClick);
  otherPluginsClose.addEventListener('click', otherPluginsClick);
}

/***/ },

/***/ "./src/sass/style.scss"
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/block-library"
/*!**************************************!*\
  !*** external ["wp","blockLibrary"] ***!
  \**************************************/
(module) {

"use strict";
module.exports = window["wp"]["blockLibrary"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"block-manager-admin": 0,
/******/ 			"./style-block-manager-admin": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkblock_manager"] = globalThis["webpackChunkblock_manager"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-block-manager-admin"], () => (__webpack_require__("./src/js/admin.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=block-manager-admin.js.map