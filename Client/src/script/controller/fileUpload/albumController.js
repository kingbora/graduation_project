/**
 * Created by hand on 2017/3/29.
 */
var albumController = ['$scope','$rootScope','toaster','$state','$timeout','$log','confirmService','modalService','albumService',function($scope,$rootScope,toaster,$state, $timeout,$log,confirmService,modalService,albumService) {
    init();

    $rootScope.$on("refreshAlbumList", function(data){
        init();
    });

   function init() {
        albumService.getAlbum().then(function(res){
            $log.debug(res);
            $scope.lists = res.data;
            if ($scope.lists.length > 0) {
                $scope.setCurrentId(res.data[0].albumId);
            } else {
                $scope.albumPhoto = [];
            }
        },function(err){
            $log.debug(err);
        });
    }

    $scope.setCurrentId = function(id) {
        $scope.currentId = id;
        $scope.albumPhoto = [];
        albumService.downloadAlbum(id).then(function(res){
            var albumPhoto = res.data;
            for(var i = 0; i < albumPhoto.length;i ++){
                var o = {};
                o.imgUrl = rootConfig.basePath + albumPhoto[i].imgUrl;
                o.imgName = albumPhoto[i].imgName;
                o.id = albumPhoto[i].id;
                $scope.albumPhoto.push(o);
            }
        },function(err){

        });
    };

    $scope.uploadAlbum = function ($event, id) {
        $event.stopPropagation();
        $state.go('home.albumUpload',{
            currentId: id
        });
    };

    $scope.newAlbum = function() {
        var modalTitle = '新建相册';
        modalService.openModalWindow(modalTitle,-1).then(function(){

        });
    };

    $scope.deletePhoto = function($event,id) {
        $event.stopPropagation();
        var modalTitle = '提示！';
        var modalContent = '是否确定删除吗？';
        confirmService.openConfirmWindow(modalTitle,modalContent).then(function(){
            albumService.deletePhoto(id).then(function(){
                init();
            },function(){
                toaster.pop({
                    type: 'error',
                    title: '错误',
                    body: '删除该图片失败',
                    showCloseButton: true
                });
            });
        },function(){
            console.log('....cancel');
        });
    };

    $scope.deleteAlbum = function($event, id) {
        $event.stopPropagation();
        var modalTitle = '提示！';
        var modalContent = '是否确定删除吗？';
        confirmService.openConfirmWindow(modalTitle,modalContent).then(function(){
            albumService.deleteAlbum(id).then(function(){
                init();
            },function(){
                toaster.pop({
                    type: 'error',
                    title: '错误',
                    body: '删除该相册失败',
                    showCloseButton: true
                });
            });
        },function(){
            console.log('....cancel');
        });
    };

    $scope.modifyAlbum = function($event,id) {
        $event.stopPropagation();
        var modalTitle = '修改相册信息';
        modalService.openModalWindow(modalTitle,id).then(function(){

        });
    }

}];

module.exports = albumController;