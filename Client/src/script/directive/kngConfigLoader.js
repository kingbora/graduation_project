/**
 * Created by hand on 2016/11/25.
 */
var kngConfigLoader = ['$window', '$http', '$log', function ($window, $http, $log) {
    return {
        restrict: "E",
        link: function (scope, element, attrs) {
            for (var attr in attrs) {
                if (attr.substr(0, 1) !== '$') {
                    scope.attr = attr;
                    $http.get(attrs[scope.attr]).then(function (response) {
                        $window[scope.attr] = response.data;
                        $log.debug(angular.toJson($window[scope.attr], true));
                    });
                }
            }
        }
    };
}];

module.exports = kngConfigLoader;