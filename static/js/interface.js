$(document).ready(function(){
	//var snat_modal_html = document.getElementById('myModal').outHTML;
	
	$("#statistics_btn").click(function(){
		$.ajax({
		     type: 'GET',
		     url: '/hl/interfaces/statistic' ,
		     data: '' ,
		     success: function(data){
		    	var modal_html = data 
		 		modalobj = {
		 				id:'#interface_statistics_modal',
		 				html:modal_html,
		 				bind_event:function($m){}
		 		}
		 		parent.load_modal(modalobj);
		     },
		     error:function(data){
		    	 callback(data);
		     },
		});
		
	});
	
	$("#interfaces-table tbody tr").dblclick(function(){
		var modal_html = $('#interface_enable_modal').prop('outerHTML');
		modalobj = {
				id:'#interface_enable_modal',
				html:modal_html,
				bind_event:bind_interface_event
		
		}
		parent.load_modal(modalobj);
	});
	function bind_interface_event($m){
		$m('#add_vlans_btn').click(function(){
			$m('#selected-options').append($m('#for-select option:selected'))
		});
		$m('#remove_vlans_btn').click(function(){
			$m('#for-select').append($m('#selected-options option:selected'))
		});
		$m('#selected-options').on('dblclick','option',function(){
			$m('#for-select').append(this);
		});
		$m('#for-select').on('dblclick','option',function(){
			$m('#selected-options').append(this);
		});
		
			
	};
	//vlan列表 行单击
	$("#interfaces-table tbody tr").click(function(){
		$(this).addClass('row-selected');
		$('#interfaces-table tbody tr').not(this).removeClass('row-selected');
	});
	$('.edit').click(function(){
		var modal_html = $('#interface_enable_modal').prop('outerHTML');
		modalobj = {
				id:'#interface_enable_modal',
				html:modal_html,
				bind_event:bind_interface_event
		}
		parent.load_modal(modalobj);
	});
	
	
	
	console.info("hello interface!!");
	
})