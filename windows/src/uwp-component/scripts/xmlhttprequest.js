function XMLHttpRequest() {
    var self = this;

    this.native = new nativeInterface.XmlHttpRequest.create();

    this.addEventListener = function (eventType, eventHandler) {
        nativeInterface.eventRegistration.addEventListener(this.native, eventType, eventHandler.bind(self));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        nativeInterface.eventRegistration.removeEventListener(this.native, eventType, eventHandler.bind(self));
    };

    Object.defineProperty(this, 'onreadystatechange', {
        get: function() {
            return this.onreadystatechangeEvent;
        },
        set: function (value) {
            if (this.onreadystatechangeEvent) {
                this.removeEventListener('load', this.onreadystatechangeEvent);
            }

            if (value) {
                this.addEventListener('load', value);
            }

            this.onreadystatechangeEvent = value;
        }
    });

    Object.defineProperty(this, 'onload', {
        get: function () {
            return this.onloadEvent;
        },
        set: function (value) {
            if (this.onloadEvent) {
                this.removeEventListener('load', this.onloadEvent);
            }

            if (value) {
                this.addEventListener('load', value);
            }

            this.onloadEvent = value;
        }
    });

    Object.defineProperty(this, 'onerror', {
        get: function () {
            return this.onerrorEvent;
        },
        set: function (value) {
            if (this.onerrorEvent) {
                this.removeEventListener('error', this.onerrorEvent);
            }

            if (value) {
                this.addEventListener('error', value);
            }

            this.onerrorEvent = value;
        }
    });

    this.open = function(method, url) {
        this.method = method;
        this.url = url;
    };

    this.setRequestHeader = function(header, value) {
        nativeInterface.XmlHttpRequest.setRequestHeader(this.native, header, value);
    };

    this.getResponseHeader = function(header) {
        return nativeInterface.XmlHttpRequest.getResponseHeader(this.native, header);
    };

    this.send = function(payload) {
        nativeInterface.XmlHttpRequest.send(this.native, this, this.method, this.url, (this.responseType ? this.responseType : 'text'), payload);
    };
}

(function() {
XMLHttpRequest.DONE = 4;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
})();