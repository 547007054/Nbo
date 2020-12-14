//退出登录
function logout() {
    sessionStorage.removeItem("login")
    window.location.href = "../login.html"
}