//
var img = new Image();
img.crossOrigin = "anonymous";
img.src = window.location.href.split('img=')[1];

// function init() {

	var scene = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);

	// scene.background = new THREE.Color( '#AAAFD1' );
	renderer.setClearColor(0x000000, 0.0);

	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);


	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0, -1, -1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(-1, -1, 0);
	scene.add(directionalLight);

	camera.position.z = 50;
	camera.position.y = 20;

controls = new THREE.OrbitControls(camera);
controls.addEventListener('change', render);

var render = function () {
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};

render();
renderer.setSize($(window).width(), $(window).height());


document.getElementById('webgl').appendChild(renderer.domElement);

		// BEGIN Clara.io JSON loader code
		var objectLoader = new THREE.ObjectLoader();
		objectLoader.load("lib/insert.json", function ( obj ) {
		THREE.TextureLoader.prototype.crossOrigin = ''
		obj.children[1].material.map = new THREE.TextureLoader().load( img.src );;
		// console.log(obj.children[1].material.map)
		obj.needsUpdate = true;
		obj.scale.x = 8;
		obj.scale.y = 8;
		obj.scale.z = 8;
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
// var scene = init();
