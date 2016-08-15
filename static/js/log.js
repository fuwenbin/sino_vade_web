
$(document).ready(function(){
	 var server_date = $( "#from").val().split('/')
	 $( "#from").datepicker({
	      defaultDate: new Date(server_date[0],server_date[1]-1,server_date[2]),
	      changeMonth: true,
	      numberOfMonths: 2,
	      dateFormat: 'yy/mm/dd',
	      maxDate:new Date(server_date[0],server_date[1]-1,server_date[2]),
	      onClose: function( selectedDate ) {
	        $( "#to" ).datepicker( "option", "minDate", selectedDate );
	        
	      }
    });
    $( "#to" ).datepicker({
	      defaultDate: new Date(server_date[0],server_date[1]-1,server_date[2]),
	      changeMonth: true,
	      numberOfMonths: 2,
	      dateFormat: 'yy/mm/dd',
	      maxDate:new Date(server_date[0],server_date[1]-1,server_date[2]),
	      onClose: function( selectedDate ) {
	        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
	      }
    });
   
	console.info("hello log!!");
})