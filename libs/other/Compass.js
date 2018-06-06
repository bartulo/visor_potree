THREE.Compass = function() {
	
	this.camera = viewer.scene.getActiveCamera();
	this.target = viewer.scene.view;
	
}

THREE.Compass.prototype = {
	
	constructor: THREE.Compass,
	
	init: function() {
		
		var container = document.createElement('div');
		$(container).attr('id', 'brujula');
		
		var elem = document.createElement('img');
		$(elem).attr('id', 'svg');
		$(elem).attr('src', 'images/compass.svg');
		$(elem).attr('width', '150px');
		$(elem).attr('height', '150px');
		
		container.append(elem);
		$('body').append(container);
		
		this.elem = elem;
		
	},
	
	update: function() {
		
		var vector = new THREE.Vector3();
		vector.copy( this.camera.position ).sub( this.target.getPivot() );
		if (this.camera.rotation._x == 0) {
			var rot = this.camera.rotation._z*(-1);	
			this.elem.style.transform = 'rotate('+ (rot*(-1) + Math.PI) +'rad)';
			console.log('j');
		} else {
			var rot = Math.atan2( vector.x, vector.y );
			this.elem.style.transform = 'rotate('+ rot*(-1) +'rad)';
		}
	}
}
