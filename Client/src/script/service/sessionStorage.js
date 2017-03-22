/**
 * Created by hand on 2016/11/23.
 */
'use strict';
var sessionStorage =['$window', function ($window) {
    var store = $window.sessionStorage;
    return {
        save: function (key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        },
        get: function (key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        },
        delete: function (key) {
            store.removeItem(key);
        }
    }
}];
module.exports = sessionStorage;
