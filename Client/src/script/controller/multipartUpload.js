/**
 * Created by hand on 2016/12/14.
 */
/**
 * Created by hand on 2016/12/7.
 */
var multipartUpload = ['$scope','FileUploader','$window', function($scope, FileUploader, $window) {
    $scope.uploadStatus = false; //定义上传后返回的状态
    var uploader = $scope.uploader = new FileUploader({
        url: 'http://localhost:8080/Kingbora/multipleSave',
        method: 'POST',
        alias: 'file',
        autoUpload: false
    });

    // FILTERS
    uploader.filters.push({
        name: 'syncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            console.log('syncFilter');
            return this.queue.length < 10;
        }
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    $scope.clearItems = function() {
        //rechoice file,clear Queue
        uploader.clearQueue();
    };

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.log(fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
        console.log(addedFileItems.length);
        var preview = document.getElementById("preview");
        for (var i = 0;i < addedFileItems.length; i ++) {
            $scope.reader = new FileReader();
            $scope.reader.readAsDataURL(addedFileItems[i]._file);
            $scope.reader.onload = function(ev){
                var img = document.createElement('img');
                img.src = ev.currentTarget.result;
                preview.append(img);
            };
        }

    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', response);
        //$scope.imgUrl = $window['rootConfig']['basePath'] + headers.imgurl;
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    $scope.submit = function (){
        uploader.uploadAll();
    };


    console.info('uploader', uploader);

}];

module.exports = multipartUpload;