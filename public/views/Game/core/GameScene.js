import '../../../lib/three.min.js'

export default class GameScene {
    constructor() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        this._canvas = document.getElementById('canvas');
        this._canvas.setAttribute('width', width);
        this._canvas.setAttribute('height', height);

        this._renderer = new THREE.WebGLRenderer({canvas: this._canvas});
        this._renderer.setClearColor(0x000000);

        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        this._camera.position.set(0, 0, 1000);
    }

    render() {
        this._renderer.render(this._scene, this._camera);
    }
}