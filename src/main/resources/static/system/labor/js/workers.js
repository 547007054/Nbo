layui.use(['table','layer','form','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;

    /*对接口后注释*/
    //renderTable([{"name": "1","type": "1","sex": "1","politics": "1","cardId": "1","site": "1","contact": "1","wage": "1","state": "1","foreman": "1"}]);

    //加载表格
    renderTable1();
    function renderTable1(){
        $.ajax({
            url: '../../Workers/findWorkers',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                renderTable(res.data);
            }
        });
    }

    //表格数据
    function  renderTable(data){
        var inModelTable = table.render({
            elem: '#inModelTable'
            , id: 'inModelTable'
            , toolbar: '#inToolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , title: '劳务人员信息'
            , page: true //开启分页
            , limits: [15]
            , limit: 15
            , loading: false
            , cols: [[
                {field: 'name', title: '姓名', align: 'center'}
                , {field: 'type', title: '工种', align: 'center'}
                , {field: 'sex', title: '性别', align: 'center'}
                , {field: 'politics', title: '政治面貌', align: 'center'}
                , {field: 'cardId', title: '身份证号', align: 'center'}
                , {field: 'site', title: '地址', align: 'center'}
                , {field: 'contact', title: '联系方式', align: 'center'}
                , {field: 'wage', title: '工资(元)', align: 'center'}
                , {field: 'state', title: '工资状态', align: 'center'}
                , {field: 'foreman', title: '工长', align: 'center'}
                , {title: '操作', align: 'center', width: 140, toolbar: '#barDemo'}
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
            url: '../../Workers/addWorkers',
            type: 'get',
            data: {
                name: data.field.name,
                type: data.field.type,
                sex: data.field.sex,
                politics: data.field.politics,
                cardId: data.field.cardId,
                site: data.field.site,
                contact: data.field.contact,
                wage: data.field.wage,
                state: data.field.state,
                foreman: data.field.foreman
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    renderTable1();
                    layer.closeAll();
                    layer.msg('提交成功');
                }
            }
        });

        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //修改提交事件
    form.on('submit(inFormDemo1)', function(data){
        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        $.ajax({
            url: '../../Workers/updateWorkers',
            type: 'get',
            data: {
                id: id,
                name: data.field.name,
                type: data.field.type,
                sex: data.field.sex,
                politics: data.field.politics,
                cardId: data.field.cardId,
                site: data.field.site,
                contact: data.field.contact,
                wage: data.field.wage,
                state: data.field.state,
                foreman: data.field.foreman
            },
            dataType: 'json',
            success: function (res) {
                if(res.data == "成功") {
                    renderTable1();
                    layer.closeAll();
                    layer.msg('修改成功');
                }
            }
        });

        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

   //头部事件
    table.on('toolbar(inModelTable)', function(obj){
        switch(obj.event){
            case 'addModel':
                $("#formBtn").attr("lay-filter","inFormDemo");
                form.val("addInForm", {
                    "name": ""
                    ,"type": ""
                    ,"sex": ""
                    ,"politics": ""
                    ,"cardId": ""
                    ,"site": ""
                    ,"contact": ""
                    ,"wage": ""
                    ,"state": ""
                    ,"foreman": ""
                });
                layer.open({
                    type:1,
                    area:['500px','650px'],
                    title: '新增劳务人员信息',
                    content: $("#addInModel")
                });
                break;
            case 'refreshModel':
                renderTable1();
                layer.msg("刷新成功");
                break;
        };
    });

    var id;
    //行内事件
    table.on('tool(inModelTable)', function(obj) {
        var data = obj.data;
        console.log(data);//data.id
        if (obj.event === 'delete') {
            layer.confirm('确认删除该劳务人员？', function(index){
                $.ajax({
                    url: '../../Workers/deleteWorkers',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: data.id
                    },
                    success: function (res) {
                        if(res.data == "成功") {
                            layer.close(index);
                            layer.msg("删除成功！");
                            renderTable1();
                        }
                    }
                })
            });
        }else if(obj.event === 'update'){
            $("#formBtn").attr("lay-filter","inFormDemo1");
            id = data.id;
            form.val("addInForm", {
                "name": data.name
                ,"type": data.type
                ,"sex": data.sex
                ,"politics": data.politics
                ,"cardId": data.cardId
                ,"site": data.site
                ,"contact": data.contact
                ,"wage": data.wage
                ,"state": data.state
                ,"foreman": data.foreman
            });
            layer.open({
                type:1,
                area:['500px','650px'],
                title: '修改劳务人员信息',
                content: $("#addInModel")
            });
        }
    });
});

