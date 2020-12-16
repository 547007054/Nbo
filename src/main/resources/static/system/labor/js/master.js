layui.use(['table','layer','form','upload'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var upload = layui.upload;

    // 上传工长照片
    var uploadImg = upload.render({
        elem: '#chooseImg' //绑定元素
        ,url: '../../Information/uploadInformation' //上传接口
        ,auto: false
        ,bindAction: '#uploadImg'
        ,accept: 'images'
        ,before: function(obj) {
            obj.preview(function (index, file, result) {
                console.log(file.name); //得到文件对象
                $("#picture").val(file.name);
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
    //renderTable([{"foreman": "1","company": "1","phone": "1","address": "1","territory": "1","team": "1","number": "1","foreignd": "1","picture": "1"}]);

    //加载表格
    renderTable1();
    function renderTable1(){
        $.ajax({
            url: '../../Workers/findMaster',
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
            , title: '工长信息'
            , page: true //开启分页
            , limits: [15]
            , limit: 15
            , loading: false
            , cols: [[
                {field: 'foreman', title: '工长姓名', align: 'center'}
                , {field: 'company', title: '公司名称', align: 'center'}
                , {field: 'phone', title: '联系电话', align: 'center'}
                , {field: 'address', title: '居住地址', align: 'center'}
                , {field: 'territory', title: '负责区域', align: 'center'}
                , {field: 'team', title: '施工协作队伍简介', align: 'center'}
                , {field: 'number', title: '现有施工人数', align: 'center'}
                , {field: 'foreignd', title: '外来务工人员人数', align: 'center'}
                , {field: 'picture', title: '工长照片', align: 'center'}
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
            url: '../../Workers/addMaster',
            type: 'get',
            data: {
                foreman: data.field.foreman,
                company: data.field.company,
                phone: data.field.phone,
                address: data.field.address,
                territory: data.field.territory,
                team: data.field.team,
                number: data.field.number,
                foreignd: data.field.foreignd,
                picture: data.field.picture
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
            url: '../../Workers/updateMaster',
            type: 'get',
            data: {
                id: id,
                foreman: data.field.foreman,
                company: data.field.company,
                phone: data.field.phone,
                address: data.field.address,
                territory: data.field.territory,
                team: data.field.team,
                number: data.field.number,
                foreignd: data.field.foreignd,
                picture: data.field.picture
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
                    "foreman": ""
                    ,"company": ""
                    ,"phone": ""
                    ,"address": ""
                    ,"territory": ""
                    ,"team": ""
                    ,"number": ""
                    ,"foreignd": ""
                    ,"picture": ""
                });
                layer.open({
                    type:1,
                    area:['500px','651px'],
                    title: '新增工长信息',
                    content: $("#addInModel"),
                    shade: 0.4
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
            layer.confirm('确认删除该工长？', function(index){
                $.ajax({
                    url: '../../Workers/deleteMaster',
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
                "foreman": data.foreman
                ,"company": data.company
                ,"phone": data.phone
                ,"address": data.address
                ,"territory": data.territory
                ,"team": data.team
                ,"number": data.number
                ,"foreignd": data.foreignd
                ,"picture": data.picture
            });
            layer.open({
                type:1,
                area:['500px','651px'],
                title: '修改工长信息',
                content: $("#addInModel")
            });
        }
    });
});

