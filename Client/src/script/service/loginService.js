/**
 * Created by hand on 2016/11/25.
 */
var loginService = ['$http','$window',function($http,$window){
    var loginService = {
        login: function(user) {
            var url = rootConfig.basePath + '/user/login';
            var promise = $http.post(url, user);
            return promise;
        },
        updateUserInfo: function(param) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return  $http.post(rootConfig.basePath + '/user/updateUserInfo', param, options);
        }
    };
    return loginService;
}];

module.exports = loginService;