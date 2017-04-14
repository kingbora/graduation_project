/**
 * Created by hand on 2017/4/5.
 */
var kngButterBar = ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
    return {
        restrict: 'AC',
        template:'<span class="bar"></span>',
        link: function(scope, el, attrs) {
            el.addClass('butterbar hide');
            scope.$on('$stateChangeStart', function(event, toState) {
                var url = toState.url;
                if (url === '/start'||url==='/tu'||url==='/child'||url==='/hot'||url==='/register') {
                    $anchorScroll();
                    el.removeClass('hide').addClass('active');
                } else {
                    if($rootScope.loginSuccess){
                        $anchorScroll();
                        el.removeClass('hide').addClass('active');
                    }else{
                        event.preventDefault();
                        $(".hd-login-btn").click();
                    }
                }
                $anchorScroll();
                el.removeClass('hide').addClass('active');
            });
            scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                event.targetScope.$watch('$viewContentLoaded', function(){
                    el.addClass('hide').removeClass('active');
                })
            });
        }
    };
}];

module.exports = kngButterBar;