/**
 * Created by hand on 2017/4/7.
 */
var confirmService = ['$q','$modal',function($q,$modal) {
    return {
        openConfirmWindow: function(modalTitle,modalContent,modalInstance) {
            var deferred = $q.defer();

            var confirmModal = $modal.open({
                backdrop: 'static',
                templateUrl: 'pages/modal/confirmModal.html',
                controller: ['$scope','data','$modalInstance',function($scope,data,$modalInstance){
                    $scope.data = data;
                    $scope.ok = function() {
                        $modalInstance.close();
                    };
                    $scope.cancel = function() {
                        $modalInstance.dismiss("cancel");
                    }
                }],
                windowClass: 'confirmModal',
                size: 'sm',
                resolve: {
                    data: function() {
                        return {modalTitle: modalTitle,modalContent: modalContent};
                    }
                }
            });
            confirmModal.result.then(function() {
                if (!!modalInstance) {
                    modalInstance.dismiss('cancel');
                }
                deferred.resolve();
            },function(){

            });
            return deferred.promise;
        }
    }
}];

module.exports = confirmService;