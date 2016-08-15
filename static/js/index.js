//从from获取数据，转为对象  
function fromToJson(form) {  
    var result = {};  
    var fieldArray = $('#' + form).serializeArray();  
    for (var i = 0; i < fieldArray.length; i++) {  
        var field = fieldArray[i];  
        if (field.name in result) {  
            result[field.name] += ',' + field.value;  
        } else {  
            result[field.name] = field.value;  
        }  
    }  
    return result;  
};

// 打开新窗口
function openNewWindow(url, target, width, height, left, top)
{
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	target = target || '_blank';
	width = width || windowWidth / 2;
	height = height || windowHeight / 2;
	left = left || (windowWidth - width) / 2;
	top = top || (windowHeight - height) / 2;
	
	window.open(url, target, 'height='+height+', width='+width+', top='+top+', left='+left+', toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no');
}
toastr.options = {
        "closeButton": true, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-margin",//弹出窗的位置
        "showDuration": "300",//显示的动画时间
        "hideDuration": "1000",//消失的动画时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "fadeIn",//显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
       };

function toastr_success(message){
	toastr.success(message);
}
function toastr_info(message){
	toastr.info(message);
}
function toastr_warning(message){
	toastr.warning(message);
}
function toastr_error(message){
	toastr.error(message);
}
function toastr_clear(){
	toastr.clear();
}

//触发全局click事件
function clearMenu(e){
	$(document).trigger('click');
}
//iframe 自适应高度
function iFrameHeight() {   
	var ifm= document.getElementById("content-iframe");   
	var subWeb = document.frames ? document.frames["content-iframe"].document : ifm.contentDocument;   
	if(ifm != null && subWeb != null) {
	   var windowInnerHeight = window.innerHeight-76;
	   var iframe_content_height = subWeb.body.offsetHeight;
	   if(iframe_content_height<windowInnerHeight) iframe_content_height=windowInnerHeight;
	   ifm.height = iframe_content_height;
	}   
} 
//提交modal中数据
function submit_modal_data(){
	var modal_id = $(this).attr('name')
	$(modalobj.id).modal('hide');
	result = {"result":"success","other":"hello,I am come from parent."};
	$('body').remove($('#'+modal_id));
	
	return result
}
//加载modal窗口，本函数提供给iframe使用
function load_modal(modalobj){
	$('body').append(modalobj.html);
	$(modalobj.id).modal('show');
	$(modalobj.id).on('hidden.bs.modal',function(){
		$(this).remove();
	});
	modalobj.bind_event($,modalobj.transmit_data);
	
}
//加载进度条
function loading(){
	$('#loading-level').modal({backdrop: 'static', keyboard: false});
}
function unloading(){
	$('#loading-level').modal('hide');
}

$.validator.addMethod('re',function(value,element,param){
	var re = param;
	return re.test(value);
});


$.validator.addMethod('ipv4',function(value,element,param){
	if(value=='') return true;
	var re =  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
	return re.test(value);
	
},'ipv4格式错误');

$.validator.addMethod('ipv6',function(value,element,param){
	if(value=='') return true;
	var re = /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
	return re.test(value);
	
},'ipv6格式错误');
//图表自适应宽度


