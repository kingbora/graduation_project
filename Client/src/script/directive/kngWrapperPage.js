/**
 * Created by hand on 2017/1/9.
 */
var kngWrapperPage = ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'pages/mainPage/wrapperPage.html',
        link: function(scope, element, attrs){
            $timeout(function(){
                $('#container').masonry({
                    itemSelector: '.grid',
                    isAnimated: true,
                    // columnWidth: 450,
                    isFitWidth: true     // 自适应宽度
                });
            },500);
        }
    }
}];

module.exports = kngWrapperPage;