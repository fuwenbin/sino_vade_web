$(document).ready(function(){
	$("#sysconfig").validate({
		rules:{
			hostname:'required',
				date:'required'
		},
		messages:{
			hostname:'必填项',
			date:'必填项'
		}
		
	});
	$("#sysconfig .btn-primary").click(function(){
		$("#sysconfig").submit();
	});
console.info("hello sysconfig");
})