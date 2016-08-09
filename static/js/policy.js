$(document).ready(function(){
	//var snat_modal_html = document.getElementById('myModal').outHTML;
	var snat_modal_html = $('#snat_modal').prop('outerHTML');
	

	$("#addbtn").click(function(){
		modalobj = {
				id:'#snat_modal',
				html:snat_modal_html,
				bind_event:function(){}
		}
		parent.load_modal(modalobj);
	});
	console.info("hello nat!!");
})