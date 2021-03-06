navigator.getGamepads = function () {
    return navigator.holojs.nativeInterface.gamepadManager.connectedGamepads;
};

function GamepadManager() {
    this.connectedGamepads = [];

    window.addEventListener("gamepadconnected", function (connectedGamepad) {
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads[connectedGamepad.index] = connectedGamepad;
        console.log("gamepad added");
    });

    window.addEventListener("gamepaddisconnected", function (disconnectedGamepad) {
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads[disconnectedGamepad.index].connected = false;
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads[disconnectedGamepad.index].pose.position = null;
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads[disconnectedGamepad.index].pose.orientation = null;
        console.log("gamepad removed");
    });
}

navigator.holojs.nativeInterface.gamepadManager = new GamepadManager();

