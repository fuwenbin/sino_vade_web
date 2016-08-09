var api={
	
	version:"1.0",
	url:"/hl",
	
	
	
	get_interfaces:function(callback){
		var url = this.url+"/interfaces";
		$.ajax({
		     type: 'GET',
		     url: url ,
		     data: '' ,
		     dataType:'json',
		     success: function(data){
		    	 callback(data);
		     },
		     error:function(data){
		    	 callback(data);
		     },
		});
	},
	get_vlans:function(callback){
		var url = this.url+"/vlans";
		$.ajax({
		     type: 'GET',
		     url: url ,
		     data: '' ,
		     dataType:'json',
		     success: function(data){
		    	 callback(data);
		     },
		     error:function(data){
		    	 callback(data);
		     },
		});
	},
	get_snats:function(callback){
		var uri = this.url+"/vlans";
		$.ajax({
		     type: 'GET',
		     url: url ,
		     data: '' ,
		     dataType:'json',
		     success: function(data){
		    	 callback(data);
		     },
		     error:function(data){
		    	 callback(data);
		     },
		});
	}
		
		
};