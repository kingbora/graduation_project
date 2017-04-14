/**
 * Created by hand on 2017/3/13.
 */
var kngScrollPhoto = ['$log','$compile',function($log,$compile){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).on('click', function(){
                scope.photoId = attrs['kngScrollPhoto'];
                $.get("pages/mainPage/scrollPhoto.html", function(data){
                    $("body").append($compile(data)(scope));
                    //$('#wrapper').hover(function() {
                    //    $('#navi').stop().animate({
                    //        bottom: 0
                    //    });
                    //}, function() {
                    //    $('#navi').stop().animate({
                    //        bottom: -60
                    //    });
                    //});
                });
            });
        }
    }
}];

module.exports = kngScrollPhoto;