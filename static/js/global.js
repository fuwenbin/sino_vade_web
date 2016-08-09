
$('.topbar .menu a').each(function(e){
	var current_pathname = new String(location.pathname);
	if(current_pathname.startWith($(this).attr('href'))){
		$(this).addClass('active');
	}
});


$(document).ready(function(){
	$('.nav-second-level a').each(function(e){
		if($(this).attr('href')==location.pathname){
			$(this).toggleClass('active');
			$(this).parents('dd').find('>a').addClass('active');
			$(this).parents('dd').find('>ul').toggle();
			console.log("hello world.");
		}
	});

	$('.nav_accordion dd').click(function(event){
		if($('.sidebar').hasClass('mini-navbar')) return;
		$(this).find('ul').slideToggle();
		$(this).find('>a').toggleClass('active');
		$('.nav_accordion dd').not(this).find('ul').slideUp();
		$('.nav_accordion dd>a').not($(this).find('a')).removeClass('active');
		
		
		
	});
	$('.sidebar .spin-icon').click(function(event){
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

