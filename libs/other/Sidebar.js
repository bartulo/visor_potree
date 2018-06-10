var interval;
$( document ).ready( function() {
	var icons = $('.icon').children();
	
	for ( i = 0; i < icons.length; i++ ) {
		icons[i].firstElementChild.addEventListener( 'click', iconClicked, false );
	}

	var colorButton = $(".colors").children();
	
	for ( i = 0; i < colorButton.length; i++ ) {
		colorButton[i].addEventListener( 'click', colorClicked, false );
	}
	
	$('#sliderColor')[0].addEventListener( 'change', function(){ grosor = this.value }, false );
	
	viewer.scene.scenePointCloud.children[3].visible = false;
	
	$('#layer_selection').find('input').click( (e) => { 
		if (e.target.value === 'mdt') {
			console.log(e.target.parent);
			viewer.scene.scene.children[3].visible = true;
			viewer.scene.scenePointCloud.children[3].visible = false;
		} else if ( e.target.value === 'lidar') {
			viewer.scene.scene.children[3].visible = false;
			viewer.scene.scenePointCloud.children[3].visible = true;
		}
	});
});


function iconClicked() {
	
	$('.icon >li a').removeClass('active');
	$('.colors >li').removeClass('active-color');
	
	$(this).addClass('active');
	
	let type = this.parentElement.dataset.img;
	
	let icon = new Potree.Icon();
	icon.type = type;
	
	icon.startInsertion();
	
}

function colorClicked(){

	// Remove class from currently active button
	$(".colors > li").removeClass("active-color");
	$('.icon >li a').removeClass('active');

	// Add class active to clicked button
	$(this).addClass("active-color");

	// Get background color of clicked
	color = $(this).attr("data-color");
	
	let line = new Potree.Paint();
	line.init();
};	

function hexToRgbA(hex){
	var c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c= hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c= '0x'+c.join('');
		return [((c>>16)&255)/255, ((c>>8)&255)/255, (c&255)/255];
	}
	throw new Error('Bad Hex');
}


