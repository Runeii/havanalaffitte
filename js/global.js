function pageInit(){
	//Position Tabs
	positionTabs();

	//Check Scroll position
	scrollColours();

	//Toggle Mob Menu
	$('#toggle_menu').click(function(){
		if ($('#mob_menu').hasClass('open')) {
			$('#mob_menu').removeClass('open');
			$(this).html('Menu');
		} else {
			$('#mob_menu').addClass('open');
			$(this).html('Close');
		}
	})

	//Toggle Tabs
	$('.tab-title').click(function(){
		var $this = $(this);
		var $content = $this.parent().parent().parent().find('.content');
		if( $($content).is(':visible') ) {
			$($content).hide();
		} else {
			$($content).show();
			setTimeout(function(){
				$('html, body').animate({
		        	scrollTop: $this.offset().top - 60
		    	}, 500);
			},200);
		}
	});

	//Slideshow
	var $slideshow = new Swiper('.swiper-container', {
		effect: 'fade',
		loop: true,
		simulateTouch: false,
		speed: 1000,
		autoplay: {
		    delay: 5000,
		},
		preloadImages: false,
	    lazy: {
	    	loadPrevNext: true
	    },
	    on: {
	    	slideChangeTransitionStart: function(){
	    		var $activeslide = $('.swiper-slide-active');
	    		if( $activeslide.hasClass('white') ) {
	    			$('#site_header, #slideshow .title').addClass('white');
	    		} else {
	    			$('#site_header, #slideshow .title').removeClass('white');
	    		}
	    	}
	    }
	});

	//Thumbnail Titles
	$('.image_thumb').hover(function(){
		var $colours = Array('yellow','#39FF14','#FF9933','#ff0099');
		var $colour = $colours[Math.floor(Math.random()*$colours.length)];
		var $title = $(this).attr('data-hover-text');
		$('#lightbox_title').html($title);
		$('#lightbox_title').css('color',$colour);
	}, function(){

	})

	$('.image_thumb').click(function(){
		$('#lightbox_intro').addClass('open');
		setTimeout(function(){
			$('#lightbox_intro').removeClass('open');
		},1000);
	});

	//Submenu
	$('.menu .sub-menu a').click(function(e){
		e.preventDefault();
		setTimeout(function(){
			$('html, body').animate({
	        	scrollTop: $('#work').offset().top
	    	}, 500);
		},200);
		var $cat = $(this).attr('data-cat');
		$(this).addClass('active');
		$(this).parent().siblings().find('a').removeClass('active');
		$('.image_thumb').each(function(){
			if ( $(this).parent().parent().hasClass($cat) ) {
				$(this).parent().parent().show();
				$(this).addClass('lightbox-include');
			} else {
				$(this).parent().parent().hide();
				$(this).removeClass('lightbox-include');
			}
		});
		$('#work').photoSwipe('update');
	})

	//Photoswipe
	var slideSelector = 'img.lightbox-include',
      options     = {
        bgOpacity: 0.95,
        closeEl:false,
        captionEl: true,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: false,
        arrowEl: false,
        preloaderEl: false,
        closeOnScroll: false,
        arrowKeys: true,
        history: false,
        maxSpreadZoom: 1,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        barsSize: {top:50, bottom:50},
        getDoubleTapZoom: function(isMouseClick, item) {
          return item.initialZoomLevel;
        }
      },
      events = {
        initialZoomInEnd: function () {
          $('#lightbox_header, #lightbox_footer').addClass('open');
        },
        afterChange: function(){
          var $imagecaption = $('.pswp__ui .pswp__caption .pswp__caption__center').last().html();
          $('#lightbox_caption').html($imagecaption);
        },
        close: function () {
          $('#lightbox_header, #lightbox_footer').removeClass('open');
        }
    };
    $('#work').photoSwipe(slideSelector, options, events);

    //Photoswipe Controls
    $('#lightbox_close').click(function(){
      $('.pswp__button--close').click();
    });
    $('#lightbox_prev').click(function(){
      $('.pswp__button--arrow--left').click();
    });
    $('#lightbox_next').click(function(){
      $('.pswp__button--arrow--right').click();
    });

    //Scroll Links
    $('a.scroll').click(function(e){
    	e.preventDefault();
    	var $target = $(this).attr('href');
    	$('html, body').animate({
		       scrollTop: $($target).offset().top
		}, 500);
		$('#mob_menu').removeClass('open');
		$('#toggle_menu').html('Menu');
    })
}

$(document).ready(function(){
	pageInit();
});

$(window).resize(function(){
	//Position Tabs
	positionTabs();
})

$(window).scroll(function(){
	scrollColours();
})

function scrollColours(){
	var $slideshowHeight = $('#slideshow').height() - 1;
	var $currentScroll = $(document).scrollTop();
	if($currentScroll > $slideshowHeight) {
		$('#site_header').addClass('past-slideshow');
	} else {
		$('#site_header').removeClass('past-slideshow');
	}
}

function positionTabs(){
	var $windowHeight = $(window).height();
	var $infoHeight = $('#information .tab-title').first().height() * 3;
	var $margin = ( $windowHeight - $infoHeight ) / 2;
	$('#information').css('margin-top', $margin);
}