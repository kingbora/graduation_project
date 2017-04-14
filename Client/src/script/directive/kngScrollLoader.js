/**
 * Created by hand on 2017/4/10.
 */
var kngScrollLoader = ['$window','$document',function($window, $document){
    return {
        restrict: 'E',
        link: function(scope, elem, attr) {
            angular.element($window).bind("scroll", function() {
                var pageYOffset = $window.pageYOffset;
                var clientHeight = $document[0].documentElement.clientHeight;
                var offsetHeight = $document[0].body.offsetHeight;
                //当滚动到90%的时候去加载
                if (pageYOffset + clientHeight > offsetHeight*0.9) {
                    //scope.showWorkCanLoad是否可加载
                    //scope.showWorkOnLoad是否正在加载
                    if (scope.showWorkCanLoad === true && scope.showWorkOnload === false) {
                        //加载更多
                        scope.loadMore();
                    }
                }
            })
        }
    }
}];

module.exports = kngScrollLoader;