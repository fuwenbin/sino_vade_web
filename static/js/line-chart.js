// JavaScript Document


//CPU利用率
$(function () {
   $(function () {
    $('#cpu-utilization-chart').highcharts({
        title: {
            text: 'CPU利用率',
            x: -20 //center
        },
        subtitle: {
            text: 'CPU utilization',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'All',
            data: [0.2, 0.3, 0.4, 0.4, 0.6, 0.1, 0.2, 0.2, 0.2, 0.5, 0.2, 0.5]        
        },{
            name: 'CPU0',
            data: [0.2, 0.2, 0.2, 0.2, 0.5, 0.2,0.3, 0.4, 0.4, 0.6, 0.1,  0.5]
        }, {
            name: 'CPU1',
            data: [0.2, 0.2, 0.2, 0.4, 0.6, 0.1, 0.5, 0.2, 0.5, 0.2,0.3, 0.4]       
        }, {
            name: 'CPU2',
            data: [ 0.4, 0.6, 0.1, 0.5, 0.2,0.2, 0.2, 0.2, 0.5, 0.2,0.3, 0.4]        
        }]
    });
});
});
//内存使用率
$(function () {
   $(function () {
    $('#memory-usage-chart').highcharts({
        title: {
            text: '内存使用率',
            x: -20 //center
        },
        subtitle: {
            text: 'Memory usage',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Memory',
            data: [34, 23, 65, 55, 34, 58, 78, 37, 86, 97, 75, 65]        
        }]
    });
});
});
//硬盘使用率
$(function () {
   $(function () {
    $('#hard-usage-chart').highcharts({
        title: {
            text: '硬盘使用率',
            x: -20 //center
        },
        subtitle: {
            text: 'Hard Disk Usage',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Hard Disk',
            data: [34, 23, 65, 55, 34, 58, 78, 37, 86, 97, 75, 65]        
        }]
    });
});
});
//应用流量

$(function () {
   $(function () {
    $('#application-flow-chart').highcharts({
        title: {
            text: '应用流量',
            x: -20 //center
        },
        subtitle: {
            text: 'Application flow',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (bps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'bps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});
//SSL流量
$(function () {
   $(function () {
    $('#ssl-flow-chart').highcharts({
        title: {
            text: 'SLL流量',
            x: -20 //center
        },
        subtitle: {
            text: 'SSL flow',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (bps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'bps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});

//网络接口流量
$(function () {
   $(function () {
    $('#network-flow-chart').highcharts({
        title: {
            text: '网络接口流量',
            x: -20 //center
        },
        subtitle: {
            text: 'SSL flow',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (bps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'bps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});
//链路使用率
$(function () {
   $(function () {
    $('#link-flow-chart').highcharts({
        title: {
            text: '链路使用率',
            x: -20 //center
        },
        subtitle: {
            text: 'Link usage',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});
//Tcp并发
$(function () {
   $(function () {
    $('#tcp-concurrency-chart').highcharts({
        title: {
            text: 'TCP并发',
            x: -20 //center
        },
        subtitle: {
            text: 'TCP concurrency',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (数量)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '数量'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20,220, 248, 241, 201, 141, 80, 57, 403, 170, 86, 25]        
        }]
    });
});
});
//Tcp新建
$(function () {
   $(function () {
    $('#tcp-new-chart').highcharts({
        title: {
            text: 'TCP新建',
            x: -20 //center
        },
        subtitle: {
            text: 'TCP new',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (cps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'cps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});
//SSL并发
$(function () {
   $(function () {
    $('#ssl-concurrency-chart').highcharts({
        title: {
            text: 'SSL并发',
            x: -20 //center
        },
        subtitle: {
            text: 'SSL concurrency',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (数量)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '数量'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20,220, 248, 241, 201, 141, 80, 57, 403, 170, 86, 25]        
        }]
    });
});
});
//SSL新建
$(function () {
   $(function () {
    $('#ssl-new-chart').highcharts({
        title: {
            text: 'SSL新建',
            x: -20 //center
        },
        subtitle: {
            text: 'SSL new',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (cps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'cps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});
//HTTP请求速率
$(function () {
   $(function () {
    $('#http-request-chart').highcharts({
        title: {
            text: 'HTTP请求速率',
            x: -20 //center
        },
        subtitle: {
            text: 'HTTP request rate',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (rps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'rps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [70, 69, 195, 145, 182, 215, 332, 265, 233, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [20, 80, 57, 403, 170, 220, 248, 241, 201, 141, 86, 25]        
        }]
    });
});
});

//DNS查询速率
$(function () {
   $(function () {
    $('#dns-query-chart').highcharts({
        title: {
            text: 'DNS查询速率',
            x: -20 //center
        },
        subtitle: {
            text: 'DNS query rate',
            x: -20
        },
        xAxis: {
            categories: ['10:20', '10:30', '10:40', '10:50', '11:00', '11:10','11:20', '11:30', '11:40', '11:50', '12:00', '12:10']
        },
        yAxis: {
            title: {
                text: '单位 (qps)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'qps'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '客户端',
            data: [145, 182, 215, 332, 265, 233,70, 69, 195, 183, 139, 96]
        }, {
            name: '服务器端',
            data: [403, 170, 220, 248, 241,20, 80, 57, 201, 141, 86, 25]        
        }]
    });
});
});