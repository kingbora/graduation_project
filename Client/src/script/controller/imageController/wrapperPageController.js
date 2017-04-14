/**
 * Created by hand on 2017/3/7.
 */
var wrapperPageController = ['$scope','$log', function($scope, $log) {
    $scope.isOpen = false;

    $scope.comment = function(event) {
        $(event.target).parents().find(".hd-attribution")[0].after("<div>reply</div>");
    };

    $scope.reply = function(event) {
        $log.debug($(event.target).parent().parent());
    };

    $scope.deployAlbum = function(photo_id){
        $scope.currentPhotoId = photo_id;
        $scope.isOpen = true;
    };

    $scope.closeRibbon = function() {
        $scope.isOpen = false;
    }
}];

module.exports = wrapperPageController;