/**
 * Created by hand on 2017/1/8.
 */
var mainController = ['$scope', function($scope) {
    $scope.itemsVal = [{
        'title':'旅游',
        'selected': true
    },{
        'title':'人物',
        'selected': false
    },{
        'title':'美食',
        'selected': false
    },{
        'title':'亲子',
        'selected': false
    }];
    $scope.isLogin = false;
    $scope.itemVal = $scope.itemsVal[0].title;
    $scope.select = function(item){
        var length = $scope.itemsVal.length;
        for (var i = 0; i < length; i ++) {
            $scope.itemsVal[i].selected = false;
        }
        item.selected = true;
        $scope.itemVal = item.title;
    };
    $scope.$on('isLogin',function(event,data){
        $scope.isLogin = data;
    });
    $.get("pages/scrollPhoto.html");
}];

module.exports = mainController;