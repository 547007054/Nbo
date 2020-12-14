layui.use(['table','layer','form','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;

    /*对接口后注释*/
    var topData = [{"number":"JK561312","channel":"A区","verification":"大门口"},
        {"number":"JK651631","channel":"A区","verification":"办公室"},
        {"number":"JK695229","channel":"A区","verification":"深基坑"},
        {"number":"JK894641","channel":"A区","verification":"机械"},
        {"number":"JK321654","channel":"A区","verification":"钢筋加工棚"},
        {"number":"JK169123","channel":"A区","verification":"大门口"}];
    renderTable(topData);

    //加载表格
    $.ajax({
        url: '../../Monitor/findMonitor',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            renderTable(res.data);
        }
    });
    //监控数据
    function  renderTable(data){
        var inModelTable = table.render({
            elem: '#inModelTable'
            , id: 'inModelTable'
            , toolbar: '#inToolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , title: '监控信息'
            , page: true //开启分页
            , limits: [5,10,15,20]
            , limit: 15
            , loading: false
            , cols: [[
                  {field: 'number', title: '序列号', align: 'center'}
                , {field: 'channel', title: '通道号', align: 'center'}
                , {field: 'verification', title: '验证码', align: 'center'}
                , {title: '操作', align: 'center', width: 160, toolbar: '#barDemo'}
            ]]
            , data: data
            , done: function (res, curr, count) {
                if (count == 0) {
                    $(".layui-table-main").html('<div class="layui-none">暂无数据</div>');
                    $(".layui-table-page").hide();
                }
            }
        });
    };

    //新增提交事件
    form.on('submit(inFormDemo)', function(data){
        $.ajax({
            url: '../../Monitor/addMonitor',
            type: 'get',
            data: {
                number: data.field.number,    //序列号
                channel: data.field.channel,  //通道号
                verification: data.field.verification  //验证码
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    $.ajax({
                        url: '../../Monitor/findMonitor',
                        type: 'get',
                        dataType: 'json',
                        success: function (res) {
                            renderTable(res.data);
                        }
                    });
                    layer.close(layer.index);
                    layer.msg('提交成功');
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //修改提交事件
    var id;
    form.on('submit(editForm)', function(data){
        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '../../Monitor/updateMonitor',
            type: 'get',
            data: {
                id:id,
                number: data.field.number,    //序列号
                channel: data.field.channel,  //通道号
                verification: data.field.verification  //验证码
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    $.ajax({
                        url: '../../Monitor/findMonitor',
                        type: 'get',
                        dataType: 'json',
                        success: function (res) {
                            renderTable(res.data);
                            layer.closeAll();
                        }
                    });

                    layer.msg('提交成功');
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //表格头部事件
    table.on('toolbar(inModelTable)', function(obj){
        switch(obj.event){
            case 'addModel':
                $("#tijiao").attr("lay-filter","inFormDemo");
                $("#inTest").css("display","block");
                form.val("addInForm", {
                    "number": ""
                    ,"channel":""
                    ,"verification":""
                });
                layer.open({
                    type:1,
                    area:['500px','280px'],
                    title: '新增监控信息',
                    shadeClose: true,
                    content: $("#addInModel"),
                    shade: 0.4
                });
                break;
            case 'refreshModel':
                $.ajax({
                    url: '../../Monitor/findMonitor',
                    type: 'get',
                    dataType: 'json',
                    success: function (res) {
                        renderTable(res.data);
                    }
                });
                layer.msg("刷新成功");
                break;
        }
    });

    //操作栏事件
    table.on('tool(inModelTable)', function(obj) {
        var data = obj.data;
        console.log(data);//data.id
        if (obj.event === 'delete') {
            layer.confirm('确认删除该信息？', function(index){
                $.ajax({
                    url: '../../Monitor/deleteMonitor',
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
                                url: '../../Monitor/findMonitor',
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
        } else if(obj.event === 'edit'){
            $('#tijiao').attr("lay-filter","editForm");
            id = obj.data.id;
            form.val("addInForm", {
                "number":obj.data.number
                ,"channel":obj.data.channel
                ,"verification":obj.data.verification
            });
            layer.open({
                type: 1,
                title: "修改监控信息",
                area: ['500px', '280px'],
                content: $('#addInModel')
            });
        }
    });

});

