$("#login").click(login)

function login() {
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();

    if (!username) {
        layer.alert('请输入用户名');
    } else if (!password) {
        layer.alert('请输入密码')
    } else if (username !== "宁波地铁" || password !== "123456") {
        layer.alert('用户名密码不正确，请重新输入')
    } else {
        //$.ajax({
        //    url: "mock/login.json",
        //    type: "get",
        //    dataType: "json",
        //    data: {
        //        username: username,
        //        password: password
        //    },
        //    success: function (res) {
        //        if (res.code === 0) {
                    sessionStorage.setItem("login", username);
                    window.location.href = "./index.html";
        //        } else {
        //            layer.alert('用户名密码不正确，请重新输入')
        //        }
        //    }
        //})
    }
}