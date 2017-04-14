/**
 * Created by hand on 2017/3/30.
 */
var userInfoController = ['$scope','$http', function($scope, $http){
    $http.get("http://localhost:8080/Kingbora/Admin/getUsers").success(function(res){
        $scope.dataList = res;
    });
    $http.get("http://localhost:8080/Kingbora/Admin/getComments").success(function(res){
        $scope.commentList = res;
    })
}];

module.exports = userInfoController;