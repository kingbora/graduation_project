/**
 * Created by hand on 2016/12/19.
 */
var kngCheck = ['$log',function($log){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var modal = $(".modal-backdrop");
            if (modal.length > 0) {
                modal.remove();
            }
            element.on('focus', function(){
                if(attrs.type === 'tel') {
                    scope.err_tel = 0;
                    scope.tel_err_info = "";
                } else if (attrs.type === 'password') {
                    scope.err_psw = 0;
                    scope.psw_err_info = "";
                } else if (attrs.type === 'captcha') {
                    if (scope.send_code_state) {
                        scope.err_captcha = 0;
                        scope.captcha_err_info = "";
                    } else {
                        scope.err_captcha = -1;
                        scope.captcha_err_info = "请先发送验证码";
                    }
                }
                scope.$apply();
            });
            function checkStrong(val) {
                var modes = 0;
                if (val.length < 6) return 0;
                if (/\d/.test(val)) modes++; //数字
                if (/[a-z]/.test(val)) modes++; //小写
                if (/[A-Z]/.test(val)) modes++; //大写
                if (/\W/.test(val)) modes++; //特殊字符
                if (val.length > 12) return 4;
                return modes;
            }
            scope.$watch('password',function(newData, oldData){
                if (newData !== undefined && newData !== "") {
                    if (checkStrong(newData) === 0) {
                        scope.scale = 1;
                        scope.psw_err_info = "弱";
                    } else if (checkStrong(newData) === 1) {
                        scope.scale = 2;
                        scope.psw_err_info = "中";
                    } else if (checkStrong(newData) === 2) {
                        scope.scale = 3;
                        scope.psw_err_info = "强";
                    } else if (checkStrong(newData) >= 3) {
                        scope.scale = 4;
                        scope.psw_err_info = "非常强";
                    }
                }
            });
            //!(/^1(3|4|5|7|8)\d{9}$/.test(scope.phone))
            element.on('blur', function(){
                if (scope.err_psw === 0 || scope.err_captcha === 0 || scope.err_tel === 0) {

                } else {
                    if (attrs.type === 'tel') {
                        //scope.phone !== undefined && scope.phone !== ""
                        if (scope.phone !== undefined && scope.phone !== "") {
                            if (!(/^1(3|4|5|7|8)\d{9}$/.test(scope.phone))){
                                scope.err_tel = -1;
                                scope.tel_err_info = "请输入正确的手机号";
                            } else {
                                scope.err_tel = 1;
                                scope.tel_err_info = "";
                            }
                        } else {
                            scope.err_tel = undefined;
                        }
                    } else if (attrs.type === 'password') {
                        if (scope.password !== undefined && scope.password !== "") {
                            if (scope.password.length < 6 || scope.password.length > 20){
                                scope.err_psw = -1;
                                scope.psw_err_info = "请输入6~20位有效字符";
                            } else {
                                scope.err_psw = 1;
                                scope.psw_err_info = "";
                            }
                        } else {
                            scope.err_psw = undefined;
                        }
                    } else if (attrs.type === 'captcha') {
                        if (scope.send_code_state !== undefined) {
                            if (scope.captcha === scope.response_code) {
                                scope.err_captcha = 1;
                                scope.captcha_err_info = "";
                            } else {
                                scope.err_captcha = -1;
                                scope.captcha_err_info = "验证码错误";
                            }
                        }
                    }
                    scope.$apply();
                }
            });
        }
    }
}];

module.exports = kngCheck;