export default function createMap(scene) {
    const height = 50;
    const width = 100; //ширина
    const length = 200; //длинна

    const walls = [
        {
            position: [0, height/2, width/2],
            geometry: [length, height, 1],
            color: 0x000000
        }, {
            position: [0, height/2, -width/2],
            geometry: [length, height, 1],
            color: 0xff0000
        }, {
            position: [length/2, height/2, 0],
            geometry: [1, height, width],
            color: 0x0000ff
        }, {
            position: [-length/2, height/2, 0],
            geometry: [1, height, width],
            color: 0x00ffff
        }
    ];

    walls.forEach(el => {

        let geometry = new THREE.BoxGeometry(el.geometry[0], el.geometry[1], el.geometry[2]);
        let material = new THREE.MeshBasicMaterial({color: el.color});
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = el.position[0];
        mesh.position.y = el.position[1];
        mesh.position.z = el.position[2];

        scene.add(mesh);
    });
    console.log('map!!')
}