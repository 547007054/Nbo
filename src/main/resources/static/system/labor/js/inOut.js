layui.use(['table','layer','form','laydate'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laydate = layui.laydate;

    /*对接口后注释*/
    var topData = [{"name":"张三","position":"建筑工人","workType":"水泥工","hiredate":"9-1","place":"一号轧机","time":"9-2 7:30","Type":"进"},
        {"name":"张三","position":"建筑工人","workType":"水泥工","hiredate":"9-1","place":"一号轧机","time":"9-2 7:30","Type":"进"},
        {"name":"张撒的","position":"管理人员","workType":"管理人员","hiredate":"9-1","place":"二号轧机","time":"9-2 7:30","Type":"进"},
        {"name":"张个签","position":"建筑工人","workType":"水泥工","hiredate":"9-1","place":"一号轧机","time":"9-2 7:30","Type":"进"},
        {"name":"张改为","position":"建筑工人","workType":"水泥工","hiredate":"9-1","place":"一号轧机","time":"9-2 7:30","Type":"进"},
        {"name":"张哥","position":"建筑工人","workType":"水泥工","hiredate":"9-1","place":"一号轧机","time":"9-2 12:30","Type":"出"},];

    renderTable(topData);

    //加载进出场数据
     $.ajax({
         url: '',
         type: 'get',
         dataType: 'json',
         success: function (res) {
             renderTable(res.data);
         }
     });

    //展示数据
    function  renderTable(data){
        var inModelTable = table.render({
            elem: '#inModelTable'
            , id: 'inModelTable'
            , toolbar: '#inToolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            , defaultToolbar: []
            , title: '新增单位信息'
            , page: true //开启分页
            , limits: [15]
            , limit: 15
            , loading: false
            , cols: [[
                {field: 'name', title: '姓名', align: 'center'}
                , {field: 'position', title: '职位', align: 'center'}
                , {field: 'workType', title: '工种', align: 'center'}
                , {field: 'hiredate', title: '入/离职时间', align: 'center'}
                , {field: 'place', title: '进/出场地点', align: 'center'}
                , {field: 'time', title: '进/出场时间', align: 'center'}
                , {field: 'Type', title: '进/出场类型', align: 'center'}
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

    //表格头部事件
    table.on('toolbar(inModelTable)', function(obj){
        switch(obj.event){
            case 'refreshModel':
                $.ajax({
                    url: '',
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

});

