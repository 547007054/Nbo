//当日在场人数
/*对接口后注释*/
var data1 = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
var data2 = [18, 20, 22, 25, 26, 31, 29];
renderPresence(data1,data2);

function renderPresence(data1,data2) {
    const presence = echarts.init(document.getElementById("presence"));
    const option = {
        color: ['#66cc33'],
        xAxis: {
            type: 'category',
            data: data1,
            boundaryGap: false,
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
                show: true,
                lineStyle:{
                    color:'white'
                }
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color:'#113d5e'
                }
            }
        },
        grid:{
            left:'',
            right:'2%',
            bottom:'5%',
            top:'5%',
            containLabel:true
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            confine: true
        },
        series: [{
            name: "人数",
            type: 'line',
            data: data2
        }]
    };
    presence.setOption(option);
}

// 出勤状态
/*对接口后注释*/
var data3 = ['管理人员', '水泥工', '混凝土工', '钢筋工', '电焊工'];
var data4 = [
    {value: 35, name: '管理人员'},
    {value: 30, name: '水泥工'},
    {value: 24, name: '混凝土工'},
    {value: 35, name: '钢筋工'},
    {value: 48, name: '电焊工'}
];
renderState(data3,data4);

function renderState(data3,data4) {
    const state = echarts.init(document.getElementById("state"));
    const option = {
        color: ['#60acfc','#feb64d','#32d3eb','#5bc49f','#ff7c7c','#9287e7','#fe8104','#3F77FE','#12ED93','#189CBF'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            textStyle:{color:"#fff"},
            left: 10,
            data: data3
        },
        series: [
            {
                name: '出勤人数',
                type: 'pie',
                center: ['50%', '55%'],
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                data: data4
            }
        ]
    };
    //渲染报表
    state.setOption(option);
}

// 出勤数据
/*对接口后注释*/
var AttendanceData = [{x:'9-1',yj:'50',yz:'100',yl:'50'},
                      {x:'9-2',yj:'60',yz:'100',yl:'60'},
                      {x:'9-3',yj:'50',yz:'100',yl:'50'},
                      {x:'9-4',yj:'56',yz:'100',yl:'56'},
                      {x:'9-5',yj:'59',yz:'100',yl:'59'},
                      {x:'9-6',yj:'60',yz:'100',yl:'60'},
                      {x:'9-7',yj:'40',yz:'100',yl:'40'},
                      {x:'9-8',yj:'54',yz:'100',yl:'54'},
                      {x:'9-9',yj:'45',yz:'100',yl:'45'}];
renderAttendance(AttendanceData);

function renderAttendance(AttendanceData) {
    var xdata=[];
    var yjData=[];
    var yzData=[];
    var ylData=[];
    for (var i=0;i<AttendanceData.length;i++){
        xdata.push(AttendanceData[i].x);
        yjData.push(AttendanceData[i].yj);
        yzData.push(AttendanceData[i].yz);
        ylData.push(AttendanceData[i].yl);
    }
    console.log(ylData)
    const attendance = echarts.init(document.getElementById("attendance"));
    const option = {
        color: ['#00FF7F','#FFA500','#32d3eb'],
        xAxis: {
            type: 'category',
            data: xdata,
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '人数',
                axisLine:{
                    lineStyle:{
                        color:'white'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color:'#113d5e'
                    }
                }
            },
            {
                type: 'value',
                name: '出勤率',
                axisLine:{
                    lineStyle:{
                        color:'white'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'solid',
                        color:'#113d5e'
                    }
                }
            }
        ],
        legend: {
            left: 'right',
            top:'0',
            data: ['出勤', '应到','出勤率'],
            textStyle:{color:"#fff"}
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            confine: true
        },
        grid:{
            left:'',
            right:'0',
            bottom:'5%',
            containLabel:true
        },
        series: [{
            name: "出勤",
            type: 'bar',
            data: yjData
        },{
            name: "应到",
            type: 'bar',
            data: yzData
        },{
            name: "出勤率",
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: ylData
        }]
    };
    //渲染报表
    attendance.setOption(option);
}


layui.use(['table','layer','form','carousel','element'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var carousel = layui.carousel;
    var element = layui.element;


    //出勤状态
    /*对接口后注释*/
    var inData = [{value: 35, name: '管理人员',Accounted:'59%'},
        {value: 30, name: '水泥工',Accounted:'59%'},
        {value: 24, name: '混土工',Accounted:'59%'},
        {value: 35, name: '钢筋工',Accounted:'59%'},
        {value: 48, name: '电焊工',Accounted:'59%'},
        {value: 48, name: '电焊工',Accounted:'59%'}
    ];
    renderInTable(inData);

    function  renderInTable(data){
        var stateTable = table.render({
            elem: '#stateTable'
            , id: 'stateTable'
            , limit: [4]
            , limits:[4]
            , loading: false
            , page: true
            , cols: [[
                {field: 'name', title: '人员类型', align: 'center'}
                ,{field: 'value', title: '人数', align: 'center'}
                ,{field: 'Accounted', title: '占比', align: 'center'}
            ]]
            , data: data
            , done: function (res, curr, count) {
                element.render();
            }
        });
    }

    //进出场记录
    /*对接口后注释*/
    var recordData = [{date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"男",jobs:"混凝土工",name:"王春兰",state:"进",state1:"18888888888",state2:"500000",state3:"未发放",address:"河北省邢台市隆尧县千户营村乡南鱼村25号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"},
        {date:"5-27 12:23",type:"管",jobs:"混凝土工",name:"王春兰",state:"进",address:"电子围栏一号"}];
    renderRecordTable(recordData);

    function  renderRecordTable(data){
        var stateTable = table.render({
            elem: '#record'
            , id: 'record'
            , page: true //开启分页
            , limit: [4]
            , limits:[4]
            , loading: false
            , cols: [[
                {field: 'date', title: '时间', align: 'center'}
                ,{field: 'type', title: '人员类型', align: 'center'}
                ,{field: 'jobs', title: '岗位/工种', align: 'center'}
                ,{field: 'name', title: '人员名称', align: 'center'}
                ,{field: 'state', title: '状态', align: 'center'}
                ,{field: 'address', title: '名称', align: 'center'}
            ]]
            , data: data
            , done: function (res, curr, count) {
                element.render()
                if (count == 0) {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                    $(".layui-table-page").hide();
                    $('th').css("background-color","rgba(16,26,51,0.9)").css("border","0px");
                }else{
                    $('th').css("background-color","rgba(16,26,51,0.9)").css("border","0px");
                    $('.layui-laypage-count').css("color","#fff")
                    $('.layui-box a').css("color","#fff")
                }
            }
        });
    };

    //查询所有工长
    $.ajax({
        url: '../Workers/findMaster',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            var data = res.data;
            var str = '';
            for(var i = 0;i < data.length; i++){
                if(i == 0){
                    str += '<span class="active">'+data[i].foreman+'</span>';
                }else{
                    str += '<span>'+data[i].foreman+'</span>';
                }
            }
            $(".topMaster").html(str);
            renderMaster($(".active").html());
            //工长点击事件
            $(".topMaster span").click(function(){
                console.log($(this).html());
                $(this).addClass("active").siblings().removeClass("active");
                renderMaster($(this).html());
            });
        }
    });

    //根据工长渲染工长信息和劳务人员表格
    function renderMaster(foreman){
        $.ajax({
            url: '../Workers/findByWorkers',
            type: 'get',
            dataType: 'json',
            data: {
                foreman: foreman
            },
            success: function (res) {
                renderWorkersTable(res.data);
                $("#picture").attr("src","../models/"+res.data1[0].picture);
                $("#foreman").html(res.data1[0].foreman);
                $("#company").html(res.data1[0].company);
                $("#phone").html(res.data1[0].phone);
                $("#address").html(res.data1[0].address);
                $("#territory").html(res.data1[0].territory);
                $("#team").html(res.data1[0].team);
                $("#number").html(res.data1[0].number+"人");
                $("#foreignd").html(res.data1[0].foreignd+"人");
            }
        });
    }

    //劳务人员信息
    /*对接口后注释*/
    /*var workersData = [
     {date:"大发放大幅度",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"河北省邢台市隆尧县千户营村乡南鱼村25号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"},
     {date:"5-27 12:23",sex:"男",type:"混凝土工",name:"王春兰",politics:"群众",site:"电子围栏一号"}];
    renderWorkersTable(workersData);*/

    function renderWorkersTable(data){
        var workersTable = table.render({
            elem: '#record0'
            , id: 'record0'
            , page: false //开启分页
            , loading: false
            , cols: [[
                {field: 'name', title: '姓名', align: 'center',width: 80}
                ,{field: 'type', title: '工种', align: 'center',width: 140}
                ,{field: 'sex', title: '性别', align: 'center',width: 60}
                ,{field: 'politics', title: '政治面貌', align: 'center',width: 100}
                ,{field: 'cardId', title: '身份证号', align: 'center',width: 180}
                ,{field: 'site', title: '地址', align: 'center',width: 300}
                ,{field: 'contact', title: '联系方式', align: 'center',width: 140}
                ,{field: 'wage', title: '工资(元)', align: 'center',width: 100}
                ,{field: 'state', title: '工资状态', align: 'center',width: 100}
            ]]
            , data: data
            , done: function (res, curr, count) {
                element.render()
                if (count == 0) {
                    /*$(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                    $(".layui-table-page").hide();*/
                    $('th').css("background-color","rgba(16,26,51,0.9)").css("border","0px");
                }else{
                    $('th').css("background-color","rgba(16,26,51,0.9)").css("border","0px");
                    $('.layui-laypage-count').css("color","#fff")
                    $('.layui-box a').css("color","#fff")
                }
            }
        });
    }
})