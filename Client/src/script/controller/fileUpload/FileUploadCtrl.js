/**
 * Created by hand on 2017/3/28.
 */
var FileUploadCtrl = ["$scope","FileUploader","toaster",'$log','$stateParams', function($scope, FileUploader,toaster,$log, $stateParams){
    $log.debug($stateParams.currentId);
    var uploader = $scope.uploader = new FileUploader({
        url: 'http://localhost:8080/Kingbora/user/uploadAlbum/'+$stateParams.currentId,
        headers:{ 'Authorization': localStorage.getItem("basicAuthHeaderValue")},
        method: 'POST'
    });

    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
        toaster.pop({
            type: 'error',
            title: '错误',
            body: fileItem._file.name+'上传失败',
            showCloseButton: true
        })
    };
}];

module.exports = FileUploadCtrl;