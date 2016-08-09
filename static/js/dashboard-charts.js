// JavaScript Document
echarts.registerTheme("marcarons", macarons_theme); // 注册主题要在实例化init之前

//CPU使用率
$(function(){
	var myChart = echarts.init(document.getElementById('cpu1-flow-chart'),'marcarons');
	function randomData() {
	    now = new Date(+now + oneDay);
	    value = value + Math.random() * 21 - 10;
	    return {
	        name: now.toString(),
	        value: [
	            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
	            Math.round(value)
	        ]
	    }
	}

	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
	    data.push(randomData());
	}
	option = {
		    tooltip: {
		    	formatter:"{} <br/> {b}:{c}%"
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'gauge',
		            data:[{value:50,name:'使用率'}],
		        }
		    ]
		};
	myChart.setOption(option,true);
	var myChart2 = echarts.init(document.getElementById('cpu2-flow-chart'),'marcarons');
	option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart2.setOption(option);
});


//内存使用率
$(function(){
	var myChart = echarts.init(document.getElementById('storage1-flow-chart'),'marcarons');
	function randomData() {
	    now = new Date(+now + oneDay);
	    value = value + Math.random() * 21 - 10;
	    return {
	        name: now.toString(),
	        value: [
	            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
	            Math.round(value)
	        ]
	    }
	}

	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
	    data.push(randomData());
	}
	option = {
		    tooltip: {
		    	formatter:"{} <br/> {b}:{c}%"
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'gauge',
		            data:[{value:50,name:'使用率'}],
		        }
		    ]
		};
	myChart.setOption(option,true);
	var myChart2 = echarts.init(document.getElementById('storage2-flow-chart'),'marcarons');
	option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart2.setOption(option);
	
});



//SSL流量
$(function(){
	var myChart = echarts.init(document.getElementById('tcp-concurrency-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});


//网络接口流量
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});

//链路使用率
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});

//Tcp并发
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});

//Tcp新建
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});

//SSL并发
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});

//HTTP请求速率
$(function(){
	var myChart = echarts.init(document.getElementById('storage-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});


//DNS查询速率
$(function(){
	var myChart = echarts.init(document.getElementById('sys-flow-chart'),'marcarons');
	option = {
		    title: {
		        text: '内存使用率',
		        subtext: 'storage flow'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['客户端','服务端']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['10.10','10.20','10.30','10.40','10.50','11.10','11.20']
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    },
		    series: [
		        {
		            name:'客户端',
		            type:'line',
		            data:[10, 12, 17, 30, 80, 79, 20],
		            markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'服务端',
		            type:'line',
		            data:[10, 19, 17, 100, 20, 99, 30],
		            markPoint: {
		                data: [
		                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
		                ]
		            },
		            markLine: {
		                data: [
		                    {type: 'average', name: '平均值'},
		                    [{
		                        symbol: 'none',
		                        x: '90%',
		                        yAxis: 'max'
		                    }, {
		                        symbol: 'circle',
		                        label: {
		                            normal: {
		                                position: 'start',
		                                formatter: '最大值'
		                            }
		                        },
		                        type: 'max',
		                        name: '最高点'
		                    }]
		                ]
		            }
		        }
		    ]
		};
	myChart.setOption(option);
	
});
