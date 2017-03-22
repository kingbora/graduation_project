/**
 * Created by hand on 2017/3/20.
 */
var kngAnimateImage = ['$log','$compile','$timeout',function($log,$compile,$timeout){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $log.debug($(element));
            $timeout(function(){
                $.get("pages/mainPage/animateImage.html", function(data) {
                    $(element).html($compile(data)(scope));
                    $('#pp_full_res').carouFredSel({
                        prev: '.pp_arrow_previous',
                        next: '.pp_arrow_next',
                        auto: {
                            button: '#pp_player',
                            progress: '#timer',
                            pauseOnEvent: 'resume'
                        },
                        scroll: {
                            fx: 'crossfade',
                            duration: 1000
                        }
                    });
                    var elem = $(".pp_pic_holder");
                    var elem_width = elem.width();
                    var elem_height = elem.height();
                    elem.css({'width':elem_width,'height':elem_height,'margin-left':-elem_width/2,'margin-top':-elem_height/2});
                    $log.debug($(".pp_pic_holder").width()+","+$(".pp_pic_holder").height());
                });
                $log.debug("ok2");
            }, 1000);
        }
    }
}];

module.exports = kngAnimateImage;