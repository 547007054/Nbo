layui.use(['table','layer','form','element','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;
    var laydate = layui.laydate;

    //基本信息
    /*对接口后注释*/
    /*var infoData = [{"roam":"宁波地铁.mp4","picture":"工程概况.png","introduction":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁"}]
    renderInformationTable(infoData);*/

    $.ajax({
        url: '../Information/findInformation',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            renderInformationTable(res.data);
        }
    });
    function renderInformationTable (data){
        $('.proSurvey').attr('src',"../models/"+data[0].picture);//工程概况图片
        $('.text p').html(data[0].introduction);//文字
        $('.video').attr('src',"../models/"+data[0].roam);//中间视频
        $('.video source').attr('src',"../models/"+data[0].roam);//中间视频
        $(".video source").autoplay = "autoplay";
    }

    //短信通知
    $("#note").click(function(){
        layer.open({
            type: 1,
            title: "短信通知",
            area: ['500px', '280px'],
            content: $('#note1')
        });
    });
    //短信通知提交事件
    form.on('submit(addNoteBtn)', function(data){
        console.log(data.field);
        $.ajax({
            url: '..//',
            type: 'get',
            data: {
                recipient: data.field.recipient,
                content: data.field.content
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    layer.close(layer.index);
                    layer.msg('发送成功');
                }
            }
        });
        return false;
    });

    // 参建单位
    /*对接口后注释*/
    /*var recordData = [{units:"业主单位",name:"中铁十九局"},
        {units:"监理单位",name:"中铁十九局"},
        {units:"勘察单位",name:"中铁十九局"},
        {units:"设计单位",name:"中铁十九局"},
        {units:"施工单位",name:"中铁十九局"},
        {units:"勘察单位",name:"中铁十九局"},
        {units:"设计单位",name:"中铁十九局"},
        {units:"施工单位",name:"中铁十九局"}];
    renderRecordTable(recordData);*/

    $.ajax({
        url: '../Information/findParticipating ',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function (res) {
            renderRecordTable(res.data);
        }
    });
    function  renderRecordTable(data){
        table.render({
            elem: '#record'
            , id: 'record'
            , page: true //开启分页
            , limit: [6]
            , limits:[6]
            , loading: false
            , cols: [[
                {field: 'units', title: '参建单位', align: 'center'}
                ,{field: 'name', title: '单位名称', align: 'center'}
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
    }
    
    // 宣贯信息
    /*对接口后注释*/
    /*var pdfData = [{"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"}];
    renderPDFTable(pdfData);*/

    $.ajax({
        url: '../Information/findVideo',
        type: 'get',
        dataType: 'json',
        success: function (res) {
        	console.log(res.data);
            renderPDFTable(res.data);
        }
    });
    function renderPDFTable (data){
        var html3 ='';
        var len;
        if(data.length < 10){
            len = data.length;
        }else{
            len = 10;
        }
        for (var i=0;i<len; i++){
            html3 += '<li>'+data[i].content1+'</li>'
        }
        $('.notice .pdfUl').html(html3);
        $('.pdfUl li').click(function () {
            $("#pdf1").attr("src","../models/"+$(this).html());
            layer.open({
                type: 1,
                title: "宣贯详情",
                area: ['800px', '500px'],
                content: $('#pdf1')
            });
        });
    }

    //施工日志
    //日期
    laydate.render({
        elem: '#date'
        ,done: function(value, date, endDate){
            var arr = ["日", "一", "二", "三", "四", "五", "六"];
            var i = new Date(value).getDay();
            $("#week").val(arr[i]);
        }
    });
    $("#log").click(function(){
        layer.open({
            type: 1,
            title: "施工日志",
            area: ['900px', '820px'],
            content: $('#log1')
        });
    });
    //施工日志提交事件
    form.on('submit(addLogBtn)', function(data){
        console.log(data.field);
        $.ajax({
            url: '../quality/added',
            type: 'get',
            data: {
                date: data.field.date,
                weatherD: data.field.weatherD,
                temperatureD: data.field.temperatureD,
                weatherN: data.field.weatherN,
                temperatureN: data.field.temperatureN,
                principal: data.field.principal,
                week: data.field.week,
                windD: data.field.windD,
                remarkD: data.field.remarkD,
                windN: data.field.windN,
                remarkN: data.field.remarkN,
                recorder: data.field.recorder,
                productionRecord: data.field.productionRecord,
                workRecord: data.field.workRecord,
                inRecord: data.field.inRecord
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    layer.close(layer.index);
                    layer.msg('发送成功');
                }
            }
        });
        return false;
    });
});