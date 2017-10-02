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
		// function myFunc(id){
		// 		//  alert(id);
		// 		obj.children[0].material.color.r = id.r;
		// 		obj.children[0].material.color.r = id.g;
		// 		obj.children[0].material.color.r = id.b;
		//
		// 		obj.children[2].material.color.r  = id.r;
		// 		obj.children[2].material.color.g  = id.g;
		// 		obj.children[2].material.color.b  = id.b;
		// 	}



		// BEGIN Clara.io JSON loader code
		var objectLoader = new THREE.ObjectLoader();
		objectLoader.load("lib/insert.json", function ( obj ) {
		THREE.TextureLoader.prototype.crossOrigin = ''
		obj.children[1].material.map = new THREE.TextureLoader().load( img.src );
		// obj.children[2].color = 0xffffff;
		// console.log(obj.children[1].material.map)

		obj.needsUpdate = true;
		obj.scale.x = 8;
		obj.scale.y = 8;
		obj.scale.z = 8;
		obj.position.z = 0;
		obj.position.y = .5;

		var red = {r: 240, g: 95, b: 87};
		var orange = {r: 240, g: 152, b: 25};
		var yellow = {r: 253, g: 235, b: 113};
		var green = {r: 40, g: 199, b: 111};
		var blue = {r: 0, g: 0, b: 255};
		var purple = {r: 159, g: 68, b: 211};
		var black = {r: 0, g: 0, b: 0};
		var white = {r: 255, g: 255, b: 255};

		$("#red").click(function(){
			obj.children[0].material.color.setHex(0xF05F57)
			obj.children[2].material.color.setHex(0xF05F57)
		})

		$("#orange").click(function(){
			obj.children[0].material.color.setHex(0xf09819)
			obj.children[2].material.color.setHex(0xf09819)
		})

		$("#yellow").click(function(){
			obj.children[0].material.color.setHex(0xF8D800)
			obj.children[2].material.color.setHex(0xF8D800)
		})

		$("#green").click(function(){
			obj.children[0].material.color.setHex(0x28C76F)
			obj.children[2].material.color.setHex(0x28C76F)
		})

		$("#blue").click(function(){
			obj.children[0].material.color.setHex(0x6B73FF)
			obj.children[2].material.color.setHex(0x6B73FF)
		})

		$("#purple").click(function(){
			obj.children[0].material.color.setHex(0x9F44D3)
			obj.children[2].material.color.setHex(0x9F44D3)
		})

		$("#black").click(function(){
			obj.children[0].material.color.setHex(0x000000)
			obj.children[2].material.color.setHex(0x000000)
		})

		$("#white").click(function(){
			obj.children[0].material.color.setHex(0xffffff);
			obj.children[2].material.color.setHex(0xffffff);
		})

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
