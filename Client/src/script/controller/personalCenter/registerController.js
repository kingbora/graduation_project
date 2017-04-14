/**
 * Created by hand on 2016/12/19.
 */
var registerController = ['$scope','$timeout','$interval','registerService','$window','$state','$rootScope', function($scope, $timeout, $interval, registerService, $window, $state,$rootScope) {
    $scope.send_code_msg = "获取验证码";
    $scope.btn_info = "注册";
    var timer = null;
    $scope.send_code = function() {
        $scope.send_code_state = true;
        $scope.err_captcha = undefined;
        $scope.captcha_err_info = "";
        $scope.send_code_msg = "短信发送中";
        var param = {
            phone: $scope.phone
        };
        $timeout(function(){
            var second = 60;
            timer = $interval(function(){
                if (second <= 0) {
                    $scope.send_code_msg = "获取验证码";
                } else {
                    $scope.send_code_msg = second + "s后重新获取";
                    second --;
                }
            },1000);
        },500);
        registerService.sendCode(param).then(function(res){
            $scope.response_code = res;
        },function(err){
            $interval.cancel(timer);
            $scope.send_code_msg = "验证码发送失败";
            $scope.$apply();
            $timeout(function(){
                $scope.send_code_msg = "重新获取验证码";
                $scope.send_code_state = false;
            },1000);
        });
    };
    $scope.submit = function() {
        var param = {
            phone: $scope.phone,
            password: $scope.password
        };
        registerService.registerService(param).then(function(res){
            $rootScope.loginSuccess = true;
            $window.localStorage.setItem("username",$scope.phone);
            $window.localStorage.setItem("password",$scope.password);
            $scope.btn_info = "注册成功";
            $timeout(function(){
                $state.go('home.start');
            },2000);
        },function(err){
            $rootScope.loginSuccess = false;
            $scope.btn_info = "注册失败";
            $timeout(function(){
                $state.go('register');
            },2000);
        });
    };
    $scope.delVal = function(param) {
        if (param === 'tel' && $scope.err_tel === 0) {
            $scope.phone = "";
            angular.element("input[type='tel']").focus();
        } else if (param === 'captcha' && $scope.err_captcha === 0){
            $scope.captcha = "";
        } else if (param === 'password' && $scope.err_psw === 0) {
            $scope.password = "";
        }
    }
}];

module.exports = registerController;