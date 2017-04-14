/**
 * Created by hand on 2017/3/13.
 */
var scrollPhotoController = ['$scope','$log','$timeout','$compile', function($scope, $log,$timeout,$compile){
    $log.debug("photoId:"+$scope.photoId);
    $scope.isPlay = true;
    $scope.closeDeploy = function() {
        $("#scrollPhoto").animate({opacity:0},300,function(){
            $("#scrollPhoto").remove();
        });
    };
}];

module.exports = scrollPhotoController;