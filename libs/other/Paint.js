Potree.Paint = class Paint extends THREE.Line2 {
	constructor () {
		super();
		
		this.scene = viewer.scene.scene;
		this.domElement = viewer.renderer.domElement;
	}
	
	init() {
		this.geometry = new THREE.LineGeometry();
		this.material = new THREE.LineMaterial( {
		
				color: 0xffffff,
				linewidth: grosor, // in pixels
				vertexColors: THREE.VertexColors,
				//resolution:  // to be set by renderer, eventually
		
		} );
		this.material.resolution.set( window.innerWidth, window.innerHeight );
		
		this.scale.set( 1, 1, 1 );

		this.scene.add(this);

		let insertion = (e) => {
				
				if (e.button === THREE.MOUSE.LEFT) {
					
					let coords = Potree.utils.getMouseCoordinates(e);
					
					if (coords) {
						
						console.log(coords);
						var c = hexToRgbA(color);
			            colors.push( c[0], c[1], c[2]);
			            positions.push( coords.x, coords.y, coords.z + 2);
			            
			            this.geometry.setPositions( positions );
			            this.geometry.setColors( colors );
			            this.geometry.maxInstancedCount = count;
			            
						count ++;
						
						//~ this.insertListElement();
						
					} else {

						this.domElement.removeEventListener('mousedown', startInsertion, false);
						this.domElement.removeEventListener('mousemove', insertion, false);
						this.domElement.removeEventListener('mouseup', endInsertion, false);
						$('.colors >li').removeClass('active-color');
	
					}	
											
					
				} else if (e.button === THREE.MOUSE.RIGHT) {
					
					$('.colors >li').removeClass('active-color');
					
				} else {
					$('.colors >li').removeClass('active-color');
				}
					
		}

		let startInsertion = (e) => {
	
			viewer.inputHandler.startDragging(this);
			this.domElement.addEventListener('mousemove', insertion, false);
		}
			
			
		let endInsertion = (e) => {
				
				count = 0;
				positions = [];
				colors =[];
				this.domElement.removeEventListener('mousedown', startInsertion, false);
				this.domElement.removeEventListener('mousemove', insertion, false);
				this.domElement.removeEventListener('mouseup', endInsertion, false);
				this.insertListElement();
				$('.colors >li').removeClass('active-color');
		}
		
		this.domElement.addEventListener('mousedown', startInsertion, false);
		this.domElement.addEventListener('mouseup', endInsertion, false);
	
	}
	
	insertListElement () {
		
		let listElem = document.createElement('li');
		$(listElem).addClass('list-group-item');
		$(listElem).text('Linea');
		let closeButton = document.createElement('button');
		$(closeButton).text(' x');
		closeButton.type = 'button';
		$(closeButton).addClass('close');
		$(listElem).append(closeButton);
	
		listElem.addEventListener('mouseover', this.hoverLine.bind(this), false);
		listElem.addEventListener('mouseout', this.unhoverLine.bind(this), false);
		closeButton.addEventListener('click', this.eraseLine.bind(this), false);
		
		this.listElem = listElem;
		$('.lines').append(listElem);

	}
	
	hoverLine () {
		
		self = this;
		
		interval = setInterval( function() {
			if ( self.material.visible ) {
				
				self.material.visible = false;
				
			} else {
				
				self.material.visible = true;
			}
		}, 160);
	}
	
	unhoverLine () {
		
		clearInterval( interval );
		
		this.material.visible = true;
	}

	eraseLine () {
		
		clearInterval( interval );
		this.listElem.remove();
		
		viewer.scene.scene.remove(this);
	}

			
}
	

