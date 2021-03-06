var console;

(function () {

    function makeConsole() {
        this.log = function (...entries) {
            nativeInterface.system.log(entries.join());
        }.bind(this);

        this.debug = function (...entries) {
            nativeInterface.system.debug(entries.join());
        }.bind(this);

        this.warn = function (...entries) {
            nativeInterface.system.log(entries.join());
        };

        this.error = function (...entries) {
            nativeInterface.system.log(entries.join());
        };

        this.info = function (...entries) {
            nativeInterface.system.log(entries.join());
        };

        this.dir = function (...entries) {
            nativeInterface.system.log(entries.join());
        };

        this.time = function (label) {
            this.log("Start " + label);
        };

        this.timeEnd = function (label) {
            this.log("End " + label);
        };
    }

    console = new makeConsole();
})();