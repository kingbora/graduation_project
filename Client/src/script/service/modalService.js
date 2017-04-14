/**
 * Created by hand on 2017/4/7.
 */
var confirmService = ['$q','$modal',function($q,$modal) {
    return {
        openModalWindow: function(modalTitle,id,modalInstance) {
            var deferred = $q.defer();

            var albumModal = $modal.open({
                backdrop: 'static',
                templateUrl: 'pages/modal/albumModal.html',
                controller: 'newAlbumController',
                windowClass: 'newAlbumModal',
                resolve: {
                    modalData: function() {
                        return {modalTitle: modalTitle,id:id};
                    }
                }
            });
            albumModal.result.then(function() {
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