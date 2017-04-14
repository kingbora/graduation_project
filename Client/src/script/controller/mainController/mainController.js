/**
 * Created by hand on 2017/1/8.
 */
var mainController = ['$scope', '$rootScope', '$state', 'loginService', '$window', 'albumService','$timeout','$log', function ($scope, $rootScope, $state, loginService, $window, albumService, $timeout, $log) {
    init();
    function init() {
        var param = {
            account: $window.localStorage.username,
            password: $window.localStorage.password
        };
        loginService.login(param).then(function (res) {
            if (res.status == 200) {
                $scope.userInfo = res.data;
                $scope.userInfo.portrait = rootConfig.basePath + $scope.userInfo.portrait;
                $rootScope.loginSuccess = true;
                $window.localStorage.setItem("userId", $scope.userInfo.userId);
                localStorage.setItem("basicAuthHeaderValue", "Basic " + window.btoa(param.account + ":" + param.password));
            } else {
                $rootScope.loginSuccess = false;
            }
        }, function (res) {
            $rootScope.loginSuccess = false;
        });
    }

    $scope.$on("refreshUserInfo", function (event, data) {
        init();
    });
    $timeout(function () {
        var userId = localStorage.getItem("userId");
        albumService.getFirstRecommendAlbum(1, 10, userId).then(function (res) {
            $log.debug(res);
        }, function (err) {

        });
    });

    $scope.itemsVal = [{
        'title': '旅游',
        'selected': true
    }, {
        'title': '人物',
        'selected': false
    }, {
        'title': '美食',
        'selected': false
    }, {
        'title': '亲子',
        'selected': false
    }];
    $scope.itemVal = $scope.itemsVal[0].title;
    $scope.select = function (item) {
        var length = $scope.itemsVal.length;
        for (var i = 0; i < length; i++) {
            $scope.itemsVal[i].selected = false;
        }
        item.selected = true;
        $scope.itemVal = item.title;
    };
    $scope.logout = function () {
        localStorage.clear();
        $rootScope.loginSuccess = false;
        $state.go('home.start');
    };

    $.get("pages/mainPage/scrollPhoto.html");
}];

module.exports = mainController;