export default function createRoom(scene, x, y, z, width, len, height) {
    height = height || 50 ;
    width = width || 100; //ширина
    len = len || 200; //длинна
    x = x || 0;
    y = y || 0;
    z = z || 0;

    const walls = [
        {
            position: [x, y + height/2, z + width/2],
            geometry: [len, height, 1],
            color: 0x000000
        }, {
            position: [x, y + height/2, z - width/2],
            geometry: [len, height, 1],
            color: 0xff0000
        }, {
            position: [x + len/2, y + height/2, z],
            geometry: [1, height, width],
            color: 0x0000ff
        }, {
            position: [x - len/2, y + height/2, z],
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