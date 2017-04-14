/**
 * Created by hand on 2017/4/6.
 */
var newAlbumController = ['$scope','$rootScope','$log','toaster','$modalInstance','modalData','albumService',function($scope,$rootScope,$log,toaster,$modalInstance,modalData,albumService){
    $scope.modalData = modalData;

    if ($scope.modalData.id === -1) {
        $scope.isPublic = true;
        $scope.albumStyle = "1";
        $scope.albumName = "";
        $scope.albumDescription = "";
    } else {
        albumService.getAlbumDetail($scope.modalData.id).then(function(res){
            $scope.isPublic = Boolean(res.data.isPublic);
            $scope.albumStyle = ""+res.data.associate_style;
            $scope.albumName = res.data.name;
            $scope.albumDescription = res.data.description;
        },function(err){
            $scope.isPublic = true;
            $scope.albumStyle = "1";
            $scope.albumName = "";
            $scope.albumDescription = "";
        });
    }

    $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
    };

    $scope.saveAlbum = function() {
        var param = {
            id: $scope.modalData.id,
            albumStyle: parseInt($scope.albumStyle),
            albumName: $scope.albumName,
            albumDescription: $scope.albumDescription,
            isPublic: Number($scope.isPublic)
        };
        $log.debug(param);
        if ($scope.albumName.length > 0 && $scope.albumDescription.length > 0) {
            //上传新建相册信息
            if ($scope.modalData.id !== -1) {
                //修改相册
                albumService.modifyAlbum(param).then(function(res){
                    $modalInstance.close();
                    $rootScope.$broadcast('refreshAlbumList',true);
                },function(err) {
                    toaster.pop({
                        type: 'error',
                        title: '错误',
                        body: '修改失败！请稍后重试',
                        showCloseButton: true
                    });
                });
            } else {
                //新建相册
                albumService.saveAlbum(param).then(function(res){
                    $log.debug(res);
                    $modalInstance.close();
                    $rootScope.$broadcast('refreshAlbumList',true);
                },function(err) {
                    $log.debug(err);
                    if (err.status === 403) {
                        toaster.pop({
                            type: 'warning',
                            title: '警告',
                            body: '该相册已存在，请重新命名',
                            showCloseButton: true
                        });
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: '错误',
                            body: '保存失败！请稍后重试',
                            showCloseButton: true
                        });
                    }
                });
            }
        } else {
            toaster.pop({
                type: 'warning',
                title: '警告',
                body: '请完整填写相册信息',
                showCloseButton: true
            });
        }
    }
}];

module.exports = newAlbumController;