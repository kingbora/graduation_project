/**
 * Created by hand on 2017/4/10.
 */
var albumService =['$http', function($http){
    return {
        saveAlbum: function(param) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.post(rootConfig.basePath + '/user/saveAlbum',param, options);
        },
        getAlbum: function() {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/getAlbum', options);
        },
        modifyAlbum: function(param) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.post(rootConfig.basePath + '/user/modifyAlbum', param, options);
        },
        deleteAlbum: function(id) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.delete(rootConfig.basePath + '/user/deleteAlbum/'+id, options);
        },
        deletePhoto: function(id) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.delete(rootConfig.basePath + '/user/deletePhoto/'+id, options);
        },
        getAlbumDetail: function(id) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/getAlbumDetail/'+id, options);
        },
        getAlbumPhoto: function() {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/getAlbumPhoto', options);
        },
        downloadAlbum: function(id) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/downloadAlbum/'+id, options);
        },
        getFirstRecommendAlbum: function(pageNum, pageSize, userId) {
            return $http.get(rootConfig.basePath + '/user/getFirstRecommendAlbum?pageSize='+pageSize+"&pageNum="+pageNum+"&userId="+userId);
        }
    }
}];

module.exports = albumService;