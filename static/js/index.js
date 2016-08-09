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

	modalobj.bind_event($,modalobj.transmit_data);
	$(modalobj.id).on('hidden.bs.modal',function(){
		$(this).remove();
	});
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



//图表自适应宽度


