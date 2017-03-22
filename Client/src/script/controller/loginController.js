/**
 * Created by hand on 2016/11/25.
 */
var loginController = ['$scope','$state','loginService','$window','$log', function($scope, $state, loginService,$window,$log) {
    var param = {
        account: $window.localStorage.username,
        password: $window.localStorage.password
    };
    $scope.username = "";
    $scope.password = "";
    loginService.login(param).then(function(res){
        if (res.code !== "403") {
            $scope.$emit('isLogin',true);
            $log.debug("s:"+res.data[0].userName);
            $window.localStorage.setItem("username",param.account);
            $window.localStorage.setItem("password",param.password);
        } else {
            $scope.$emit('isLogin',false);
        }
    },function(res){
        $scope.$emit('isLogin',false);
    });
    $scope.login = function() {
        var user = {
            account: $scope.username,
            password: $scope.password
        };
        if (user.account !== "" && user.password !== ""){
            loginService.login(user).then(function(res){
                console.log(res);
                if (res.status === 200) {
                    $window.localStorage.setItem("username",user.account);
                    $window.localStorage.setItem("password",user.password);
                    location.reload();
                }
            },function(err){
                if (err.data) {
                    if(err.data.code === 401) {
                        $scope.err_psw = "密码错误！";
                    } else if(err.data.code === 403) {
                        $scope.err_user = "当前用户未注册！";
                    } else {
                        $scope.err_psw = "网络连接错误！";
                    }
                } else {
                    $scope.err_psw = "网络连接错误！";
                }
            });
        } else {
            if (user.account == "") {
                $scope.err_user = "用户名不能为空！";
            } else if (user.password == "") {
                $scope.err_psw = "密码不能为空！";
            }
        }
    }
}];

module.exports = loginController;