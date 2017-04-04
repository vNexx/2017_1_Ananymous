var scene, camera, renderer, mesh, clock;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02, canShoot:0 };
var USE_WIREFRAME = false;

// var loadingScreen = {
// 	scene: new THREE.Scene(),
// 	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
// 	box: new THREE.Mesh(
// 		new THREE.BoxGeometry(0.5,0.5,0.5),
// 		new THREE.MeshBasicMaterial({ color:0x4444ff })
// 	)
// };
var loadingManager = null;
var RESOURCES_LOADED = false;

// Models index
var models = {
	// tent: {
	// 	obj:"models/Tent_Poles_01.obj",
	// 	mtl:"models/Tent_Poles_01.mtl",
	// 	mesh: null
	// },
	// campfire: {
	// 	obj:"models/Campfire_01.obj",
	// 	mtl:"models/Campfire_01.mtl",
	// 	mesh: null
	// },
	// pirateship: {
	// 	obj:"models/Pirateship.obj",
	// 	mtl:"models/Pirateship.mtl",
	// 	mesh: null
	// },
	uzi: {
		obj:"models/uziGold.obj",
		mtl:"models/uziGold.mtl",
		mesh: null,
		castShadow:false
	}
};

// Meshes index
var meshes = {};

// Bullets array
var bullets = [];

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	clock = new THREE.Clock();

	// loadingScreen.box.position.set(0,0,5);
	// loadingScreen.camera.lookAt(loadingScreen.box.position);
	// loadingScreen.scene.add(loadingScreen.box);

	loadingManager = new THREE.LoadingManager();
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
		onResourcesLoaded();
	};


	// mesh = new THREE.Mesh(
	// 	new THREE.BoxGeometry(1,1,1),
	// 	new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	// );
	// mesh.position.y += 1;
	// mesh.receiveShadow = true;
	// mesh.castShadow = true;
	// scene.add(mesh);

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);


	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	// light = new THREE.PointLight(0xffffff, 0.8, 18);
	// light.position.set(-3,6,-3);
	// light.castShadow = true;
	// light.shadow.camera.near = 0.1;
	// light.shadow.camera.far = 25;
	// scene.add(light);


	// var textureLoader = new THREE.TextureLoader(loadingManager);
	// crateTexture = textureLoader.load("crate0/crate0_diffuse.jpg");
	// crateBumpMap = textureLoader.load("crate0/crate0_bump.jpg");
	// crateNormalMap = textureLoader.load("crate0/crate0_normal.jpg");
	//
	// crate = new THREE.Mesh(
	// 	new THREE.BoxGeometry(3,3,3),
	// 	new THREE.MeshPhongMaterial({
	// 		color:0xffffff,
	// 		map:crateTexture,
	// 		bumpMap:crateBumpMap,
	// 		normalMap:crateNormalMap
	// 	})
	// );
	// scene.add(crate);
	// crate.position.set(2.5, 3/2, 2.5);
	// crate.receiveShadow = true;
	// crate.castShadow = true;

	// Load models
	// REMEMBER: Loading in Javascript is asynchronous, so you need
	// to wrap the code in a function and pass it the index. If you
	// don't, then the index '_key' can change while the model is being
	// downloaded, and so the wrong model will be matched with the wrong
	// index key.
	for( var _key in models ){
		(function(key){

			var mtlLoader = new THREE.MTLLoader(loadingManager);
			mtlLoader.load(models[key].mtl, function(materials){
				materials.preload();

				var objLoader = new THREE.OBJLoader(loadingManager);

				objLoader.setMaterials(materials);
				objLoader.load(models[key].obj, function(mesh){

					mesh.traverse(function(node){
						if( node instanceof THREE.Mesh ){
							if('castShadow' in models[key])
								node.castShadow = models[key].castShadow;
							else
								node.castShadow = true;

							if('receiveShadow' in models[key])
								node.receiveShadow = models[key].receiveShadow;
							else
								node.receiveShadow = true;
						}
					});
					models[key].mesh = mesh;

				});
			});

		})(_key);
	}


	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	document.body.appendChild(renderer.domElement);

	animate();
}

// Runs when all resources are loaded
function onResourcesLoaded(){

	// Clone models into meshes.
	// meshes["tent1"] = models.tent.mesh.clone();
	// meshes["tent2"] = models.tent.mesh.clone();
	// meshes["campfire1"] = models.campfire.mesh.clone();
	// meshes["campfire2"] = models.campfire.mesh.clone();
	// meshes["pirateship"] = models.pirateship.mesh.clone();
	//
	// // Reposition individual meshes, then add meshes to scene
	// meshes["tent1"].position.set(-5, 0, 4);
	// scene.add(meshes["tent1"]);
	//
	// meshes["tent2"].position.set(-8, 0, 4);
	// scene.add(meshes["tent2"]);
	//
	// meshes["campfire1"].position.set(-5, 0, 1);
	// meshes["campfire2"].position.set(-8, 0, 1);
	//
	// scene.add(meshes["campfire1"]);
	// scene.add(meshes["campfire2"]);
	//
	// meshes["pirateship"].position.set(-11, -1, 1);
	// meshes["pirateship"].rotation.set(0, Math.PI, 0); // Rotate it to face the other way.
	// scene.add(meshes["pirateship"]);

	// player weapon
	meshes["playerweapon"] = models.uzi.mesh.clone();
	meshes["playerweapon"].position.set(0,2,0);
	meshes["playerweapon"].scale.set(10,10,10);
	scene.add(meshes["playerweapon"]);
}

function animate(){

	// Play the loading screen until resources are loaded.
	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);

		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

	requestAnimationFrame(animate);

	var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.02;
	// crate.rotation.y += 0.01;
	// Uncomment for absurdity!
	// meshes["pirateship"].rotation.z += 0.01;

	// go through bullets array and update position
	// remove bullets when appropriate
	for(var index=0; index<bullets.length; index+=1){
		if( bullets[index] === undefined ) continue;
		if( bullets[index].alive == false ){
			bullets.splice(index,1);
			continue;
		}

		bullets[index].position.add(bullets[index].velocity);
	}

	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	// shoot a bullet
	if(keyboard[32] && player.canShoot <= 0){ // spacebar key
		// creates a bullet as a Mesh object
		var bullet = new THREE.Mesh(
			new THREE.SphereGeometry(0.03,8,8),
			new THREE.MeshBasicMaterial({color:0xffffff})
		);
		// this is silly.
		// var bullet = models.pirateship.mesh.clone();

		// position the bullet to come from the player's weapon
		bullet.position.set(
			meshes["playerweapon"].position.x,
			meshes["playerweapon"].position.y + 0.15,
			meshes["playerweapon"].position.z
		);

		// set the velocity of the bullet
		bullet.velocity = new THREE.Vector3(
			-Math.sin(camera.rotation.y),
			0,
			Math.cos(camera.rotation.y)
		);

		// after 1000ms, set alive to false and remove from scene
		// setting alive to false flags our update code to remove
		// the bullet from the bullets array
		bullet.alive = true;
		setTimeout(function(){
			bullet.alive = false;
			scene.remove(bullet);
		}, 1000);

		// add to scene, array, and set the delay to 10 frames
		bullets.push(bullet);
		scene.add(bullet);
		player.canShoot = 10;
	}
	if(player.canShoot > 0) player.canShoot -= 1;

	// position the gun in front of the camera
	meshes["playerweapon"].position.set(
		camera.position.x - Math.sin(camera.rotation.y + Math.PI/6) * 0.75,
		camera.position.y - 0.5 + Math.sin(time*4 + camera.position.x + camera.position.z)*0.01,
		camera.position.z + Math.cos(camera.rotation.y + Math.PI/6) * 0.75
	);
	meshes["playerweapon"].rotation.set(
		camera.rotation.x,
		camera.rotation.y - Math.PI,
		camera.rotation.z
	);

	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
