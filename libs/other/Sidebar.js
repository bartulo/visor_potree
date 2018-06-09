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
};	

