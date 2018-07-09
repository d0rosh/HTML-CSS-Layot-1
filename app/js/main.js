(function(){
	// loader in site script
	$(window).on('load', function(){
		$('.loader').css({'display':'none'});
	});

	// click search icon / show input
	$('.search').click(function(){
		$('.search-field').slideToggle()
	});

	$('.close').click(function(){
		$('.search-field').slideToggle()
	})

	// add down arrow icon to li where is the submenu
	$('.menu ul li > ul').css({'display':'none'}).parent().append("<span class='arrow-li'></span>").addClass('isSumbenu');

	// show submenu 
	$('.isSumbenu').click(function(evt){
		$(this).find('span').toggleClass('rotate-arrow');
		$(this).children('ul').slideToggle();
	});

	// open hamburger icon
	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
		$('.menu').slideToggle();
		$('.my-settings').slideToggle();
		if ($(this).hasClass('open')) {
			$('header').addClass('h-pouring');
		}else {
			$('header').removeClass('h-pouring');
		}
	});

	// change color in svg img
	$('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });




	$(window).resize(function(){
		let width = $(window).width();
		if($('.nav-icon').hasClass('open') && width > 768){
			$('header').removeClass('h-pouring');
		}else if($('.nav-icon').hasClass('open') && width < 768){
			$('header').addClass('h-pouring');
		}

		let title = $('.title-form');
		width < 480 ? title.html('Зворотній зв’язок') : title.html('Форма реєстрації');
		visibleBtnTop();
	});

	// hover efects in goods section
	$('.overlay-block').hover(function(){
		let self = $(this)
		$(this).children('.hover-block').css({'opacity':'0.9'}).removeClass('animated zoomOut').addClass('animated zoomIn');
	},function(){
		$(this).children('.hover-block').css({'opacity':'0'}).removeClass('animated zoomIn').addClass('animated zoomOut');
	})




	// big-slider script options
	$('#big-slider').owlCarousel({
    loop:true,
	    nav:false,
	    items: 1,
	    dots: true,
	    dotsContainer: '.custom-dots',
	    autoplay: true,
	    autoplayTimeout: 10000
	})

	// SlectBox plugin options
	$('.SlectBox').SumoSelect();

	//Datepicker plugin options
	$('[data-toggle="datepicker"]').datepicker();

	// scroll to top 
	 $('.top-btn').on('click', function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false; 
 	});

	$(window).scroll(function(){
	 	visibleBtnTop()
	})

	 function visibleBtnTop(){
	 	let topBtn =  $('.top-btn');
	 	$(this).scrollTop() > 500 ? topBtn.fadeIn() : topBtn.fadeOut();
	 }

}());