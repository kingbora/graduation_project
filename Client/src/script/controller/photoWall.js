/**
 * Created by hand on 2016/12/16.
 */
var photoWall = ['$scope', 'imageService', function($scope, imageService){
    $scope.imageDatas = [];
    imageService.imageService("../../json/imageDatas.json").then(function(response){
        $scope.imageDatas = response.data;
    },function(err){

    });
}];

module.exports = photoWall;