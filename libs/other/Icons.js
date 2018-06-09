Potree.Icon = class Icon extends THREE.Object3D {

	constructor () {
		super();
		
		this.type = null;
		this.coords = null;
	}
		
	init () {

	    var spriteMap = new THREE.TextureLoader().load("images/iconos/" + this.type + ".png");
	    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	    var sprite = new THREE.Sprite( spriteMaterial);
	    
	    sprite.scale.set( 8, 8, 8 );
	    
	    this.add(sprite);
	    
	    var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
			linewidth: 4
		});
		
		var geometry = new THREE.Geometry();
		
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( 0, 0, -10 )
		);
		
		var line = new THREE.Line( geometry, lineMaterial );
		
		this.add(line);
		
		this.scale.set(15, 15, 15);
		//~ this.position.set(coords.x, coords.y, coords.z + 10);
		
	}
	
	startInsertion () {
		
		viewer.inputHandler.startDragging(this);
		
		let insertionCallback = (e) => {
			
			if (e.button === THREE.MOUSE.LEFT) {
			
				let coords = Potree.utils.getMouseCoordinates(e);
				this.position.set(coords.x, coords.y, coords.z + 100);
				viewer.scene.scene.add(this);
				
				document.removeEventListener('mouseup', insertionCallback, true);
				
			} else if (e.button === THREE.MOUSE.RIGHT) {
				
				document.removeEventListener('mouseup', insertionCallback, true);
				
			}
				
		}
		
		document.addEventListener('mouseup', insertionCallback, true);
	}
	
	
}

Potree.utils.getMouseCoordinates = function(e) {
	
	let renderer = viewer.renderer;
	
	let camera = viewer.scene.getActiveCamera();
	
	let nmouse = {
		x: (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
		y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1
	}
	
	var vector = new THREE.Vector3(nmouse.x, nmouse.y, 1);
	
	vector.unproject(camera);
	
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	
	var intersects = ray.intersectObjects( viewer.scene.scene.children );
	return intersects[0].point;

}
