layui.use(['table','layer','form','laydate','upload'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;
    var upload = layui.upload;

    /*对接口时内容删掉*/
    var data;/* = [{"date":"2020-12-05","weatherD":"良","temperatureD":"30","weatherN":"优","temperatureN":"20","principal":"李","week":"六","windD":"1","remarkD":"","windN":"2","remarkN":"","recorder":"赵","productionRecord":"赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵赵","workRecord":"222","inRecord":"333"},
        {"date":"2020-12-06"},
        {"date":"2020-12-07"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"},
        {"date":"2020-12-08"}];*/

    // 查询施工日志数据
    $.ajax({
        url: '../../quality/findAll',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (res) {
            data = res.data;
        }
    });

    // 加载左侧日期列表
    $(".fl .parent").html("");
    render(data[0]);
    for(var i = 0;i < data.length;i++){
        if(i == 0){
            $(".fl .parent").append('<div class="active"><span>'+data[i].date+'</span></div>');
        }else{
            $(".fl .parent").append('<div><span>'+data[i].date+'</span></div>');
        }
    }
    // 日期切换事件
    $(".fl .parent div").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        render(data[$(this).index()]);
    });
    // 日志下载事件
    $("a.word-export").click(function(event) {
        $("#page-content").wordExport("施工日志");
    });

    // 日志渲染事件
    function render(data){
        console.log(data);
        var arr = data.date.split("-");
        $(".year").html("").html(arr[0]);
        $(".month").html("").html(arr[1]);
        $(".day").html("").html(arr[2]);
        $(".week").html("").html(data.week);
        $(".weatherD").html("").html(data.weatherD);
        $(".temperatureD").html("").html(data.temperatureD);
        $(".windD").html("").html(data.windD);
        $(".remarkD").html("").html(data.remarkD);
        $(".weatherN").html("").html(data.weatherN);
        $(".temperatureN").html("").html(data.temperatureN);
        $(".windN").html("").html(data.windN);
        $(".remarkN").html("").html(data.remarkN);
        $(".productionRecord").html("").html("生产情况记录（部位、项目、机械作业、班组工作，生产存在问题等）："+data.productionRecord);
        $(".workRecord").html("").html("技术质量安全工作记录（技术质量安全活动，技术质量安全问题，检查评定验收等）："+data.workRecord);
        $(".inRecord").html("").html("材料、构配件进场记录："+data.inRecord);
        $(".principal").html("").html(data.principal);
        $(".recorder").html("").html(data.recorder);
    }
});

