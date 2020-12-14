layui.use(['table','layer','form','upload','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var upload = layui.upload;
    var laydate = layui.laydate;

    renderAll();
    function renderAll(){
        $.ajax({
            url: '../../Point/findWorkPointManage',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                renderTable(res.data);
            }
        });
        /*对接口后注释*/
        /*renderTable([
            {"workPoint":"A区","modelNameN":"1944317199411200","drawingN":"1944317199411200"},
            {"workPoint":"B区","modelNameN":"1944317199411200","drawingN":"1944317199411200"},
            {"workPoint":"芳林园","modelNameN":"1944317199411200","drawingN":"1944317199411200"}
        ]);*/
    }

    //执行渲染
    function  renderTable(data) {
        var worksiteTable = table.render({
            elem: '#worksiteTable'
            , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , loading: false
            , page: true //开启分页
            , limit: 10
            , limits: [10]
            , cols: [[ //表头
                {type: 'numbers', title: '序号', align: "center"}
                , {field: 'workPoint', title: '工点名称', align: "center", width: 400}
                , {field: 'modelNameN', title: '模型编号', align: "center", width: 400}
                , {field: 'drawingN', title: '图纸编号', align: "center", width: 400}
                , {title: '操作', align: 'center', toolbar: '#barDemo'}
            ]]
            , data: data
        });
    }

    //行内事件
    table.on('tool(worksiteTable)', function(obj){
        var data = obj.data;
        console.log(data);
        if(obj.event === 'showD'){
            $.ajax({
                url: '../../Point/queryName',
                type: 'get',
                dataType: 'json',
                data:{
                    workPoint: obj.data.workPoint
                },
                success: function (res) {
                    $("#2DBox").html('');
                    renderD(JSON.parse(res.data1).data);
                    layer.open({
                        type: 1,
                        title: "展示图纸",
                        area: ['900px', '750px'],
                        content: $('#showDrawings')
                    });
                }
            });
        }else if(obj.event === 'showM'){
            $.ajax({
                url: '../../Point/queryName',
                type: 'get',
                dataType: 'json',
                data:{
                    workPoint: obj.data.workPoint
                },
                success: function (res) {
                    $("#3DBox").html('');
                    renderM(JSON.parse(res.data).data);
                    layer.open({
                        type: 1,
                        title: "展示模型",
                        area: ['900px', '750px'],
                        content: $('#showModel'),
                        success: function(layero, index){
                            $("#showModel").css("opacity","1").css("top","0");
                        },
                        end: function(index, layero){
                            $("#showModel").css("opacity","0").css("top","-700px");
                        }
                    });
                }
            });
        }else if(obj.event === 'delete'){
            layer.confirm('确认删除该工点？', function(index){
                $.ajax({
                    url: '../../Point/deletePoint',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: data.id
                    },
                    success: function (res) {
                        if(res.data == "成功") {
                            layer.close(index);
                            layer.msg("删除成功！");
                            renderAll();
                        }
                    }
                })
            });
        }
    });

    //新增工点
    table.on('toolbar(worksiteTable)', function(obj){
        switch(obj.event){
            case 'add':
                layer.open({
                    type: 1,
                    title: "新增工点",
                    area: ['600px', '320px'],
                    content: $('#addZ')
                });
                break;
        }
    });

    //上传图纸
    var uploader = new plupload.Uploader({
        runtimes : 'html5,html4',
        browse_button : 'searchDwg',
        url : 'http://119.23.243.224:8080/bimface-java-sample/upload',
        //url: 'http://119.23.243.224:8080/bimface-zjk/upload',
        filters : {
            max_file_size : '500mb',
            mime_types: [
                {title : "files", extensions : "dwg"}
            ]
        },
        init: {
            FilesAdded: function(up, files) {
                uploader.start();
                return false;
            },
            UploadProgress: function(up, file) {
                $("#searchDwg").html(file.percent-1 + '%');
            },
            FileUploaded : function(up, file, info) {
                layer.msg('上传成功');
                $("#drawingN").val($.parseJSON(info.response).fileId);
                var fileId = $.parseJSON(info.response).fileId;
                getStatus(fileId);
            },
            Error: function(up, err) {
            }
        }
    });
    uploader.init();
    var timer;
    function getStatus(fileId) {
        timer = setInterval(function() {
            $.get('http://119.23.243.224:8080/bimface-java-sample/pull?fileId='+ fileId,function(res){
                //$.get('http://119.23.243.224:8080/bimface-zjk/pull?fileId='+ fileId,function(res){
                var re = $.parseJSON(res);
                if(re.status == 'success') {
                    layer.msg('转换成功');
                    $("#searchDwg").html('上传图纸');
                    clearInterval(timer);
                } else if(re.status == 'failed'){
                    layer.msg('转换失败');
                    clearInterval(timer);
                }
            })
        }, 1000);
    }

    //上传模型
    var uploader1 = new plupload.Uploader({
        runtimes : 'html5,html4',
        browse_button : 'searchMod',
        url : 'http://119.23.243.224:8080/bimface-java-sample/upload',
        //url: 'http://119.23.243.224:8080/bimface-zjk/upload',
        filters : {
            max_file_size : '500mb',
            mime_types: [
                {title : "files", extensions : "rvt"}
            ]
        },
        init: {
            FilesAdded: function(up, files) {
                uploader1.start();
                return false;
            },
            UploadProgress: function(up, file) {
                $("#searchMod").html(file.percent-1 + '%');
            },
            FileUploaded : function(up, file, info) {
                layer.msg('上传成功');
                $("#modelNameN").val($.parseJSON(info.response).fileId);
                var fileId = $.parseJSON(info.response).fileId;
                getStatus1(fileId);
            },
            Error: function(up, err) {
            }
        }
    });
    uploader1.init();
    var timer1;
    function getStatus1(fileId) {
        timer1 = setInterval(function() {
            $.get('http://119.23.243.224:8080/bimface-java-sample/pull?fileId='+ fileId,function(res){
                //$.get('http://119.23.243.224:8080/bimface-zjk/pull?fileId='+ fileId,function(res){
                var re = $.parseJSON(res);
                if(re.status == 'success') {
                    layer.msg('转换成功');
                    $("#searchMod").html('上传模型');
                    clearInterval(timer1);
                } else if(re.status == 'failed'){
                    layer.msg('转换失败');
                    clearInterval(timer1);
                }
            })
        }, 1000);
    }

    //提交新增工点
    form.on('submit(addZHForm)', function(data){
        console.log(data.field);
        $.ajax({
            url: '../../Point/addWorkPoint',
            type: 'get',
            data: {
                workPoint: data.field.workPoint,
                drawingN: data.field.drawingN,
                modelNameN: data.field.modelNameN
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功"){
                    layer.closeAll();
                    renderAll();
                    layer.msg("提交成功!");
                }
            }
        });
        return false;
    });

    //展示模型
    function renderM(token){
        var viewer3D;
        var app;
        var viewToken = token;
        var options = new BimfaceSDKLoaderConfig();
        options.viewToken = viewToken;
        BimfaceSDKLoader.load(options, successCallback, failureCallback);
        function successCallback(viewMetaData) {
            if (viewMetaData.viewType == "3DView") {
                // ======== 判断是否为3D模型 ========
                // 获取DOM元素
                var dom4restore = document.getElementById('3DBox');
                var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
                webAppConfig.domElement = dom4restore;
                // 创建WebApplication
                app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
                // 添加待显示的模型
                app.addView(viewToken);
                // 从WebApplication获取viewer3D对象
                viewer3D = app.getViewer();
                // 监听添加view完成的事件
                viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {
                    //调用viewer3D对象的Method，可以继续扩展功能
                    //自适应屏幕大小
                    window.onresize = function () {
                        viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
                    };
                });
            }
        };

        function failureCallback(error) {
            console.log(error);
        };
    }

    //展示图纸
    function renderD(token){
        var viewer2D;
        var app;
        var viewToken = token;
        // 初始化显示组件
        var options = new BimfaceSDKLoaderConfig();
        options.viewToken = viewToken;
        BimfaceSDKLoader.load(options, successCallback, failureCallback);
        function successCallback(viewMetaData) {
            if (viewMetaData.viewType == "drawingView") {
                // ======== 判断是否为Drawing模型 ========
                // 获取DOM元素
                var dom4Show = document.getElementById('2DBox');
                var webAppConfig = new Glodon.Bimface.Application.WebApplicationDrawingConfig();
                webAppConfig.domElement = dom4Show;
                webAppConfig.drawingUrl = viewMetaData.drawingUrl;
                webAppConfig.viewToken = viewMetaData.viewToken;
                // 创建WebApplication
                app = new Glodon.Bimface.Application.WebApplicationDrawing(webAppConfig);
                // 添加待显示的模型
                app.load(viewToken);
                // 从WebApplication获取viewerDrawing对象
                viewer2D = app.getViewer();
                // 监听添加view完成的事件
                viewer2D.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded, function () {
                    //自适应屏幕大小
                    window.onresize = function () {
                        viewer2D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
                    }
                });
            }
        }
        function failureCallback(error) {
            console.log(error);
        }
    }
});
