layui.config({
    base: '../../js/layuiadmin/' //静态资源所在路径
}).use(['laydate','upload','tree','form','layer'], function () {
    var $ = layui.jquery;
    var laydate = layui.laydate;
    var upload = layui.upload;
    var tree = layui.tree;
    var form = layui.form;
    var layer = layui.layer;

    // 项目图片
    var picture = "";
    var uploadImg = upload.render({
        elem: '#chooseImg' //绑定元素
        ,url: '../../Information/uploadInformation' //上传接口
        ,auto: false
        ,bindAction: '#uploadImg'
        ,accept: 'images'
        ,before: function(obj) {
            obj.preview(function (index, file, result) {
                console.log(file.name); //得到文件对象
                picture = file.name;
                $("#picture").attr("src","../../models/"+picture);
            });
        }
        ,done: function(res){
            //上传完毕回调
            layer.msg("上传成功");
        }
        ,error: function(){
            //请求异常回调
        }
    });
    // 项目视频
    var roam = "";
    var uploadVideo = upload.render({
        elem: '#chooseVideo' //绑定元素
        ,url: '../../Information/uploadInformation' //上传接口
        ,auto: false
        ,bindAction: '#uploadVideo'
        ,accept: 'video'
        ,before: function(obj) {
            obj.preview(function (index, file, result) {
                console.log(file.name); //得到文件对象
                roam = file.name;
                $("#roam").attr("src","../../models/"+roam);
                $("#roam source").attr('src',"../../models/"+roam);
                $("#roam").play();
            });
        }
        ,done: function(res){
            //上传完毕回调
            layer.msg("上传成功");
        }
        ,error: function(){
            //请求异常回调
        }
    });

    /*对接口后注释*/
    /*var data1 = {"roam":"宁波地铁.mp4","picture":"工程概况.png","introduction":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁"};
    $("#introduction").val(data1.introduction);
    $("#picture").attr("src","../../models/"+data1.picture);
    $("#roam").attr("src","../../models/"+data1.roam);
    $("#roam source").attr('src',"../../models/"+data1.roam);*/

    var pId = 0;
    $.ajax({
        url: '../../Information/findInformation',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            data = res.data[0];
            if(data){
                $("#introduction").val(data.introduction);
                pId = data.id;
                $("#picture").attr("src","../../models/"+data.picture);
                $("#roam").attr("src","../../models/"+data.roam);
                $("#roam source").attr('src',"../../models/"+data.roam);
            }
        }
    });

    form.on('submit(formDemo)', function(data){
        var introduction = $("#introduction").val();

        if(picture == "" && $("#picture").attr("src") != ""){
            picture = $("#picture").attr("src").slice(13);
        }
        if(roam == "" && $("#roam source").attr("src") != ""){
            roam = $("#roam source").attr("src").slice(13);
        }
        if(introduction == ""){
            layer.msg("请填写项目简介！");
        }else if(picture == ""){
            layer.msg("请上传项目图片！");
        }else if(roam == ""){
            layer.msg("请上传项目漫游视频！");
        }else{
            $.ajax({
                url: '../../Information/addInformation',
                type: 'post',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify({
                	id: pId,
                    introduction: introduction,
                    picture: picture,
                    roam: roam
                }) ,
                success: function (res) {
                    if(res.data == "成功"){
                        layer.msg("提交成功！");
                    }
                }
            });
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});
