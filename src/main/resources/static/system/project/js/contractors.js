layui.use(['table','layer','form','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;

    /*对接口后注释*/
    /*var topData = [{units:"业主单位",name:"中铁十九局"},
        {units:"监理单位",name:"中铁十九局"},
        {units:"勘察单位",name:"中铁十九局"},
        {units:"设计单位",name:"中铁十九局"},
        {units:"施工单位",name:"中铁十九局"},
        {units:"勘察单位",name:"中铁十九局"},
        {units:"设计单位",name:"中铁十九局"},
        {units:"施工单位",name:"中铁十九局"}];
    renderTable(topData);*/

    //加载表格
    $.ajax({
        url: '../../Information/findParticipating',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            renderTable(res.data);
        }
    });

    //表格数据
    function  renderTable(data){
        var inModelTable = table.render({
            elem: '#inModelTable'
            , id: 'inModelTable'
            , toolbar: '#inToolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , title: '单位信息'
            , page: true //开启分页
            , limits: [5,10,15,20]
            , limit: 15
            , loading: false
            , cols: [[
                {field: 'units', title: '单位类型', align: 'center'}
                , {field: 'name', title: '单位名称', align: 'center'}
                , {title: '操作', align: 'center', width: 80, toolbar: '#barDemo'}
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
        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '../../Information/addParticipating',
            type: 'get',
            data: {
                name: data.field.name,    //单位名称
                units: data.field.units  //单位类型
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    $.ajax({
                        url: '../../Information/findParticipating',
                        type: 'get',
                        data: {},
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

   //头部事件
    table.on('toolbar(inModelTable)', function(obj){
        switch(obj.event){
            case 'addModel':
                $("#inTest").css("display","block");
                form.val("addInForm", {
                    "units": ""
                    ,"name": ""
                });
                layer.open({
                    type:1,
                    area:['500px','225px'],
                    title: '新增单位信息',
                    content: $("#addInModel")
                });
                break;
            case 'refreshModel':
                $.ajax({
                    url: '../../Information/findParticipating',
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

    table.on('tool(inModelTable)', function(obj) {
        var data = obj.data;
        console.log(data);//data.id
        if (obj.event === 'delete') {
            layer.confirm('确认删除该单位？', function(index){
                $.ajax({
                    url: '../../Information/deleteParticipating',
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
                                url: '../../Information/findParticipating',
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
    });
});

