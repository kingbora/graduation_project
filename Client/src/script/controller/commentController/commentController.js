/**
 * Created by hand on 2017/3/31.
 */
var commentController = ['$scope','commentService','$log', function($scope,commentService,$log){
    commentService.getComment(1).success(function(res){
        $scope.list = res;
        $log.debug($scope.list);
    });
    //$scope.$on('refreshComment',function(data){
    //    if (data) {
    //        commentService.getComment(1).success(function(res){
    //            $scope.list = res;
    //            $log.debug($scope.list);
    //        });
    //    }
    //})
}];

module.exports = commentController;