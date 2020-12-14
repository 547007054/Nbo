layui.use(['table','layer','form','carousel','element'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var carousel = layui.carousel;
    var element = layui.element;

    element.on('collapse(test)', function(data){
        layui.element.init()
    });

    /*获取监控列表*/
    $.ajax({
        url: '../Monitor/findByLocation',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            addOption(res.data);
        }
    });
    /*对接口后注释*/
    var data = [{"number":"","verification":"","channel":""}];
    addOption(data);

    var token;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://open.ys7.com/api/lapp/token/get",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        "data": {
            "appKey": "0d93402aa67746eba163adbb6c59f62b",
            "appSecret": "ab8cc5f3f179f493d8ee113c5170a636"
        }
    };
    $.ajax(settings).done(function (response) {
        token = response.data.accessToken;
        
    });
    test();
    setInterval(test, 432000000); //循环执行，定时5天
    function test() {
        $.ajax(settings).done(function (response) {
            token = response.data.accessToken;
            
        });
    }
    //动态获取右侧视频
    function addOption(arr){
        var html2 = '';
        if (arr.length==1){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w100h100">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].number+'@open.ys7.com/'+arr[i].verification+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length == 2){
        	console.log(token)
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w50h100">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'&templete=2"\n' +
                
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length <= 4 && arr.length>=3){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w50h50">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length <= 6 && arr.length>=5){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w33h50">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length <= 9 && arr.length>=7){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w33h33">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length <= 12 && arr.length>=10){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w25h33">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }else if (arr.length <= 16 && arr.length>=13){
            for (var i = 0; i < arr.length; i++) {
                html2 += '<div class="w25h25">' +
                    '<iframe\n' +
                    '        src="https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://'+arr[i].verification+'@open.ys7.com/'+arr[i].number+'/'+arr[i].channel+'.hd.live&autoplay=0&accessToken='+token+'"\n' +
                    '        width="100%"\n' +
                    '        height="100%"\n' +
                    '        id="ysopen2"\n' +
                    '        allowfullscreen\n' +
                    '>\n' +
                    '</iframe>' +
                    '</div>';
            }
            $(".box").html(html2);
        }

    }
})