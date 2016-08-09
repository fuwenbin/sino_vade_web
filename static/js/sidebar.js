
$('.topbar .menu a').each(function(e){
	var current_pathname = new String(location.pathname);
	if(current_pathname.startWith($(this).attr('href'))){
		$(this).addClass('active');
	}
});


$(document).ready(function(){
	$('.nav-second-level li').click(function(e){
		$(this).addClass('active');
		$('.nav-second-level li').not($(this)).removeClass('active');
		e.stopPropagation(); 
	});

	$('.nav_accordion dd').click(function(event){
		if($('.sidebar').hasClass('mini-navbar')||$(this).hasClass('nav-header')) return;
		$(this).find('ul').slideToggle();
		$(this).toggleClass('active');
		$('.nav_accordion dd').not(this).find('ul').slideUp();
		$('.nav_accordion dd').not($(this)).removeClass('active');
	});
	$('.topbar .menu-minimalize').click(function(event){
		$('.sidebar').toggleClass('mini-navbar');
		$('.nav-second-level').attr("style","");
		if($(this).find('i').hasClass('fa-hand-o-left')){
			$(this).find('i').removeClass('fa-hand-o-left');
			$(this).find('i').addClass('fa-hand-o-right');
		}else{
			$(this).find('i').removeClass('fa-hand-o-right');
			$(this).find('i').addClass('fa-hand-o-left');

		}
		SmoothlyMenu();
	});
	
	
})

function getJsonp(){
	 $.ajax({  
         url:'http://192.168.12.126:8080/topologies/nodes?callback=jsonpcallback',  
         dataType:"jsonp",  
         success:function(data){  
             alert(JSON.stringify(data));  
         }  
    });
	
}


function SmoothlyMenu() {
    if (!$('#side-menu').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        //$('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}