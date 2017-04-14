/**
 * Created by hand on 2017/4/1.
 */
var commentService =['$http', function($http){
    return {
        saveComment: function(param) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.post(rootConfig.basePath + '/user/comment',param, options);
        },
        getComment: function(associate_album) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/getComments/'+associate_album, options);
        },
        getCommentById: function(associate_album,parent_id) {
            var options = { headers: { 'Authorization': localStorage.getItem("basicAuthHeaderValue")}};
            return $http.get(rootConfig.basePath + '/user/getCommentById/'+associate_album+"/"+parent_id, options);
        }
    }
}];

module.exports = commentService;