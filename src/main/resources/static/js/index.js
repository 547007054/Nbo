layui.use(['table','layer','form','carousel','element'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var carousel = layui.carousel;
    var element = layui.element;

    //劳务
    $.ajax({
        url: '/',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            renderLWChart(res.data);
        }
    });

    /*对接口后注释*/
    var data = [
        {value: 335, name: '管理人员在场'},
        {value: 310, name: '管理人员离场'},
        {value: 234, name: '建筑工人在场'},
        {value: 135, name: '建筑工人离场'}
    ];
    renderLWChart(data);

    function renderLWChart(data) {
        const lwChart = echarts.init(document.getElementById("lwChart"));
        const option = {
            color: ['#60acfc', '#feb64d', '#32d3eb', '#5bc49f', '#ff7c7c', '#9287e7', '#fe8104', '#3F77FE', '#12ED93', '#189CBF'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '人数',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        lwChart.setOption(option);
    }

    //视频
    $.ajax({
        url: 'Information/findInformation',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            $('.video').attr('src',"models/"+res.data[0].roam);
            $('.video source').attr('src',"models/"+res.data[0].roam);
            $(".video source").autoplay = "autoplay";
        }
    });
});