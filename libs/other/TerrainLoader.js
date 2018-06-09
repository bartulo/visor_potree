/**
 * @author Bjorn Sandvik / http://thematicmapping.org/
 */

THREE.TerrainLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
	
	this.mdt = 'images/mdt.bin';
	this.pnoa = 'images/pnoa.jpg';
	this.res = '399';
	this.size = '2000';
	this.coordinates = '';
	this.scene = viewer.scene.scene;

};

THREE.TerrainLoader.prototype = {

	constructor: THREE.TerrainLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;
		var request = new XMLHttpRequest();

		if ( onLoad !== undefined ) {

			request.addEventListener( 'load', function ( event ) {

				onLoad( new Uint16Array( event.target.response )  );
				scope.manager.itemEnd( url );

			}, false );

		}

		if ( onProgress !== undefined ) {

			request.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			request.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) request.crossOrigin = this.crossOrigin;

		request.open( 'GET', url, true );

		request.responseType = 'arraybuffer';

		request.send( null );

		scope.manager.itemStart( url );

	},
	
	init: function() {
		
		var self = this;
		
		this.load(this.mdt, function(data) {
			
			var texture = new THREE.TextureLoader().load(self.pnoa);
			
			var material = new THREE.MeshBasicMaterial( {map: texture} );
			
			var geometry = new THREE.PlaneGeometry(self.size, self.size, self.res, self.res);
			
			for (var i = 0, l = geometry.vertices.length; i < l; i++) {

				geometry.vertices[i].z = data[i]  ;

			}
			
			plane = new THREE.Mesh(geometry, material);
	
			plane.position.set(self.coordinates[0], self.coordinates[1], self.coordinates[2]);
			
			viewer.scene.scene.add(plane);
	
			self.scene.add(plane);
			
			console.log(plane.position)
		});
	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

};
