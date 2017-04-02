import './PointerLockControls';
import './MTLLoader';
import './OBJLoader';

export default class GameScene {
  constructor() {

    var camera, scene, renderer, clock;
    var geometry, material, mesh;
    var controls;
    var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02, canShoot:0 };
    var USE_WIREFRAME = false;
    var loadingManager = null;
    var RESOURCES_LOADED = false;


    // Models index
    var models = {
       uzi: { //модель пухи
         obj: "./models/uziGold.obj",
         mtl: "./models/uziGold.mtl",
         mesh: null,
         castShadow:false
       }
    };

    // Meshes index
    var meshes = {};

    // Bullets array
    var bullets = [];


    var objects = [];

    var raycaster;

    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );

    // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

      var element = document.body;

      var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

          controlsEnabled = true;
          controls.enabled = true;

          blocker.style.display = 'none';

        } else {

          controls.enabled = false;

          blocker.style.display = '-webkit-box';
          blocker.style.display = '-moz-box';
          blocker.style.display = 'box';

          instructions.style.display = '';

        }

      };

      var pointerlockerror = function ( event ) {

        instructions.style.display = '';

      };

      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

      instructions.addEventListener( 'click', function ( event ) {

        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();

      }, false );

    } else {

      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }



    var controlsEnabled = false;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

      clock = new THREE.Clock();

      //Lights

      var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
      light.position.set( 0.5, 1, 0.75 );
      scene.add( light );
      ////

      controls = new THREE.PointerLockControls( camera );
      scene.add( controls.getObject() );


      // загрузчик ресурсов (геометрия и меш моделей)
      loadingManager = new THREE.LoadingManager();
      loadingManager.onProgress = function(item, loaded, total){
          console.log(item, loaded, total);
      };
      loadingManager.onLoad = function(){
          console.log("loaded all resources");
          RESOURCES_LOADED = true;
          onResourcesLoaded();
      };
      ////

      //загрузка ресурсов в загрузчики
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
                      console.log("loaded mesh");

                  });
              });

          })(_key);
      }
       ////


        var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

          case 38: // up
          case 87: // w
            moveForward = true;
            break;

          case 37: // left
          case 65: // a
            moveLeft = true; break;

          case 40: // down
          case 83: // s
            moveBackward = true;
            break;

          case 39: // right
          case 68: // d
            moveRight = true;
            break;

          case 32: // space
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

        }

      };

      var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

          case 38: // up
          case 87: // w
            moveForward = false;
            break;

          case 37: // left
          case 65: // a
            moveLeft = false;
            break;

          case 40: // down
          case 83: // s
            moveBackward = false;
            break;

          case 39: // right
          case 68: // d
            moveRight = false;
            break;

          case 75: // k
            shoot();
            break;

        }

      };

      document.addEventListener( 'keydown', onKeyDown, false );
      document.addEventListener( 'keyup', onKeyUp, false );

      raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

      // floor

      geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
      geometry.rotateX( - Math.PI / 2 );

      for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

        var vertex = geometry.vertices[ i ];
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

      }

      for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

        var face = geometry.faces[ i ];
        face.vertexColors[ 0 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5 );
        face.vertexColors[ 1 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5 );
        face.vertexColors[ 2 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5);

      }

      material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      // objects

      geometry = new THREE.BoxGeometry( 20, 20, 20 );

      for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

        var face = geometry.faces[ i ];
        face.vertexColors[ 0 ] = new THREE.Color(0xC1876B);
        face.vertexColors[ 1 ] = new THREE.Color(0xC1876B);
        face.vertexColors[ 2 ] = new THREE.Color(0xC1876B);

      }

      for ( var i = 0; i < 20; i ++ ) {

        material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.floor( Math.random() * 30 - 10 ) * 10;
        mesh.position.y = Math.floor( Math.random() * 20 )  + 10;
        mesh.position.z = Math.floor( Math.random() * 30 - 10 ) * 10;
        scene.add( mesh );

        material.color.setHex(0xC1876B);

        objects.push( mesh );

      }

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0xffffff );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      // Enable Shadows in the Renderer
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      document.body.appendChild( renderer.domElement );

      //

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onResourcesLoaded(){
        // player weapon
        meshes["playerweapon"] = models.uzi.mesh.clone();
        meshes["playerweapon"].position.set(0,2,0);
        meshes["playerweapon"].scale.set(10,10,10);
        scene.add(meshes["playerweapon"]);
    }

    function bulletsStaff() {
      var time = Date.now() * 0.0005;
      var delta = clock.getDelta();

      // go through bullets array and update position
      // remove bullets when appropriate
      for(var index=0; index < bullets.length; index+=1){
          if( bullets[index] === undefined ) continue;
          if( bullets[index].alive == false ){
              bullets.splice(index,1);
              continue;
          }

          bullets[index].position.add(bullets[index].velocity);
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
    }

    function shoot() {
        // shoot a bullet
        if(player.canShoot <= 0){ // K key
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
    }

    function animate() {

      requestAnimationFrame( animate );


      bulletsStaff();

      if ( controlsEnabled ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );

        var isOnObject = intersections.length > 0;

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if ( moveForward ) velocity.z -= 400.0 * delta;
        if ( moveBackward ) velocity.z += 400.0 * delta;

        if ( moveLeft ) velocity.x -= 400.0 * delta;
        if ( moveRight ) velocity.x += 400.0 * delta;

        if ( isOnObject === true ) {
          velocity.y = Math.max( 0, velocity.y );

          canJump = true;
        }

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );

        if ( controls.getObject().position.y < 10 ) {

          velocity.y = 0;
          controls.getObject().position.y = 10;

          canJump = true;

        }

        prevTime = time;

      }

      renderer.render( scene, camera );

    }
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }
}
