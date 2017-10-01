//
var img = new Image();
img.crossOrigin = "anonymous";
img.src = window.location.href.split('img=')[1];
img.onload = function() {

}


function init() {

	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	var clock = new THREE.Clock();

	var enableFog = true;

	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.01);
	}

	var plane = getPlane(30);
	var directionalLight = getDirectionalLight(1);
	var sphere = getSphere(0.05);
	// var box = getBox(1,1,1);


	// plane.name = 'plane-1';
	// boxGrid.name = 'boxGrid';

	plane.rotation.x = Math.PI/2;
	// mesh.position.y = .5
	directionalLight.position.x = 13;
	directionalLight.position.y = 10;
	directionalLight.position.z = 10;
	directionalLight.intensity = 2;

	scene.add(plane);
	directionalLight.add(sphere);
	scene.add(directionalLight);
	// scene.add( mesh );

	gui.add(directionalLight, 'intensity', 0, 10);
	gui.add(directionalLight.position, 'x', 0, 20);
	gui.add(directionalLight.position, 'y', 0, 20);
	gui.add(directionalLight.position, 'z', 0, 20);

	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 7;
	camera.position.x = -2;
	camera.position.y = 7;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	// var loader = new THREE.OBJLoader();
	// var textureLoader = new THREE.TextureLoader();


	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	update(renderer, scene, camera, controls);

	return scene;
}

function getSphere(material, size, segments) {
	var geometry = new THREE.SphereGeometry(size, segments, segments);
	var obj = new THREE.Mesh(geometry, material);
	obj.castShadow = true;

	return obj;
}

function getMaterial(type, color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};

	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		default:
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}

	return selectedMaterial;
}

function getSpotLight(intensity, color) {
	color = color === undefined ? 'rgb(255, 255, 255)' : color;
	var light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.penumbra = 0.5;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;  // default: 512
	light.shadow.mapSize.height = 2048; // default: 512
	light.shadow.bias = 0.001;

	return light;
}
function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.camera.left = -40;
	light.shadow.camera.bottom = -40;
	light.shadow.camera.right = 40;
	light.shadow.camera.top = 40;

	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;

	return light;
}

/*THREE.TextureLoader.prototype.crossOrigin = ''
var texture = new THREE.TextureLoader().load( img.src );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { map: texture } );
mesh = new THREE.Mesh( geometry, material );
*/
function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.receiveShadow = true;

	return mesh;
}

// BEGIN Clara.io JSON loader code
		var objectLoader = new THREE.ObjectLoader();
		objectLoader.load("lib/untitled-scene.json", function ( obj ) {
		THREE.TextureLoader.prototype.crossOrigin = ''
		obj.children[0].material.map = new THREE.TextureLoader().load( img.src );;

		obj.needsUpdate = true;
		obj.scale.x = 20;
		obj.scale.y = 20;
		obj.scale.z = 20;
		obj.position.z = 0;
		obj.position.y = .5;


	 	scene.add( obj );
	} );



function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}
var scene = init();
