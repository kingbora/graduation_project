/**
 * Created by hand on 2017/4/1.
 */
var kngAutoFocus = ['$log','$parse','$timeout',function($log,$parse,$timeout){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var model = $parse(attr.kngAutoFocus);
            if (model) {
                $timeout(function(){
                    $(elem).css("textIndent",$(elem).siblings(".reply_placeholder").width()+8+"px");
                    elem[0].focus();
                },10);
            }
            $(elem).on('scroll', function(){
                $(this).siblings(".reply_placeholder").css("top",3-$(elem).scrollTop() +"px");
            });
        }
    }
}];

module.exports = kngAutoFocus;