/**
 * Created by hand on 2016/12/7.
 */
var imageService = ['$http', function($http) {
    var imageService =  {
        imageService: function(param) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            var promise = $http.get(param);
            return promise;
        }
    };
    return imageService;
}];

module.exports = imageService;