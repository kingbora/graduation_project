/**
 * Created by hand on 2016/12/7.
 */
//var kngFileModel = ['$parse', function($parse) {
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs, ngModel) {
//            var model = $parse(attrs.fileModel);
//            var modelSetter = model.assign;
//            element.bind('change', function(event){
//                scope.$apply(function(){
//                    modelSetter(scope, element[0].file[0]);
//                });
//            })
//        }
//    }
//}];