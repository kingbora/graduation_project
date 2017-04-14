/**
 * Created by hand on 2016/12/7.
 */
var personCenter = ['$scope','FileUploader','$window','loginService','toaster','$state','$log', function($scope, FileUploader, $window,loginService,toaster,$state,$log) {
    init();
    function init() {
        var param = {
            account: $window.localStorage.username,
            password: $window.localStorage.password
        };
        loginService.login(param).then(function(res){
            if (res.status == 200) {
                $scope.userInfo = res.data;
                $scope.username = $scope.userInfo.userName;
                $scope.usex = $scope.userInfo.userSex;
                $scope.imgUrl = rootConfig.basePath + $scope.userInfo.portrait;
                $scope.description = $scope.userInfo.description;
            }
        },function(res){
            toaster.pop({
                type: 'error',
                title: '错误',
                body: '拉取个人信息错误',
                showCloseButton: true
            });
            $state.go('home.start');
        });
    }
    $scope.uploadStatus = false; //定义上传后返回的状态
    var uploader = $scope.uploader = new FileUploader({
        url: 'http://localhost:8080/Kingbora/user/singleSave',
        method: 'POST',
        alias: 'file',
        autoUpload: false
    });

    // FILTERS

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
        console.log(fileItem._file);
        $scope.reader = new FileReader();
        $scope.reader.readAsDataURL(fileItem._file);
        $scope.reader.onload = function(ev){
            $scope.$apply(function(){
                $scope.imgUrl = ev.currentTarget.result;
            });
        };
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        item.formData= [{
            userId: $scope.userInfo.userId,
            username: $scope.username,
            usex: Number($scope.usex),
            description: $scope.description
        }];
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', headers);
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
        init();
        $scope.$emit("refreshUserInfo", true);
    };

    $scope.submit = function (){
        if (uploader.queue.length > 0) {
            uploader.uploadAll();
        } else {
            var formData= {
                userId: $scope.userInfo.userId,
                username: $scope.username,
                usex: Number($scope.usex),
                description: $scope.description
            };
            loginService.updateUserInfo(formData).then(function(res){
                $log.debug(res);
                $scope.$emit("refreshUserInfo", true);
            },function(err){
                $log.debug(err);
            });
        }
    };

    console.info('uploader', uploader);

}];

module.exports = personCenter;