/**
 * Created by hand on 2017/3/31.
 */
var kngTreeMap = ['$log',function($log){
    return {
        restrict: 'E',
        scope: {
            list: "=list"
        },
        templateUrl: 'pages/commentArea/treeMap.html',
        link: function(scope, element, attrs){
        }
    }
}];

module.exports = kngTreeMap;