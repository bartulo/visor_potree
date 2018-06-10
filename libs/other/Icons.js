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
		
	}
	
	startInsertion () {
		
		viewer.inputHandler.startDragging(this);
		
		let insertionCallback = (e) => {
			
			if (e.button === THREE.MOUSE.LEFT) {
				
				let coords = Potree.utils.getMouseCoordinates(e);
				
				if (coords) {
					
					this.init();
					this.insertListElement();
					
					this.position.set(coords.x, coords.y, coords.z + 100);
					viewer.scene.scene.add(this);
					
					$('.icon >li a').removeClass('active');
					document.removeEventListener('mouseup', insertionCallback, true);
				} else {
					$('.icon >li a').removeClass('active');
					document.removeEventListener('mouseup', insertionCallback, true);
				}
					
				
			} else if (e.button === THREE.MOUSE.RIGHT) {
				
				$('.icon >li a').removeClass('active');
				document.removeEventListener('mouseup', insertionCallback, true);
				
			} else {
				
				$('.icon >li a').removeClass('active');
				document.removeEventListener('mouseup', insertionCallback, true);
			}
				
		}
		
		document.addEventListener('mouseup', insertionCallback, true);
	}
	
	insertListElement () {
		
		let listElem = document.createElement('li');
		$(listElem).addClass('list-group-item');
		$(listElem).text(this.type);
		let closeButton = document.createElement('button');
		$(closeButton).text(' x');
		closeButton.type = 'button';
		$(closeButton).addClass('close');
		$(listElem).append(closeButton);
	
		listElem.addEventListener('mouseover', this.hoverIcon.bind(this), false);
		listElem.addEventListener('mouseout', this.unhoverIcon.bind(this), false);
		closeButton.addEventListener('click', this.eraseIcon.bind(this), false);
		
		this.listElem = listElem;
		$('.icon_list').append(listElem);

	}
	
	hoverIcon () {
		this.scale.set(20, 20, 20);
	}
	
	unhoverIcon () {
		this.scale.set(15, 15, 15);
	}
	
	eraseIcon () {
		viewer.scene.scene.remove(this);
		$(this.listElem).remove();
	}
	
	
}

Potree.utils.getMouseCoordinates = function(e) {
	
	let renderer = viewer.renderer;
	
	let camera = viewer.scene.getActiveCamera();
	let renderArea = $('#potree_render_area');
	let isVisible = renderArea.css('left') !== '0px';
	let xmod = null;

	if (isVisible) {
		xmod = e.clientX -  250;
	} else {
		xmod = e.clientX;
	}
	
	let nmouse = {
		x: (xmod  / renderer.domElement.clientWidth) * 2 - 1,
		y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1
	}
	
	var vector = new THREE.Vector3(nmouse.x, nmouse.y, 1);
	
	vector.unproject(camera);
	
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	
	var intersects = ray.intersectObjects( viewer.scene.scene.children );
	
	if (intersects.length > 0) {
		return intersects[0].point;
	} else {
		return null;
	}

}
