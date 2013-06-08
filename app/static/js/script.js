/*************************************************************************/
//Config Settings
/*************************************************************************/

//Your Twitter username
var twitter_username = 'stancedata';

//Base Color
var base_color = '#9dc500';

//Google Maps Coordinates
var google_maps_latitude = 38.707126;
var google_maps_longitude = -9.135499;


/*************************************************************************/
//End config settings

//Don't edit below this lime unless you have Javascript skills
/*************************************************************************/


$(document).ready(function() {
	
	/* Slideshow Init */

	slideshow();
	
	
	/* End Slideshow */
	
	
	var body_height = $('body').height();
	var footer_height = $('footer').height();
	
	//Google Maps
	
	if ($('#contact_map').length)
	{
		startGmap();
		$('.contact_map').css({ 'height' : (body_height-footer_height) });
	}
	
	

	/*************************************************************************/
	//Comments list buttons css
	/*************************************************************************/
	
		$('.commentlist ul.children').prev('li.comment').css({'border-bottom' : 0});
		$('.commentlist ul.children').next('li.comment').before('<li class="separator"></li>');
	
	
	/*************************************************************************/
	// Begin Accordion script
	/*************************************************************************/
	
		$('.accordion-item').hide();
		
		$('.accordion h4').click(function() {
			
			if ( $(this).hasClass('active') )
			{
				
				$(this).removeClass('active').children('i').text('+');
				$(this).next('.accordion-item').slideUp('fast');
			}
			
			else
			{
				
				if ( !$(this).parents('.accordion').hasClass('toggle') )
				{
					$('.accordion-item').slideUp('fast');
					$('.accordion h4').removeClass('active').children('i').text('+');;
				}
				
				$(this).addClass('active').children('i').html('&ndash;');
				$(this).next('.accordion-item').slideDown('fast');
			}
			
		}).prepend('<i>+</i> ');
	
	/*************************************************************************/
	// End Accordion script
	/*************************************************************************/
	
	
	
	/*************************************************************************/
	// Begin Carrousel script
	/*************************************************************************/
	
		$('.slideshow-last-work ul').jcarousel({
			scroll : 1,
			start : 2,
			itemFallbackDimension: 300,
			initCallback: function() {
				
				current = 1;
				
				$('.slideshow-last-work ul li:not(:eq('+current+'))').css({'opacity':0.3});
				
				$('.slideshow-last-work .jcarousel-next, .slideshow-last-work .jcarousel-prev').appendTo('.slideshow-last-work');
				
				$('.slideshow-last-work .jcarousel-next').click(function() {
					
	    			if (!$(this).hasClass('jcarousel-next-disabled'))
					{
						$('.slideshow-last-work ul li:eq('+current+')').animate( {'opacity' : 0.3}, { duration : 250, queue : false } );
						current++;
						$('.slideshow-last-work ul li:eq('+current+')').animate( {'opacity' : 1}, { duration : 500, queue : false});
					}
	    			
				});
				
				$('.slideshow-last-work .jcarousel-prev').click(function() {
					
	    			if (!$(this).hasClass('jcarousel-prev-disabled'))
					{
						$('.slideshow-last-work ul li:eq('+current+')').animate( {'opacity' : 0.3}, { duration : 250 } );
						current--;
						$('.slideshow-last-work ul li:eq('+current+')').animate( {'opacity' : 1}, { duration : 500});
					}
	    			
				});
				
			}
			
		});
	
		function mycarousel_initCallback(carousel) {
			
			var id_list = $(carousel.list).attr('id');
			var data_items = parseInt($(carousel.list).attr('data-items'));
			
			var total_items = parseInt($('.' + id_list + ' li.jcarousel-item').length);
			var i = 0;
			
			for (i=(total_items-(data_items-1)); i>0; i--)
			{
				$('nav[data-carousel=' + id_list + '] ul').append('<li><a href="#">' + i + '</a></li>');
			}	
			
			$('nav[data-carousel=' + id_list + '] ul li:last-child a').addClass('active');
			
		    $('nav[data-carousel=' + id_list + '] ul li a').bind('click', function() {
		    	    	
				current = parseInt($(this).text());
		    	
		        carousel.scroll($.jcarousel.intval(current));
		       
		        
		        $('nav[data-carousel=' + id_list + '] ul li a').removeClass('active');
		        $(this).addClass('active');
		        return false;
		    });
		
		};
		
	
		$('.blog-posts-small, .services-customers').jcarousel({
			scroll : 1,
			easing : 'easeInOutQuad',
			animation : 500,
			initCallback: mycarousel_initCallback,
			buttonNextHTML: null,
	        buttonPrevHTML: null,
	        itemFallbackDimension: 300
	
		});
	
	
	/*************************************************************************/
	// End Carrousel script
	/*************************************************************************/
	
	
	

	/*************************************************************************/
	// Begin Tweets script
	/*************************************************************************/
	
		var_total_tweets = 8;
		
		$(".widget-twitter").tweet({
			join_text: "",
			count: var_total_tweets,
			loading_text: "loading tweets...",
			username: twitter_username,
			template: "{text}{join}{time}"
		}).bind('loaded', function() {
			$('.widget-twitter li:gt(1)').hide();
		});
		
		$("footer .twitter-feed").tweet({
			join_text: "",
			count: 2,
			loading_text: "loading tweets...",
			username: twitter_username,
			template: "{text}{join}{time}"
		})
		
		$('a.more-tweets').click(function() {
			
			count = $('.widget-twitter li:visible').length;
			
			$('.widget-twitter li').slice(count,(count+2)).slideDown('fast');
			
			if (var_total_tweets == (count+2))
			{
				$('a.more-tweets').fadeOut('fast');
			}
			
			return false;
		});
	
	/*************************************************************************/
	// End Tweets script
	/*************************************************************************/



	
	/*************************************************************************/
	// Begin Portfolio filter script
	/*************************************************************************/
	
		var $filterType = $('.left_nav a.selected').attr('rel');
		var $holder = $('.portfolio-filter');
		var $data = $holder.clone();
		
	
		//Add the click event to element filter
		$('.left_nav a').click(function(e) {
			
			$('.left_nav a').removeClass('selected');
			
			var $filterType = $(this).attr('rel');
			$(this).addClass('selected');
			
			if ($filterType == 'all') 
			{
				var $filteredData = $data.find('.grid-3-2, .grid-2');
			} 
			else 
			{
				var $filteredData = $data.find('.grid-3-2[data-type=' + $filterType + '], .grid-2[data-type=' + $filterType + ']');
			}
			
			// do the magic width the filtered data
			$holder.quicksand($filteredData, {
				duration: 800,
				easing: 'easeInOutQuad'},
				function(){
					
					//if ie8 reload script to recognize somo properties
					if($.browser.msie && $.browser.version<9)
					{
						$.getScript('js/libs/selectivizr-min.js',function(data,textStatus,jqxhr){});
					}
					//re-run slider folio
					slider_folio_filter();
					$('.portfolio-filter').css('height','auto');
			});
			
	
			return false;
			
		});
	
	/*************************************************************************/
	// End Portfolio filter script
	/*************************************************************************/
	

	
	

	/*************************************************************************/
	// Begin Layout
	/*************************************************************************/
	
		/* menu */
		$('header nav li').has('ul').addClass('subnav');
	

	/*************************************************************************/
	// End Layout
	/*************************************************************************/
	
	

  	/*************************************************************************/
	// Begin horizontal tab
	/*************************************************************************/
		$(".horizontal_tab").idTabs(function(id,list,set){
			$(".tab-horizontal a",set).removeClass("selected").filter("[href='"+id+"']",set).addClass("selected");
			
			$(".tab-horizontal a").css('border-right','1px solid #dedede');
			$(".tab-horizontal a").filter("[href='"+id+"']").css('border-right','1px solid #BFC2C4');
			
			$(".tab-horizontal a").filter("[href='"+id+"']").parent().prev().find("a").css('border-right','none');
			
			for(i in list)
				$(list[i]).hide();
			$(id).fadeIn(500);
			return false;
		});
	/*************************************************************************/
	// End horizontal tab
	/*************************************************************************/
	
	
	
	/*************************************************************************/
	// Begin vertical tab
	/*************************************************************************/
	
		/* Tab with box's*/
		$(".vertical_tab").idTabs(function(id,list,set){
			$(".tab-vertical li").first().css('border-top-color','#dedede');
			
			$(".tab-vertical a").css('border-right-color','#bfc2c4');
			$(".tab-vertical a",set).removeClass("selected").filter("[href='"+id+"']",set).addClass("selected");
			
			$(".tab-vertical a").css('border-bottom-color','#dedede');
			
			$(".tab-vertical a").filter("[href='"+id+"']").css('border-bottom-color','#bfc2c4');
			$(".tab-vertical a").filter("[href='"+id+"']").parent().prev().find("a").css('border-bottom-color','#bfc2c4');
		
			if($(".tab-vertical a").filter("[href='"+id+"']").parent().prev().length == 0)
				$(".tab-vertical a").filter("[href='"+id+"']").parent().css('border-top-color','#BFC2C4');
			
			for(i in list)
				$(list[i]).hide();
			$(id).fadeIn(800);
			return false;
		}); 

		/* Simple Tab*/
		$(".vertical-text").idTabs(function(id,list,set){
			
			$('.tab-vertical-text li').removeClass("selected");
			$(".tab-vertical-text a",set).removeClass("selected").filter("[href='"+id+"']",set).addClass("selected");
			$(".tab-vertical-text a").filter("[href='"+id+"']").parent().addClass('selected');
	
			for(i in list)
			{
				$(list[i]).hide();
			}
				
			$(id).fadeIn(800);
			return false;
		}); 
		
	/*************************************************************************/
	// End vertical tab
	/*************************************************************************/
	
	
	/*************************************************************************/
	// Begin newsletter validation
	/*************************************************************************/
	
		
		
	/*************************************************************************/
	// End newsletter validation
	/*************************************************************************/

	$('.newsletter form').submit(function() {
		var form_data = $(this).serialize();
		var email = $('footer form input').val();
		
		if(!checkEmail(email))
		{
			
			$('footer form button').css({'color':'red','opacity':0.6});
			return false;
		}
		else
			$('footer form button').css({'color':'#D9DCDF'});
		
		return false;
	});
	
	$('.trigger-contact-form').click(function() {
		
		if ( $('.contact-form-toggle').hasClass('opened') )
		{
			$('.contact-form-toggle').slideUp('fast').removeClass('opened');
			$('.contact-close').hide();
		}
		
		else 
		{
			$('.contact-close').show();
			$('.contact-form-toggle').slideDown('fast').addClass('opened');
		}
		
	});
	
	$('.contact-close').click(function() {
		$('.contact-form-toggle').slideUp('fast').removeClass('opened');
		$('.contact-close').hide();
		return false;
	});
	
	
	
	/*************************************************************************/
	// Begin contact form valation
	/*************************************************************************/
		$('#contact-form').validate({
	
			rules:
			{
				name: "required",
				subject: "required",
				message: {
					required: true,
					minlength: 1
				},
				email: {
						required: true,
						email: true
				}
			},
			errorPlacement:function(error,element)
			{
					$(element).prev().find('em').addClass('error');
					$(element).addClass('error');
			},
			showErrors: function(errorMap, errorList)
			{
				
				$('#contact-form').find('input').each(function(index){
					if(!$(this).hasClass('error'))
						$(this).prev().find('em').removeClass('error');
				});
				
				$('#contact-form').find('textarea').each(function(index){
					if(!$(this).hasClass('error'))
						$(this).prev().find('em').removeClass('error');
				});
				
				for(var i =0; i< errorList.length;i++)
				{
					var element = errorList[i].element;
					$(element).prev().find('em').addClass('error');
					$(element).addClass('error');
				}
				this.defaultShowErrors();
			},
			submitHandler:function(){
				var form_data = $('#contact-form').serialize();
				
				$.post($('#contact-form').attr('action'), form_data, function(data){
					$('form').fadeOut('slow',function() { $('.contact-message').css('display',''); $('.contact-message').html('<p>'+data+'</p>')/*$(this).after('<p>'+data+'</p>')*/ });
				});
				return false;
			}
		
		});
	/*************************************************************************/
	// End contact form valation
	/*************************************************************************/
	
	
	
	
	/*************************************************************************/
	// Begin Blog Comment form valation
	/*************************************************************************/
		$('#blog-comment').validate({
	
			rules:
			{
				name: "required",
				subject: "required",
				message: {
					required: true,
					minlength: 1
				},
				email: {
						required: true,
						email: true
				}
			},
			errorPlacement:function(error,element)
			{
					$(element).prev().find('em').addClass('error');
					$(element).addClass('error');
			},
			showErrors: function(errorMap, errorList)
			{
				
				$('#blog-comment').find('input').each(function(index){
					if(!$(this).hasClass('error'))
						$(this).prev().find('em').removeClass('error');
				});
				
				$('#blog-comment').find('textarea').each(function(index){
					if(!$(this).hasClass('error'))
						$(this).prev().find('em').removeClass('error');
				});
				
				for(var i =0; i< errorList.length;i++)
				{
					var element = errorList[i].element;
					$(element).prev().find('em').addClass('error');
					$(element).addClass('error');
				}
				this.defaultShowErrors();
			}
		});
	/*************************************************************************/
	// Begin Blog Comment form valation
	/*************************************************************************/

		
	
	
	
	/*************************************************************************/
	// Begin Progress Bar
	/*************************************************************************/
		$('.progress-bar').each(function(index) {
	    	width_inner = $(this).find('div span').text();
	    	$(this, 'div').children('div').animate({'width' : width_inner + '%', 'opacity' : 1}, 2000);
		});
	/*************************************************************************/
	// End Progress Bar
	/*************************************************************************/
	
	
	
	/*************************************************************************/
	// Begin Mobile menu button
	/*************************************************************************/
	
		
		$('a.bt-nav-close').live('click',function(event){
			close_nav();
			return false;
		});
		
		/* Add click action to button */
		$('a.menu-mobile').click(function() {
			open_nav();
			return false;
		});
	
	
		/* close menu  */
		$('header nav').bind( "clickoutside", function(event){
			close_nav();
		});
	
	/*************************************************************************/
	// End Mobile menu button
	/*************************************************************************/
	
	
	
	/*************************************************************************/
	// Begin plugins initialization
	/*************************************************************************/
	
		/* scrool to top option */
		//if(!isIpad(true))
			$().UItoTop({easingType: 'easeOutQuart'});
		
		
		/* scrool to top simple link */
		$('.back-to-top').click(function(){
			$('html,body').animate({scrollTop:0},'slow');
		})
		

		/* lionbars effect to awards section*/
		if(!($.browser.msie && $.browser.version < 9))
		{
			$('.awards').lionbars('false');
		} 
	
		/* Orbit slideshow */
		$('.orbit').orbit({timer: true});
	
		/* Tooltip tipsy */
		$('.tooltip').tipsy({fade: true, gravity: $.fn.tipsy.autoWE });
	
		
		/* slider portfolio */
		$('.slider-folio:not(.no-slide")').TransBanner({
			navigation_type: 2,	
			button_opacity: .4,
			dot_button_dark: true,		
			dot_button_margin: 0,
			dot_button_bg_blur:false,
			dot_button_space : 1,
			dot_button_size	: 29,
		
			responsive : true,
			responsive_limit_autoplay : '', 
			responsive_limit_navigation_type : 2, 
			responsive_screen_based_limits : true 
		});	
		
	
		
		/* slider media */
		$('.slider-media').TransBanner({
			navigation_type: 2,	
			button_opacity: .4,
			dot_button_dark: true,		
			dot_button_margin: 0,
			dot_button_bg_blur:false,
			dot_button_space : 1,
			dot_button_size	: 29,
			responsive : true,
			responsive_limit_autoplay : '', 
			responsive_limit_navigation_type : 2, 
			responsive_screen_based_limits : true 
		});	
	
		
		/* Main Slider */
		$('.main-slide').TransBanner({
			button_opacity: .4,
			dot_button_dark: true,		
			dot_button_margin: 0,
			dot_button_bg_blur:false,
			dot_button_space : 1,
			dot_button_size	: 29,
			
			button_show_back: true,
			button_numbers_autohide: false,
			button_numbers_horizontal: true,
			
			
			/*All the below settings are related to responsive behavior:
			IMPORTANT: In order to make limits to work on browser resize, set the last parameter to false	
			
			To enable or disable Responsive behavior */
			responsive : true,
			
			/* To disable autoplay below certain screen size [Ex: 480] */
			responsive_limit_autoplay : '', 
			
			/* To disable caption below certain screen size [Ex: 480]*/
			responsive_limit_caption : 480,
			
			/* To change navigation type below certain screen size [Ex: 480]*/
			responsive_limit_navigation : 480,
			
			/* The navigation type to be used below certain screen size [1: Default, 2: Dot style, 3: Arrow style]*/
			responsive_limit_navigation_type : 2, 
			
			/* The limits can be either screen based or banner container based */
			responsive_screen_based_limits : true 
		});	
		
		
	/*************************************************************************/
	// End plugins initialization
	/*************************************************************************/
	
	
	
	
	/*************************************************************************/
	// Begin Media queries
	/*************************************************************************/
		media_queries();
		center_menu();
		
		$(window).resize(function() {
			
			
			if ( $("a.menu-mobile").is(":hidden") ) {
				close_nav();
			}
			
			setTimeout(center_menu, 200);
			setTimeout(media_queries, 200);
	
		});
		
		if($.browser.msie && $.browser.version < 9 )
		{
			//MENU
			$('.wrapper-nav-ul').css('margin-left','0');
			$('.wrapper-nav-ul').show();
		}

	/*************************************************************************/
	// End Media queries
	/*************************************************************************/
	
	
});

function checkEmail(email){
	
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email)) {
		return false;
	}
	else
		return true;

}



/*************************************************************************/
// Begin function to reload slider folio
/*************************************************************************/
function slider_folio_filter(){
	
	$('.slider-folio:not(.no-slide")').TransBanner({
			navigation_type: 2,	
			button_opacity: .4,
			dot_button_dark: true,		
			dot_button_margin: 0,
			dot_button_bg_blur:false,
			dot_button_space : 1,
			dot_button_size	: 29,
		
			responsive : true,
			responsive_limit_autoplay : '', 
			responsive_limit_navigation_type : 2, 
			responsive_screen_based_limits : true 
	});	
}
/*************************************************************************/
// End function to reload slider folio
/*************************************************************************/


/*************************************************************************/
// Nav functions
/*************************************************************************/

function open_nav()
{
	if ( !$('header nav').hasClass('open') )
	{
		
		if ( !$('a.bt-nav-close').length )
		{
			$('.wrapper-nav-ul').append('<a href="" class="bt-nav-close"><i class="icon-cancel-circle"></i></a>');
		}
			
	
		$('.body-overlay').css({'height' : $('body').height() }).addClass('show');
		$('header nav').css({'height' : $('body').height() }).addClass('open');
	}
	
}

function close_nav()
{
	if ( $('header nav').hasClass('open') )
	{
		$('.body-overlay').removeClass('show').css({'height' : 'auto' });
		$('header nav').removeClass('open').css({'height' : 'auto' });
	}
}


/*************************************************************************/
// End menu functions
/*************************************************************************/



/*************************************************************************/
// Begin function change plugins and effects on different window resolution
/*************************************************************************/
function media_queries()
{
	//if ie7/8
	if($.browser.msie && $.browser.version < 9 )
	{
		//MENU
		$('.wrapper-nav-ul').css('margin-left','0');
		$('.wrapper-nav-ul').show();
		$('header nav').show();
	}
	else
	{
		if (Modernizr.mq('only screen and (max-width: 981px)'))
		{
	
			if($('body').hasClass('home-page'))
			{
				remove_safelionbars($('.blog-posts-small'));
				safe_lionbars($('.blog-posts-small'));
			}
			
			if($('body').hasClass('services-page'))
			{
				if(isIpad(true))
				{
					$('.services .awards').css({'width':746, 'overflow':'hidden'});	
				}
				else
				{
					$('.services .awards').css({'width':'auto'});
				}
				
				remove_safelionbars($('.services-customers'));
				safe_lionbars($('.services-customers'));
				
				remove_lionbars($('.awards'));
				
				make_scrollable($('.services .awards ul'), 'li', true);

			}
			
			if($('body').hasClass('home-page') || $('body').hasClass('about-page'))
			{
				remove_scrollable($('.client-list'));
				make_scrollable($('.client-list'), 'li', true);
			}
			
			if($('body').hasClass('about-page'))
			{
				make_scrollable($('.rules-list'), 'li', true);
				//SERVICES 
				team_click('true');
			}
			
			if($('body').hasClass('portfolio-2-page'))
			{
				$('.portfolio-2').find('.top_photo a img ').css('width',465);
			}
			
			isIpad();
		}
		
		if (Modernizr.mq('only screen and (min-width: 981px)'))
		{
	
			if($('body').hasClass('home-page'))
			{
				remove_safelionbars($('.blog-posts-small'));
			}
			
			if($('body').hasClass('services-page'))
			{
				/*$('.services .awards').css('width',296);*/
				if(isIpad(true))
				{
					$('.services .awards').css({'width':296, 'overflow':'hidden'});	
				}
				
					
				remove_safelionbars($('.services-customers'));
				remove_scrollable($('.rules-list'));
				
				remove_scrollable($('.services .awards ul'));
				safe_lionbars($('.awards'), true);
				
			}
			
			if($('body').hasClass('home-page') || $('body').hasClass('about-page'))
			{
				remove_scrollable($('.client-list'));
			}
			
			if($('body').hasClass('about-page'))
			{
				team_click('false');
			}
			
			isIpad();

		}
		
		if (Modernizr.mq('only screen and (max-width: 729px)'))
		{
		
			$('.services .awards').css({'width':'auto'});
			remove_lionbars($('.awards'));
			remove_scrollable($('.awards'));
			make_scrollable($('.services .awards ul'), 'li', true);
			
			if($('body').hasClass('home-page') || $('body').hasClass('about-page'))
			{
			remove_scrollable($('.client-list'));
			make_scrollable($('.client-list'), 'li', true);
			}
			
			if($('body').hasClass('about-page'))
			{
				make_scrollable($('.rules-list'), 'li', true);
			}
			
		}
	}
	
	//center_menu();

	//SERVICES
	if($('body').hasClass('services-page'))
	{
		services_resizes();
	}

}

/*************************************************************************/
// End function change plugins and effects on different window resolution
/*************************************************************************/

function isIpad(test){
	
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	if(test)
		return isiPad;
	else
	{
		if(isiPad)
		{
			$('header nav li ul').css({'border-left':'1px solid #ECECEC','border-right':'1px solid #ECECEC','border-bottom':'1px solid #ECECEC'});
		}
	}
}

/*************************************************************************/
// Begin function to center menu
/*************************************************************************/
function center_menu()
{

	
	//SHOW MENU
	
	if($('header nav:animated').length == 0)
	{
		if(!($.browser.msie && $.browser.version < 9))
		{
			if (Modernizr.mq('only screen and (min-width: 730px)') && !Modernizr.mq('only screen and (min-width: 981px)'))
			{
				var body = $('body').width();
				var menu = $('.wrapper-nav-ul').width()
				var final_margin = (body/2)-(menu/2);
				$('.wrapper-nav-ul').css('margin-left',final_margin);
				//$('header nav').show();
			}
			else
			{
				$('.wrapper-nav-ul').css('margin-left','0');
				//$('header nav').show();
			}
			
			
			//REMOVE OVERLAY HEIGHT IF WIDTH > 730 
			if(Modernizr.mq('only screen and (min-width: 730px)') || Modernizr.mq('only screen and (min-width: 981px)') )
			{
				$('body').css('height','auto');
			}
		}
	}
	
	

}
/*************************************************************************/
// End function to center menu
/*************************************************************************/



/*************************************************************************/
// Begin function to change services effects on different window resolutions 
/*************************************************************************/
function services_resizes()
{
	var color = $('.separator-inside-service').css('background-color');
	
	var element=$(".services .services_offer li:not(.inside-service-text li)");if(($.browser.msie&&$.browser.version<9)||Modernizr.mq("only screen and (min-width: 1024px)")){$(element).css({background:"white",border:"none",width:133,height:133});$(element).find(".inside-service").css({display:"block",width:133,height:133});$(".services_offer li p").css({"margin-left":15});$(element).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:131,height:131,border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:133,height:133,border:"none"})})}if(!($.browser.msie&&$.browser.version<9)){if(Modernizr.mq("only screen and (min-width:735px) and (max-width: 981px)")){$(element).unbind("hover");$(element).css({background:"white",border:"none",width:157,height:133});$(element).find(".inside-service").css({display:"block",width:157,height:133});$(".services_offer li p").css({"margin-left":15})}if(Modernizr.mq("only screen and (max-width: 730px)")){$(element).unbind("hover");$(element).css({background:"white",border:"none",width:205,height:93});$(element).find(".inside-service").css({display:"block",width:205,height:93});$(".services_offer li p").css({"margin-left":15})}if(Modernizr.mq("only screen and (max-width: 479px)")){$(element).unbind("hover");$(element).css({background:"white",border:"none",width:"100%",height:"89px"});$(element).find(".inside-service").css({display:"block",width:"100%",height:"89px"})}}$(".services .services_offer li:not(.inside-service-text li)").unbind("click");$(".services .services_offer li:not(.inside-service-text li)").click(function(){var b=$(this);if(typeof $(this).attr("open")=="undefined"){$(this).find(".inside-service").find(".separator-inside-service").css({display:"block"});$(this).find(".inside-service").find(".close_btn").css({display:"block"});$(this).find(".inside-service").css({"z-index":4,background:"white",color:color});$(this).find(".inside-service").css({border:"none"});$(".services_offer li p").css({"margin-left":16});if(($.browser.msie&&$.browser.version<9)||Modernizr.mq("only screen and (min-width: 1024px)")){$(this).find(".inside-service").find(".close_btn").css({display:"none"});$(this).css({background:"white",border:"none",width:133,height:133});$(this).find(".inside-service").css({display:"block",width:133,height:133});$(this).find(".inside-service-text").show("fast");$(".services_offer li p").css({"margin-left":15});var a=true;$(this).mouseleave(function(){if(a){$(b).css({background:color,border:"none",width:133,height:133});$(b).find(".inside-service").find(".separator-inside-service").css({display:"none"});$(b).find(".inside-service").css({"z-index":2,background:color,color:"white"});$(this).find(".inside-service-text").hide("slow");a=false;$(b).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:131,height:131,border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:133,height:133,border:"none"})});$(this).removeAttr("open")}})}if(!($.browser.msie&&$.browser.version<9)){if(Modernizr.mq("only screen and (max-width: 981px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:0.7})});$(this).css({opacity:1});$(this).css({background:"white",border:"none",width:157,height:133});$(this).find(".inside-service").css({display:"block",width:157,height:133});$(this).find(".inside-service-text").show("fast");$(".services_offer li p").css({"margin-left":15});$(b).unbind("hover")}if(Modernizr.mq("only screen and (max-width: 730px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:0.7})});$(this).css({opacity:1});$(this).css({background:"white",border:"none",width:205,height:93});$(this).find(".inside-service").css({display:"block",width:205,height:93});$(this).find(".inside-service-text").show("fast");$(".services_offer li p").css({"margin-left":15});$(b).unbind("hover")}if(Modernizr.mq("only screen and (max-width: 479px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:0.7})});$(this).css({opacity:1});$(this).css({background:"white",border:"none",width:"100%",height:"89px"});$(this).find(".inside-service").css({display:"block",width:"100%",height:"89px"});$(this).find(".inside-service-text").show("fast");$(".services_offer li p").css({"margin-left":0});$(b).unbind("hover")}}$(this).attr("open","open");return false}else{$(b).find(".inside-service").find(".separator-inside-service").css({display:"none"});$(b).find(".inside-service").css({"z-index":2,background:color,color:"white"});$(b).find(".inside-service-text").hide("slow");$(this).find(".inside-service").find(".close_btn").css({display:"none"});if(($.browser.msie&&$.browser.version<9)||Modernizr.mq("only screen and (min-width: 1024px)")){$(b).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:131,height:131,border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:133,height:133,border:"none"});$(this).removeAttr("open")})}if(!($.browser.msie&&$.browser.version<9)){if(Modernizr.mq("only screen and (min-width:735px) and (max-width: 981px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:1})});$(b).css({background:color,border:"none",width:157,height:133});$(b).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:155,height:131,border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:133,height:133,border:"none"})});$(b).unbind("hover")}if(Modernizr.mq("only screen and (max-width: 730px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:1})});$(b).css({background:color,border:"none",width:205,height:93});$(b).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:203,height:91,border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:205,height:93,border:"none"})});$(b).unbind("hover")}if(Modernizr.mq("only screen and (max-width: 479px)")){$(".services .services_offer li:not(.inside-service-text li)").each(function(c,d){$(this).css({opacity:1})});$(b).css({background:color,border:"none",width:"100%",height:"89px"});$(b).hover(function(){$(this).find(".inside-service").css({color:color,"background-color":"white",width:"100%",height:"89px",border:"1px solid "+color})},function(){$(this).find(".inside-service").css({color:"white","background-color":color,width:"100%",height:"89px",border:"none"})});$(b).unbind("hover")}}$(this).removeAttr("open");a=false;return false}});
}
/*************************************************************************/
// End function to change services effects on different window resolutions 
/*************************************************************************/




/*************************************************************************/
// Begin function to alter team social link effect
/*************************************************************************/
function team_click(var_test)
{
	var isiPad = navigator.userAgent.match(/iPad/i) != null;

	
	
		$('.about-page .team').find('.grid-4').each(function(index){
				$(this).find('.about-social').removeClass('about-social-click');
				$(this).find('.about-social').hide();
			
			$(this).hover(
			  function () {
			   	$(this).find('.about-social').show();
			  }, 
			  function () {
			   	$(this).find('.about-social').hide();
			  });
			
		});
	
}
/*************************************************************************/
// End function to alter team social link effect
/*************************************************************************/





/*************************************************************************/
// Begin functions to change scroll and lionbars effects
/*************************************************************************/
function safe_lionbars(ele, opt)
{
	
	vratio = ele.attr('vratio');
	hratio = ele.attr('hratio');
	
	if (vratio || hratio || ele.hasClass('has_clone'))
	{
		return false;
	}
	
	else
	{
		if (opt)
		{
			ele.lionbars();
		}
		
		else
		{
			
				if (Modernizr.mq('only screen and (min-width: 981px)'))
				{
					
				}
				else
				{
					clone = ele.clone();
					id = 'clone_' + new Date().getTime();
					
					
					ele.addClass('has_clone').addClass(id).hide();
					clone.addClass('is_clone').wrap('<div class="clone_lions" id="' + id + '"/>').insertAfter('.' + id);
					clone.lionbars();
					
					
				}
			
		}
	}
	
}
	
function make_scrollable (ele, children, lion_bars) 
{
	if(!ele.hasClass("scrollable")){var width=0;ele.children(children).each(function(){width+=$(this).outerWidth(true)});ele.css({width:width}).addClass("scrollable")}id="lion_bars_wrapper_"+new Date().getTime();if(lion_bars){if(ele.parent().hasClass("wrapper_scrollable")||ele.parent().hasClass("lb-content")){}else{ele.wrap('<div class="wrapper_scrollable" id="'+id+'" style="overflow:auto; width:auto;" />');safe_lionbars($("#"+id))}};
}
	
function remove_scrollable (ele)
{
	$(".has_clone.wrapper_scrollable").each(function(a){children=$(this).children();children.css({width:"auto"}).removeClass("scrollable");$(this).next(".wrapper_scrollable").remove();$(this).show().before(children).remove()});
}
	
function remove_safelionbars (ele)
{
	if(ele.hasClass("has_clone")){ele.show().removeClass("has_clone").alterClass("clone_*").next(".is_clone").remove()};	
}
	
function remove_lionbars (ele)
{
	if(ele.attr("hratio")||ele.attr("vratio")){content=ele.find(".lb-content").children();content.appendTo(ele);ele.find(".lb-v-scrollbar").remove();ele.find(".lb-wrap").remove();ele.removeAttr("hratio").removeAttr("vratio").removeAttr("style")};	
}

/*************************************************************************/
// End functions to change scroll and lionbars effects
/*************************************************************************/

/*************************************************************************/
// Custom Google Maps
/*************************************************************************/

function startGmap() {
	
	var myOptions = {
		zoom: 4,
		center: new google.maps.LatLng(google_maps_latitude, google_maps_longitude),
		navigationControlOptions: {style: google.maps.NavigationControlStyle.NORMAL, position: google.maps.ControlPosition.RIGHT_TOP},
		streetViewControl: false,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
      		style: google.maps.ZoomControlStyle.DEFAULT,
      		position: google.maps.ControlPosition.RIGHT_TOP
    	},
		mapTypeControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      		position: google.maps.ControlPosition.TOP_RIGHT,
			mapTypeIds: ["ptMap"]
		}
	};
	
	map = new google.maps.Map(document.getElementById('contact_map'), myOptions);
	
	var styleCP = [
		{ featureType: "administrative", elementType: "all", stylers: [ { visibility: "off" } ] },
		{ featureType: 'landscape', elementType: 'all', stylers: [ { hue: '#FFFFFF' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'on' } ] },
		{ featureType: "poi", elementType: "all", stylers: [ { visibility: "off" } ] },
		{ featureType: "road", elementType: "all", stylers: [ { visibility: "on" }, { lightness: -30 } ] },
		{ featureType: "transit", elementType: "all", stylers: [ { visibility: "off" } ] },
		{ featureType: "water", elementType: "all", stylers: [ { saturation: -100 }, { lightness: -100 } ] },
		{ featureType: "all", elementType: "all", stylers: [ { saturation: -100 }, { lightness: 87 } ] }
	];
		
	var styledMapOptions = {name: "Map"};
  	var ptMapType = new google.maps.StyledMapType(styleCP, styledMapOptions);
  	map.mapTypes.set("ptMap", ptMapType);
  	map.setMapTypeId("ptMap");  
	
	/**/
	
	var circle = {
  		path: google.maps.SymbolPath.CIRCLE,
	    fillOpacity: 0.75,
	    fillColor: base_color,
	    strokeOpacity: 1.0,
	    strokeColor: base_color,
	    strokeWeight: 1.0, 
	    scale: 10
	};
	
	var point = new google.maps.LatLng(google_maps_latitude, google_maps_longitude);
	
	var marker = new google.maps.Marker({
		position: point,
		map: map,
		zIndex: 99999,
		optimized: false,
		icon: circle
	});
	
}

function slideshow() 
{

	var image_string = '';
		
	$('.slideshow-content .wrapper-slideshow.img div').each(function(index) {
		
		slide = $(this).attr('data-content');
		height_img_slideshow = $('div[data-content=' + slide + '] img').height();
		
		image_string += '<img src="' + $(this).find('img').attr('src') + '" />';
		
		if ( $(this).attr('data-backgroundcolor') )
		{
			div_class = 'backgroundcolor';
			style = 'background-color:' + $(this).attr('data-backgroundcolor');
		}
		
		else
		{
			div_class = 'backgroundimage';
			style = 'background-image: ' + 'url(' + $(this).attr('data-backgroundimage') + ')';
			image_string += '<img src="' + $(this).attr('data-backgroundimage') + '" />';
		}
		
		html_string = '<div class="slideshow-background ' + div_class + '" data-slide="' + slide + '" style="' + style + '; height: ' + (height_img_slideshow) + 'px; opacity:0"></div>'
		
		$('.slideshow-wrapper').append(html_string);
		
	});
	
	
	$(image_string).imagesLoaded( function( $images, $proper, $broken ) {
		
		$('.slideshow-wrapper').removeClass('preloader');
		
		$('.slideshow-content .wrapper-slideshow.img').cycle({
		
			fx:      'custom', 
			
			cssFirst: {  
				top : 'auto',
				bottom : 'auto',
				left : 'auto',
		  		right : '-100%',
		        opacity : 0,
		        display: 'block' 
		    },
		    
		    cssBefore: {  
		    	top : 'auto',
		    	bottom : 'auto',
		    	left : 'auto',
		        right : '-100%',
				opacity : 0,
		        display: 'block'
		    },
		    
		    cssAfter: {  
				top : 'auto',
				bottom : 'auto',
				left: 'auto',
				opacity:0,
				display: 'block'
		    },
		    
		    animOut: {  
				right: '100%',  
		        opacity: 0
		    }, 
		    
		    animIn: {  
		        right: '0%',  
		        opacity: 1
		    }, 
		    
		    
		    delay: 0,
	    	
	    	sync:0,
			easeIn : 'easeOutExpo',
			easeOut : 'easeInOutQuad',
			timeout: 6000,
			activePagerClass : 'active',
			speed: 3000,
			pager:  '.slideshow-wrapper ul', 
			pagerAnchorBuilder: function(idx, slide) { 
	        	return '<li><a href="#">' + (idx+1) + '</a></li>'; 
	    	},
			
			before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
				
				$(nextSlideElement).addClass('visible');
				
				current_content = $(currSlideElement).attr('data-content');
				next_content = $(nextSlideElement).attr('data-content');
				backgroundimage = $(nextSlideElement).attr('data-backgroundimage');
				backgroundcolor = $(nextSlideElement).attr('data-backgroundcolor');
				height_element = $(nextSlideElement).height();
				
				//console.log(nextSlideElement);
				
				if (current_content != next_content)
				{
					
					if ( $(nextSlideElement).hasClass('outside') ) margin_content = 60;
					else margin_content = 20;
					
					$('.slideshow-content').delay(1000).animate({'height' : (height_element), 'margin-bottom' : margin_content}, { duration : 500, easing : 'easeOutExpo', queue : true });
					
					$('.slideshow-background[data-slide=' + next_content + ']').delay(1000).animate({'opacity' : 1}, { duration : 2000, easing : 'easeOutExpo', queue : true });
					
					$('.slideshow-content .wrapper-slideshow.content-block div[data-image=' + current_content + ']').animate({'left' : '5%', 'opacity' : 0}, { duration : 1000, easing : 'easeOutExpo', queue : true, complete: function() { $(this).css({ 'left' : '-50%' }); } });
					
					$('.slideshow-content .wrapper-slideshow.content-block div[data-image=' + next_content + ']').delay(2000).animate({'left' : '0%', 'opacity' : 1}, { duration : 1000, easing : 'easeOutExpo', queue : true, complete: function() {
						$('.slideshow-background[data-slide=' + next_content + ']').delay(7000).animate({'opacity' : 0}, { duration : 500, easing : 'easeOutExpo', queue : true });
					} });
					
					
				}
				
				else
				{
					
					$('.slideshow-content').delay(1000).animate({'height' : (height_element)}, { duration : 500, easing : 'easeOutExpo', queue : true });
					$('.slideshow-background[data-slide=' + next_content + ']').delay(1000).animate({'opacity' : 1}, { duration : 2000, easing : 'easeOutExpo', queue : true });
					
					$('.slideshow-content .wrapper-slideshow.img div').delay(1500).animate({'right' : '0%', 'opacity' : 1}, { duration : 750, easing : 'easeOutExpo', queue : true });
					
					$('.slideshow-content .wrapper-slideshow.content-block div:eq(0)').delay(1850).animate({'left' : '0%', 'opacity' : 1}, { duration : 750, easing : 'easeOutExpo', queue : true });
					$('.slideshow-background[data-slide=' + next_content + ']').delay(4000).animate({'opacity' : 0}, { duration : 500, easing : 'easeOutExpo', queue : true });
				}
				
				
				
			}
		});
	
	});
	
}
