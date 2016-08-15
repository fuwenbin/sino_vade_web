
$(document).ready(function(){
	
	$("#arp-table tbody tr").click(function(){
		$(this).addClass('row-selected');
		$('#arp-table tbody tr').not(this).removeClass('row-selected');
	});
	
	
	//增加一个arp
	$("#addbtn").click(function(){
		var modal_html = $('#arp_modal').prop('outerHTML');
		var modalobj = {
			id:'#arp_modal',
			html:modal_html,
			bind_event:function($m){
				$m.validator.addMethod('dynamic_ip',function(value,element,param){
					var type = $m(element).parents('#arp_form').find('.radio input[type=radio]:checked').val();
					if(type =='0'){
						var re =  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
						return re.test(value);
					}else{
						var re = /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
						return re.test(value);
					}
				});
				$m('#arp_form').validate({
					rules:{
						ip:{
							required:true,
							remote:'/hl/validate/arp/ip',
							dynamic_ip:true,
						},
						mac:{
							required:true,
							re:/^([0-9a-fA-F]{2})(([/\s:-][0-9a-fA-F]{2}){5})$/,
						},
						
					},
					messages:{
						ip:{
						
							dynamic_ip:"格式不正确，请修正",
							remote:'ip已经存在'
						},
						mac: {
							re:"格式不正确，请修正"
						},
					},
					submitHandler:function(form){
						parent.loading();
						$m('#arp_modal').modal('hide');
						var form_data = $m('#arp_form').serialize();
						form_data = form_data +'&action=0'
						var formjson = parent.fromToJson('arp_form');
						$m.ajax({
							type:'PUT',
							url:'/hl/config/net_arp',
							dataType:'json',
							data:form_data,
							success:function(data){
								parent.unloading();
								if(data.status=='success'){
									$m('#arp_modal').modal('hide');
									toastr.success('增加成功');
									var tr_arp = "<tr>";
									tr_arp = tr_arp+"<td>" +($('#arp-table tbody tr').length+1)+"</td>";
									tr_arp = tr_arp+"<td>" +formjson.ip+"</td>";
									tr_arp = tr_arp+"<td>" +formjson.mac+"</td>";
									tr_arp = tr_arp+"<td>" +""+"</td>";
									tr_arp = tr_arp+"<td>" +"静态"+"</td>";
									tr_arp = tr_arp+"</tr>";
									$(tr_arp).insertBefore($('#arp-table tbody tr').eq(0));
									
									//location.reload();
								}else{
									toastr.warning('增加失败');
								}
								//parent.unloading();
							},
							error : function(data) {
								parent.unloading();
								alert('error');
							}  
						});
					}
				});
				
				$m('#arp_modal .btn-primary').click(function(){
					$m('#arp_form').submit();
				});
			}
		};
		parent.load_modal(modalobj);
	});
	
	//删除一个arp
	$('#delbtn').click(function(){
		var selected_row = $('#arp-table tbody tr.row-selected');
		if(selected_row.length){
			$('#delete-confirm').modal('show');
			$('#delete-confirm .btn-primary').click(function(){
				$('#delete-confirm').modal('hide');
				form_data = 'ip='+selected_row.find('.arp-ip').text();
				form_data = '&mac='+selected_row.find('.arp-mac').text();
				form_data = '&ip_type='+selected_row.find('.arp-iptype').text();
				form_data = '&action=1'
				$.ajax({
					type:'PUT',
					url:'/hl/config/net_arp',
					dataType:'json',
					data:form_data,
					success:function(data){
						if(data.status=='success'){
							toastr.success('删除成功');
							selected_row.remove();
							//location.reload();
						}else{
							toastr.warning("删除失败,"+data.reason)
						}
					},
					error : function(data) {
						toastr.error('Error');
					}  
				});
			});
			
		}else{
			toastr.warning('请选择一行数据','这是标题');
		}
	});
	
	
	console.info("hello arp!!");
})