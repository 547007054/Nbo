layui.use(['table','layer','form','laydate','upload'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;
    var upload = layui.upload;

    laydate.render({
        elem: '#date'
        ,value: new Date()
    });

    /*对接口后注释*/
    /*var topData = [{"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"},
        {"total":"2020-10-10","content1":"宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁宁波地铁.pdf"}];
    renderTable(topData);*/

    //上传PDF
    upload.render({
        elem: '#searchFile' //绑定元素
        ,url: '../../Information/uploadInformation' //上传接口
        ,accept: 'file'
        ,exts: 'pdf|PDF'
        ,before: function(obj) {
            obj.preview(function (index, file, result) {
                console.log(file.name); //得到文件对象
                $("#file").val(file.name);
            });
        }
        ,done: function(res){
            //上传完毕回调
            layer.msg("上传成功");
        }
    });

    // 加载宣贯表格
    $.ajax({
        url: '../../Information/findVideo',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            renderTable(res.data);
        }
    });
    //宣贯表格数据
    function  renderTable(data){
        var inModelTable = table.render({
            elem: '#inModelTable'
            , id: 'inModelTable'
            , toolbar: '#inToolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , title: '宣贯列表'
            , page: true //开启分页
            , limits: [10]
            , limit: 10
            , loading: false
            , cols: [[
                {field: 'total', title: '宣贯日期', align: 'center', width: 650}
                , {field: 'content1', title: '文件名称', align: 'center'}
                , {title: '操作', align: 'center', width: 140, toolbar: '#barDemo1'}
            ]]
            , data: data
        });
    };

    //新增宣贯提交事件
    form.on('submit(iFormDemo)', function(data){
        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '../../Information/addVideo',
            type: 'get',
            data: {
                total: data.field.date,
                content1: data.field.file
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    $.ajax({
                        url: '../../Information/findVideo',
                        type: 'get',
                        dataType: 'json',
                        success: function (res) {
                            renderTable(res.data);
                        }
                    });
                    layer.closeAll();
                    layer.msg('提交成功');
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //宣贯表格头部事件
    table.on('toolbar(inModelTable)', function(obj){
        switch(obj.event){
            case 'addModel':
                layer.open({
                    type:1,
                    area:['500px','280px'],
                    title: '新增制度宣贯信息',
                    shadeClose: true,
                    content: $("#addVideoModel"),
                    shade: 0.4
                });
                break;
            case 'refreshModel':
                $.ajax({
                    url: '../../Information/findVideo',
                    type: 'get',
                    dataType: 'json',
                    success: function (res) {
                        renderTable(res.data);
                    }
                });
                layer.msg("刷新成功");
                break;
        };
    });

    //宣贯行内事件
    table.on('tool(inModelTable)', function(obj) {
        var data = obj.data;
        console.log(data);//data.id
        if (obj.event === 'delete') {
            layer.confirm('确认删除该制度宣贯？', function(index){
                $.ajax({
                    url: '../../Information/deleteVideo',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: data.id
                    },
                    success: function (res) {
                        if(res.data == "成功") {
                            layer.close(index);
                            layer.msg("删除成功！");
                            $.ajax({
                                url: '../../Information/findVideo',
                                type: 'get',
                                dataType: 'json',
                                success: function (res) {
                                    renderTable(res.data);
                                }
                            });
                        }
                    }
                })
            });
        }
        else if(obj.event === 'show'){
            $("#pdf1").attr("src","../../models/"+obj.data.content1);
            layer.open({
                type: 1,
                title: "制度宣贯展示",
                area: ['800px', '500px'],
                content: $('#pdf1')
            });
        }
    });
});

