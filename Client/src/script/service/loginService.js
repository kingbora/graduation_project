/**
 * Created by hand on 2016/11/25.
 */
var loginService = ['$http','$log',function($http,$log){
    var loginService = {
        login: function(user) {
            $log.debug(rootConfig.basePath + '/login');
            var promise = $http.post(rootConfig.basePath + '/login?account='+user.account+"&password="+user.password);
            return promise;
        }
    };
    return loginService;
}];

module.exports = loginService;