/**
 * Created by hand on 2017/4/14.
 */
var commentChildController = ['$scope','commentService',function($scope,commentService){
    $scope.showWrapBoxMethod = function(obj){
        var elm = $(".content-wrap-box");
        var $scopes = elm.scope();
        if (!obj.showWrapBox) {
            if (elm.length > 0) {
                $scopes.showWrapBox = false;
                elm.remove();
            }
        }
        obj.showWrapBox = !obj.showWrapBox;
    };
    $scope.submitComment = function(data,obj) {
        var param = {
            parent_id:data.id,
            associate_album:data.album_id,
            content:obj.commentContent
        };
        commentService.saveComment(param).success(function(){
            $scope.$emit("refreshComment", true);
        });
    };
}];

module.exports = commentChildController;