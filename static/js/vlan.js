$(document).ready(function(){
	
	//vlan ip详情单击
	$(".vlan_ip_detail").click(function(event){
		var vlan_name = $(this).parents('tr').find('.vlan_name').text();
		$.ajax({
			type:'GET',
			url:'/hl/api/agent/vlan',
			dataType:'json',
			data:'vlan_name='+vlan_name,
			success:function(data){
				var modal_html = $('#vlan_ip_modal').prop('outerHTML');
				var ips = data.vlan.ipaddrs;
				var modalobj = {
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
					};
				parent.load_modal(modalobj);	
			}
		});
		event.stopPropagation();
		
	});
	//显示增加vlan的modal
	$("#addbtn").click(function(){
	
		$.ajax({
			type:'GET',
			url:'/hl/vlan/add',
			success:function(html_data){
				
				var modalobj = {
						id:'#add_vlan_modal',
						html:html_data,
						bind_event:bind_vlan_event				
						};
				parent.load_modal(modalobj);
			}
		});
		
	});
	//vlan列表 行单击
	$("#vlan-table tbody tr").click(function(){
		$(this).addClass('row-selected');
		$('#vlan-table tbody tr').not(this).removeClass('row-selected');
	});
	
	//vlan列表 行双击 ，修改VLAN属性
	$('#vlan-table tbody tr').dblclick(function(){
		var vlan_name = $(this).find('.vlan_name').text();
		$.ajax({
			type:'GET',
			url:'/hl/vlan/update',
			dataType:'json',
			data:'name='+vlan_name,
			success:function(vlan_data){
				var html_data = vlan_data.html;				
				var modalobj = {
						id:'#update_vlan_modal',
						html:html_data,
						transmit_data:vlan_data,
						bind_event:bind_vlan_event
				};
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
	function bind_vlan_event($m,vlan_obj){
		
		function vlan_ip_event_bind(m$,ip_obj){
			//加载传递过来的数据
			if(ip_obj.primary){
				$m('input[name=primary]').val(ip_obj.primary);
			}
			if(ip_obj.netmask){
				$m('input[name=netmask]').val(ip_obj.netmask);
			}
			if(ip_obj.secondarys){
				var secondary_ips = ip_obj.secondarys;
				for(i=0;i<secondary_ips.length;i++){
					if(i==0){
						$m('input[name=secondary]').val(secondary_ips[i]);
						continue;
					}
					var secondary_html = '<div class="form-group secondary-ip-set">'+
								            '<label for="hostname" class="col-md-3 font-normal control-label">辅IP(Secondary):</label>'+
								            '<div class="col-md-8">'+
								            	'<div class="input-group">'+
								                    '<input type="text" class="form-control secondary" name="secondary'+i+'" value="'+secondary_ips[i]+'" >'+
								                    '<div class="input-group-btn">'+
														'<a class="btn btn-default add-secondary-ip" href="#"> <span class="fa fa-plus-circle"></span></a>'+
														'<a class="btn btn-default delete-secondary-ip" href="#"> <span class="fa fa-minus-circle"></span></a>'+
													'</div>'+
												'</div>'+
											'</div>'+
								        '</div>'
					$m('#add_vlan_ip_modal .modal-body').append(secondary_html);
				}
			}
			
			
			//增加一个辅助IP
			var ipcount = 0;
			$m('#add_vlan_ip_modal .modal-body').on('click','.add-secondary-ip',function(e){
				ipcount = ipcount+1;
				var secondary_html = '<div class="form-group secondary-ip-set">'+
					                    '<label for="hostname" class="col-md-3 font-normal control-label">辅IP(Secondary):</label>'+
					                    '<div class="col-md-8">'+
					                    	'<div class="input-group">'+
						                        '<input type="text" class="form-control secondary" name="secondary'+ipcount+'" value="" >'+
						                        '<div class="input-group-btn">'+
													'<a class="btn btn-default add-secondary-ip" href="#"> <span class="fa fa-plus-circle"></span></a>'+
													'<a class="btn btn-default delete-secondary-ip" href="#"> <span class="fa fa-minus-circle"></span></a>'+
												'</div>'+
											'</div>'+
										'</div>'+
					                '</div>'
										
				$m(e.target).parents('.secondary-ip-set').after(secondary_html);
				var input_name = 'secondary'+ipcount;
				//动态添加验证
				$m('#vlanip_form input[name=secondary'+ipcount+']').rules('add',{
					ipv4:true,
					remote:{
						type:'POST',
						url:'/hl/validate/vlan/ip/secondary',
						data:{
							netmask:function(){return $m('input[name=netmask]').val()},
							ip_type:function(){return '0'},
							primary:function(){
								return $m('input[name=primary]').val()
							},
							secondary:function(){
								return $m('input[name='+input_name+']').val();
							}
						}
					},
					messages:{
						remote:'与主IP不是同一个地址段或IP地址为广播地址和网络地址.'
					}
				});
			});
			//删除一个 辅助IP
			$m('#add_vlan_ip_modal .modal-body').on('click','.delete-secondary-ip',function(e){
				if($m('.secondary-ip-set').length==1) return;
				$m(e.target).parents('.secondary-ip-set').remove();
			});
			// 保存VLAN IP数据
			$m('#add_vlan_ip_modal .btn-primary').on('click',function(e){
				var valid_value = $m('#vlanip_form').valid();
				if(valid_value){
					var ip_length = $m('#ipset table tbody tr').length;
					var primary_ip = $m('input[name=primary]').val();
					var netmask = $m('input[name=netmask]').val();
					var secondary_ips = []
					$m('.secondary').each(function(index,element){
						var ip_val = $m(element).val();
						if(ip_val){
							secondary_ips.push(ip_val);
						}
					});
					
					if(ip_obj.primary){//如果ip_num存在 即为修改vlanip
						var vlan_ip_tr = $m('#ipset [id="'+ip_obj.primary+'/'+ip_obj.netmask+'"]');
						vlan_ip_tr.find('.ip_primary').text(primary_ip);
						vlan_ip_tr.find('.ip_netmask').text(netmask);
						if(secondary_ips.length>0){
							vlan_ip_tr.find('.ip_secondary').text(secondary_ips[0]);
							var secondary_list = vlan_ip_tr.find('.secondary_list');
							secondary_list.find('li').remove();
							for(i=1;i<secondary_ips.length;i++){
								secondary_list.append('<li><a href="#">'+secondary_ips[i]+'</a></li>')
		                    }
						}
						// 找到内存中的数据，并同步界面与内存的数据
						
						ip_obj.primary = primary_ip;
						ip_obj.netmask = netmask;
						ip_obj.secondarys = secondary_ips;						
					}else{
						var vlan_ip_tr = '<tr id="'+primary+'/'+netmask+'">'+
		                    				'<td><span>'+ip_length+'</span></td>'+
		                    				'<td><span class="ip_type">IPV4</span></td>'+
		                    				'<td><span class="ip_primary">'+primary_ip+'</span></td>'+
		                    				'<td><span class="ip_netmask">'+netmask+'</span></td>'+
		                    				'<td class="dropdown">'+
	                    				    	'<span class="ip_secondary">'+secondary_ips[0]+'</span>'+
	                    						'<a class="dropdown-toggle" style="cursor:pointer" data-toggle="dropdown">更多<span class="fa fa-caret-down"></span></a>'+
	                    						'<ul class="dropdown-menu pull-left secondary_list" >'
		                    				 		
	                    for(i=1;i<secondary_ips.length;i++){
	                    	vlan_ip_tr = vlan_ip_tr+'<li><a href="#">'+secondary_ips[i]+'</a></li>'
	                    }                    
						vlan_ip_tr = vlan_ip_tr+'</ul></td><td><a class="btn btn-default btn-xs updatebtn" href="#">修改<span class="fa fa-edit"></span></a></td></tr>'
						$m(vlan_ip_tr).insertBefore($m('#ipset table tbody tr:first-child'))
						vlan_obj.ipaddrs.append({
							primary:primary_ip,
							netmask:netmask,
							secondarys:secondary_ips
						});
					}
					$m('#add_vlan_ip_modal').modal('hide');
				}
			});
			
			
			
			var primary_remote_valid = {
					type:'POST',
					url:'/hl/validate/vlan/ip/primary',
					async:false,
					data:{
						vlan_name:function(){return vlan_obj.name;},
						netmask:function(){return $m('input[name=netmask]').val()},
						ip_type:function(){return '0'},
						primary:function(){
							return $m('input[name=primary]').val();
						},
						current_vlan_ips:function(){//返回当前界面上的所有vlan ip数据
							return JSON.stringify(vlan_obj.ipaddrs);
						}
					}
				};
			//定义vlan ip的验证
			$m('#vlanip_form').validate({
				onkeyup:false,
				debug:true,
				groups:{primary_ip:"primary netmask"},
				rules:{
					primary:{
						required:true,
						ipv4:true,
					},
					netmask:{
						required:true,
						range:[1,32],
						remote:primary_remote_valid
					},
					secondary:{
						ipv4:true,
						remote:{
							type:'POST',
							url:'/hl/validate/vlan/ip/secondary',
							data:{
								netmask:function(){return $m('input[name=netmask]').val()},
								ip_type:function(){return '0'},
								primary:function(){
									return $m('input[name=primary]').val()
								}
								
							}
						}
					}
				},
				messages:{
					netmask:{
						remote:"格式错误,IP地址段重叠或IP地址为广播地址和网络地址"
					},
					secondary:{
						remote:"与主IP不是同一个地址段或IP地址为广播地址和网络地址"
					}
				},
				errorPlacement: function(error, element) {  
					if($m(element).attr('name')=='primary' || $m(element).attr('name')== 'netmask'){
						error.insertAfter(element.parent());
					}else{
						error.insertAfter(element.parent());
					}
				}
			});
		}
		/* ------------------------------------------- VLAN IP 界面处理逻辑分割线                 ----------------------------------- */
		//增加ipv4 网段
		$m('#ipset .btn-group .ipv4btn').click(function(){
			
			var html_content = $($('#add_vlan_ip_modal').prop('outerHTML')).addClass('ipv4');
			var ip_type = '0';//ipv4
			vlan_ip_obj = {
				ip_type: ip_type
			}
			var modalobj = {
					id:'#add_vlan_ip_modal',
					html:html_content,
					transmit_data:vlan_ip_obj,
					bind_event:vlan_ip_event_bind
			};
			parent.load_modal(modalobj);
		});
		//增加一个IPV6 网段
		$m('#ipset .btn-group .ipv6btn').click(function(){
			var html_content = $($('#add_vlan_ip_modal').prop('outerHTML')).addClass('ipv6');
			var modalobj ={
					id:'#add_vlan_ip_modal',
					html:html_content,
					bind_event:function(){
					}
				};
			parent.load_modal(modalobj);
		});
		//修改已经设置的VLAN IP网段
		$m('#ipset').on('click','.change_vlan_ip',function(event){
			var tr_id = $(event.target).parents('tr').attr('id');
			var vlan_ip_obj = undefined;
			var ips = vlan_obj.ipaddrs;
			for(i=0;i<ips.length;i++){
				if((ips[i].primary+'/'+ips[i].netmask) == tr_id){
					vlan_ip_obj = ips[i];
				}
			}
			var html_content = $($('#add_vlan_ip_modal').prop('outerHTML')).addClass('ipv4');	
			var modalobj = {
					id:'#add_vlan_ip_modal',
					html:html_content,
					transmit_data:vlan_ip_obj,
					bind_event:vlan_ip_event_bind
			};
			parent.load_modal(modalobj);
			
		});
		
		//响应ip type选择
		$m('#ipset').on('click','li',function(){
			var typev = $m(this).find('a').attr('value');
			var typet = $m(this).text();
			$m(this).parents('.ip').find('.type .btn-white').text(typet);
			$m(this).parents('.ip').find('input[name=type]').val(typev);
		});
		
		
		
		//控制端口选择的增加
		
		//控制端口选择减少
		
		
		//VLAN modal vlalidate
		$m('#vlan_form').validate({
			onkeyup:false,
			ignore: ".ignore",
			rules:{
				name:{
					required:true,
					re:/^\w{1,16}$/,
					remote:{
						type:'GET',
						url:'/hl/validate/vlanname',
						data:{
							exclude:function(){
								if(vlan_obj.name){
									return vlan_obj.name;
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
				var method = vlan_obj.name?"PUT":"POST";
				parent.loading();
				$m.ajax({
					type:method,
					url:'/hl/api/agent/vlan',
					data:JSON.stringify(vlanobj),
					dataType:'json',
					success:function(data){
						if(vlan_obj.name){
							$m('#update_vlan_modal').modal('hide');
						}else{
							$m('#add_vlan_modal').modal('hide');	
						}
						parent.unloading();
						if(data.status=='success'){
							var message = "增加成功"
								
							$('#interface_table tbody tr:first-child').before();
							if(vlan_obj.name){
								message = "修改成功"
							}
							toastr.success(message);
						}else{
							var message = "增加失败"
							if(vlan_obj.name){
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