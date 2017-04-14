/**
 * Created by hand on 2016/11/25.
 */
var loginController = ['$scope','$state','loginService','$window','$log','$rootScope', function($scope, $state, loginService,$window,$log,$rootScope) {
    $scope.login = function() {
        var user = {
            account: $scope.username,
            password: $scope.password
        };
        if (user.account !== "" && user.password !== ""){
            loginService.login(user).then(function(res){
                console.log(res);
                if (res.status === 200) {
                    $scope.userInfo = res.data;
                    $scope.userInfo.portrait = rootConfig.basePath + $scope.userInfo.portrait;
                    $rootScope.loginSuccess = true;
                    $window.localStorage.setItem("username",user.account);
                    $window.localStorage.setItem("password",user.password);
                    $window.basicAuthHeaderValue = "Basic " + window.btoa(user.account + ":" + user.password);
                    location.reload();
                }
            },function(err){
                if(err.status === 401) {
                    $scope.err_psw = "密码错误！";
                } else if(err.status === 403) {
                    $scope.err_user = "当前用户未注册！";
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