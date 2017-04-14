/**
 * Created by hand on 2016/12/20.
 */
var registerService = ['$http', function($http) {
    var registerService = {
        registerService: function(param) {
            var promise = $http.post(rootConfig.basePath + '/user/register',param);
            return promise;
        },
        sendCode: function(param){
            var promise = $http.get(rootConfig.basePath + '/send_code',param);
            return promise;
        }
    };
    return registerService;
}];

module.exports = registerService;