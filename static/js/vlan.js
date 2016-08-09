$(document).ready(function(){
	//var snat_modal_html = document.getElementById('myModal').outHTML;
	
	
	//vlan ip详情单击
	$(".vlan_ip_detail").click(function(){
		var vlan_name = $(this).parents('tr').find('.vlan_name').text();
		$.ajax({
			type:'GET',
			url:'/hl/api/agent/vlan',
			dataType:'json',
			data:'vlan_name='+vlan_name,
			success:function(data){
				var modal_html = $('#vlan_ip_modal').prop('outerHTML');
				var ips = data.vlan.ipaddrs;
				var modalobj = $.extend(modalobj,{
						id:'#vlan_ip_modal',
						html:modal_html,
						bind_event:function($m){
							for(i=0;i<ips.length;i++){
								var html = '<tr>'
								html = html + '<td>'+ i +'</td>'
								html = html + '<td>'+ ips[i].ip +'</td>'
								html = html + '<td>'+ ips[i].netmask +'</td>'
								html = html + '<td>'+ '是' + '</td>'
								html = html + '</tr>'
								$m('#vlan_ip_table tbody').append(html);
							}
						}
				});
				parent.load_modal(modalobj);	
			}
		});
		
	});
	//显示增加vlan的modal
	$("#addbtn").click(function(){
	
		$.ajax({
			type:'GET',
			url:'/hl/vlan/add',
			success:function(html_data){
				
				var modalobj = $.extend(modalobj,{
						id:'#add_vlan_modal',
						html:html_data,
						bind_event:bind_vlan_event				
						});
				parent.load_modal(modalobj);
			}
		});
		
	});
	//vlan列表 行单击
	$("#vlan-table tbody tr").click(function(){
		$(this).addClass('row-selected');
		$('#vlan-table tbody tr').not(this).removeClass('row-selected');
	});
	
	//vlan列表 行双击
	$('#vlan-table tbody tr').dblclick(function(){
		var vlan_name = $(this).find('.vlan_name').text();
		transmit_datas = {
			vlan_name:vlan_name,
		}
		$.ajax({
			type:'GET',
			url:'/hl/vlan/update',
			data:'name='+vlan_name,
			success:function(html_data){
				var modalobj = $.extend(modalobj,{
						id:'#update_vlan_modal',
						html:html_data,
						transmit_data:transmit_datas,
						bind_event:bind_vlan_event
				});
				parent.load_modal(modalobj);
			}
		});
	});
	
	//绑定数据到modal上去
	function bind_add_vlan($m){
		
	}
	//绑定单个vlan数据到modal上
	function bind_vlan_modal($m){
		
	}
	
	//绑定vlan配置modal中的事件
	function bind_vlan_event($m,tramsmit_datas){
		
		//控制ip设置的增减
		$m('#ipset').on('click','.delIp_btn',function(e){
				$m(e.target).parents('.ip').next('.error').remove();
				$m(e.target).parents('.ip').next('.error').remove();
				$m(e.target).parents('.ip').remove();
		});
		//增加ipv4
		var ipcount = 0;
		$m('#ipset .btn-group .ipv4btn').click(function(){
			var html_content = $m('#ipset .ip').prop('outerHTML');
			ipcount = ipcount+1;
			var html_content = '<div class="input-group mt15 ip" >'+
								'<input id="ip'+ipcount+'" type="text" class="form-control " name="ip'+ipcount+'" placeholder="请输入IPV4 类型地址" />'+
				               	'<span class="input-group-btn split"><a type="button" class="btn btn-white" >/</a> </span>'+
				               	'<div class="input-group-btn">'+
									'<input id="netmask'+ipcount+'" type="text" class="form-control" style="width:68px;" name="netmask_ipv4" placeholder="ip掩码" />'+
								'</div>'+
								'<div class="input-group-btn type">'+
									'<button data-toggle="dropdown" class="btn btn-white dropdown-toggle" type="button">主IP(Pimary)<span class="caret"></span></button>'+
				                    '<ul class="dropdown-menu">'+
				                          '<li><a href="#" value="0">主IP(Pimary)</a></li>'+
				                          '<li><a href="#" value="1">辅IP(Secondary)</a></li>'+
				                    '</ul>'+
								'</div>'+
				                '<div class="input-group-btn">'+
				                     '<a class="btn btn-default delIp_btn" href="#"> <span class="glyphicon glyphicon-remove"></span></a>'+
								'</div>'+
								'<input type="hidden" name="ip_type" value="0" />'+
				                '<input type="hidden" name="type" value="0" />'+
				               '</div>'
			
			var ipset = $(html_content);
			$m('#ipset .btn-div').before(ipset.prop('outerHTML'));
			$m('#ip'+ipcount).rules('add',{
					required:true,
					ipv4:true,
					messages:{
						required:'请填写IPV4内容，否则请删除当前行.'
					}
				});
			$m('#netmask'+ipcount).rules('add',{
				required:true,
				range:[0,32],
			});
			$m('.ip input').on('focus',function(){
				$(this).parents('.ip').next('#ipcheck').remove();
			});
		});
		//增加ipv6
		$m('#ipset .btn-group .ipv6btn').click(function(){
			ipcount = ipcount+1;
			var html_content = $m('#ipset .ip').prop('outerHTML');
			var html_content = '<div class="input-group mt15 ip" >'+
								'<input id="ip'+ipcount+'" type="text" class="form-control " name="ip'+ipcount+'" placeholder="请输入IPV6 类型地址" />'+
					           	'<span class="input-group-btn split"><a type="button" class="btn btn-white" >/</a> </span>'+
					           	'<div class="input-group-btn">'+
									'<input id="netmask'+ipcount+'" type="text" class="form-control" style="width:68px;" name="netmask_ipv6" placeholder="ip掩码" />'+
								'</div>'+
								'<div class="input-group-btn type">'+
									'<button data-toggle="dropdown" class="btn btn-white dropdown-toggle" type="button">主IP(Pimary)<span class="caret"></span></button>'+
					                '<ul class="dropdown-menu">'+
					                      '<li><a href="#" value="0">主IP(Pimary)</a></li>'+
					                      '<li><a href="#" value="1">辅IP(Secondary)</a></li>'+
					                '</ul>'+
								'</div>'+
					            '<div class="input-group-btn">'+
					                 '<a class="btn btn-default delIp_btn" href="#"> <span class="glyphicon glyphicon-remove"></span></a>'+
								'</div>'+
								'<input type="hidden" name="ip_type" value="1" />'+
					            '<input type="hidden" name="type" value="0" />'+
					           '</div>'
			var ipset = $(html_content);
			$m('#ipset .btn-div').before(ipset.prop('outerHTML'));
			$m('#ip'+ipcount).rules('add',{
				required:true,
				ipv6:true,
				messages:{
					required:'请填写IPV6内容，否则请删除当前行.'
				}
			});
			
			$m('#netmask'+ipcount).rules('add',{
				required:true,
				range:[0,128],
			});
			
			$m('.ip input').on('focus',function(){
				$(this).parents('.ip').next('#ipcheck').remove();
			});
			
		});
		
		//响应ip type选择
		$m('#ipset').on('click','li',function(){
			var typev = $m(this).find('a').attr('value');
			var typet = $m(this).text();
			$m(this).parents('.ip').find('.type .btn-white').text(typet);
			$m(this).parents('.ip').find('input[name=type]').val(typev);
		});
		
		
		
		//控制端口选择的增加
		$m('#for_select_interface_table').on('click',function(e){
			if(e.target.type == 'button'||e.target.parentNode.type =='button'){
				var tr_obj = $m(e.target).parents('tr');
				tr_obj.find('.glyphicon-plus').removeClass('glyphicon-plus').addClass('glyphicon-remove');
				var html_content = tr_obj.prop('outerHTML');
				tr_obj.remove();
				$m('#selected_interface_table tbody').append(html_content);
			}
			
		});
		//控制端口选择减少
		$m('#selected_interface_table').on('click',function(e){
			if(e.target.type == 'button'||e.target.parentNode.type =='button'){
				var tr_obj = $m(e.target).parents('tr');
				tr_obj.find('.glyphicon-remove').removeClass('glyphicon-remove').addClass('glyphicon-plus');
				var html_content = tr_obj.prop('outerHTML');
				tr_obj.remove();
				$m('#for_select_interface_table tbody').append(html_content);
			}
		});
		
		$m.validator.addMethod('ipv4',function(value,element,param){
			
			var re =  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
			return re.test(value);
			
		},'ipv4格式错误');
		
		$m.validator.addMethod('ipv6',function(value,element,param){
			
			var re = /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
			return re.test(value);
			
		},'ipv6格式错误');
		
		$m('#vlan_form').validate({
			onkeyup:false,
			ignore: ".ignore",
			rules:{
				name:{
					required:true,
					re:/^\w{1,16}$/,
					remote:{
						type:'get',
						url:'/hl/validate/vlanname',
						data:{
							exclude:function(){
								if(tramsmit_datas){
									return tramsmit_datas.vlan_name;
								}else{
									return '';
								}
							}
						},
					}
				},
				vlanid:{
					required:true,
					range:[2,4094],
					remote:'/hl/validate/vlanid',
				},				
			},
			messages:{
				name:{
					re:"格式为字母，数字和下划线，范围1-16",
					remote:"名字已经存在"
				},
				vlanid:{
					range:"VLAN ID 范围：2-4094",
					remote:"该ID已经存在",
				},
				
				netmask_ipv4:{
					required:"请填写掩码内容，否则请删除当前行!",
					range:"请输入IPv4掩码值范围： 0-32",
					remote:"IP地址格式不能为网络地址和广播地址 ，且不能与其他他VLAN IP存在重叠域"
				},
				netmask_ipv6:{
					required:"请填写掩码内容，否则请删除当前行!",
					range:"请输入IPv6掩码值范围： 0-128",
					remote:"IP地址格式不能为网络地址和广播地址 ，且不能与其他他VLAN IP存在重叠域"
				}
			},
			errorPlacement: function(error, element) {  
				if($m(element).attr('name').startWith('ip')){
					error.insertAfter(element.parent());
				}else if($m(element).attr('name').startWith('netmask')){
					error.insertAfter(element.parents('.ip'));
				}else{
					error.appendTo(element.parent());
				}
			},
			submitHandler:function(form){
				var all_val = $m('#vlan_form input[name=name]').val();
				var vlanid = $m('#vlan_form input[name=vlanid]').val();
				var web_enable = $m('#vlan_form input:radio[name=web_enable]:checked').val();
				var ssh_enable = $m('#vlan_form input:radio[name=ssh_enable]:checked').val();
				var ipaddrs = new Array();
				var no_valid_ip = undefined;
				$m('#vlan_form .ip').each(function(index,element){
					var inputs = $m(element).find('input');
					var ip = inputs.eq(0).val();
					var netmask = inputs.eq(1).val();
					var ip_type = $m(element).find('input[name=ip_type]').val();
					var type = $m(element).find('input[name=type]').val();
					var ipobj = {
						ip:ip,
						netmask:netmask,
						ip_type:ip_type,
						type:type
					};
					validate_data = {
						cip:ipobj,
						other:ipaddrs,
						exclude_vlan:tramsmit_datas.vlan_name?tramsmit_datas.vlan_name:'' //如果是修改某个某vlan，本vlan原有的vlan应该排除对比验证之外
					}
					var current_html = this;
					//提交每一个ip vlan的网络地址，广播地址以及重叠域检验。
					
					return $m.ajax({
						type:'POST',
						url:'/hl/validate/vlanip',
						async:false, 
						data:JSON.stringify(validate_data),
						dataType:'json',
						success:function(data){
							if(data.status!='success'){
								ipobj.element = current_html;
								ipobj.reason = data.reason;
								no_valid_ip = ipobj;								
								return false;
							}else{
								ipaddrs.push(ipobj);
								return true;
							}
						}
					});
					
				});
				if(no_valid_ip){
					element = no_valid_ip.element;
					var error_html = '<label id="ipcheck" class="error">'+no_valid_ip.reason+'</label>'
					$m(error_html).insertAfter($m(element));
					return 
				}

				var interfaces = new Array();
				$m('#selected_interface_table tbody tr td').each(function(index,element){
					var interface = {
						interface:$m(this).find('span').text()
					};
					interfaces.push(interface);
				});
				var vlanobj = {
						name:name,
						vlanid:vlanid,
						web_enable:web_enable,
						ssh_enable:ssh_enable,
						ipaddrs:ipaddrs,
						interfaces:interfaces,
				}
				var method = tramsmit_datas.vlan_name?"PUT":"POST";
				parent.loading();
				$m.ajax({
					type:method,
					url:'/hl/api/agent/vlan',
					data:JSON.stringify(vlanobj),
					dataType:'json',
					success:function(data){
						if(tramsmit_datas.vlan_name){
							$m('#update_vlan_modal').modal('hide');
						}else{
							$m('#add_vlan_modal').modal('hide');	
						}
						
						parent.unloading();
						if(data.status=='success'){
							var message = "增加成功"
							if(tramsmit_datas.vlan_name){
								message = "修改成功"
									
							}
							toastr.success(message);
						}else{
							var message = "增加失败"
							if(tramsmit_datas.vlan_name){
								message = "修改失败"
							}
							toastr.warning(message);
						}
					}
				});
			}
		});
		
		$m('#vlan_form .modal-footer .btn-primary').on('click',function(){
			$m('#vlan_form').submit();
		});
	}
	console.info("hello vlan!!");
})