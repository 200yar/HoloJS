var camera, scene, renderer;

var updateFunction = null;

function renderMessageCube(message) {
    scene.remove.apply(scene, scene.children);

    let canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 300;
    let ctx = canvas.getContext('2d');

    // Draw rectangle
    ctx.fillStyle = '#e9a0e4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = '120px "Segoe MDL2 Assets"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(message.icon, message.iconX, message.iconY);

    ctx.font = '40px "Segoe UI"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(message.text, message.textX, message.textY);

    let texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    let signCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.5, 0.5),
        new THREE.MeshStandardMaterial({
            map: texture
        })
    );

    let yPosition = navigator.holojs.nativeInterface.headsetPresent === true ? 1.6 : 0;
    signCube.position.set(0, yPosition, -2.0);
    scene.add(signCube);

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
}

function renderLoadingAnimation() {
    scene.remove.apply(scene, scene.children);
    let geometry = new THREE.OctahedronBufferGeometry(0.10, 0);

    geometry.clearGroups();
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 1);
    geometry.addGroup(6, 3, 2);
    geometry.addGroup(9, 3, 3);
    geometry.addGroup(12, 3, 4);
    geometry.addGroup(15, 3, 5);
    geometry.addGroup(18, 3, 1);
    geometry.addGroup(21, 3, 3);
    geometry.addGroup(24, 3, 5);

    let materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    ];


    let mesh = new THREE.Mesh(geometry, materials);
    let yPosition = navigator.holojs.nativeInterface.headsetPresent === true ? 1.6 : 0;
    mesh.position.set(0, yPosition, -1.5);
    scene.add(mesh);

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    updateFunction = function () {
        mesh.rotation.y += 0.05;
    };
}

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 1000);
    scene = new THREE.Scene();

    let vrCanvas = document.createElement('canvasvr');
    renderer = new THREE.WebGLRenderer({ canvas: vrCanvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', onWindowResize, false);

    renderer.setAnimationLoop(render);

    navigator.getVRDisplays().then(
        function (value) {
            if (value.length > 0) {
                renderer.vr.enabled = true;
                renderer.vr.setDevice(value[0]);
                value[0].requestPresent([{ source: renderer.domElement }]);
            }
        });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    if (updateFunction !== null) {
        updateFunction();
    }
    renderer.render(scene, camera);
}

init();