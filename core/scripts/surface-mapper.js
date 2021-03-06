function SurfaceMapper() {
    navigator.holojs.nativeInterface.SurfaceMapper.create(this);

    if (typeof this.native === 'undefined') {
        throw "cannot create websocket";
    }

    this.addEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.start = function () {
        this.native = navigator.holojs.nativeInterface.SurfaceMapper.start(this.native);
    };

    this.stop = function () {
        navigator.holojs.nativeInterface.SurfaceMapper.stop(this.native);
    };

    Object.defineProperty(this, 'onnewmesh', {
        get: function () {
            return this.onnewmeshEvent;
        },
        set: function (value) {
            if (this.onnewmeshEvent) {
                this.removeEventListener('newmesh', this.onnewmeshEvent);
            }

            if (value) {
                this.addEventListener('newmesh', value);
            }

            this.onnewmeshEvent = value;
        }
    });


    Object.defineProperty(this, 'onupdatedmesh', {
        get: function () {
            return this.onupdatedmeshEvent;
        },
        set: function (value) {
            if (this.onupdatedmeshEvent) {
                this.removeEventListener('updatedmesh', this.onupdatedmeshEvent);
            }

            if (value) {
                this.addEventListener('updatedmesh', value);
            }

            this.onupdatedmeshEvent = value;
        }
    });

    Object.defineProperty(this, 'ondeletedmesh', {
        get: function () {
            return this.ondeletedmeshEvent;
        },
        set: function (value) {
            if (this.ondeletedmeshEvent) {
                this.removeEventListener('deletedmesh', this.ondeletedmeshEvent);
            }

            if (value) {
                this.addEventListener('deletedmesh', value);
            }

            this.ondeletedmeshEvent = value;
        }
    });

    Object.defineProperty(this, 'triangleDensity', {
        get: function () {
            return navigator.holojs.nativeInterface.SurfaceMapper.triangleDensity(this.native);
        },
        set: function (value) {
            navigator.holojs.nativeInterface.SurfaceMapper.triangleDensity(this.native, value);
        }
    });

    Object.defineProperty(this, 'boundingCube', {
        get: function () {
            let cubeBuffer = navigator.holojs.nativeInterface.SurfaceMapper.boundingCube(this.native);
            return { x: cubeBuffer[0], y: cubeBuffer[1], z: cubeBuffer[2], extentX: cubeBuffer[3], extentY: cubeBuffer[4], extentZ: cubeBuffer[5] };
        },
        set: function (value) {
            let cubeBuffer = new Float32Array([value.x, value.y, value.z, value.extentX, value.extentY, value.extentZ]);
            navigator.holojs.nativeInterface.SurfaceMapper.boundingCube(this.native, cubeBuffer);
        }
    });
}

SurfaceMapper.isAvailable = function () {
    return navigator.holojs.nativeInterface.SurfaceMapper.isAvailable();    
};