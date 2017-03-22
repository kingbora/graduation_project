/**
 * Created by hand on 2016/11/24.
 */
'use strict';
var app = angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'angularFileUpload'
]);

//controller
var rootController = require('../controller/rootController');
var loginController = require('../controller/loginController');
var personCenter = require("../controller/personCenter");
var multipartUpload = require("../controller/multipartUpload");
var photoWall = require("../controller/photoWall");
var registerController = require("../controller/registerController");
var mainController = require("../controller/mainController");
var wrapperPageController = require("../controller/wrapperPageController");
var scrollPhotoController = require("../controller/scrollPhotoController");
var uploadController = require("../controller/uploadController");

//service
var sessionStorage = require('../service/sessionStorage');
var loginService = require('../service/loginService');
var imageService = require("../service/imageService");
var registerService = require("../service/registerService");

//directive
var kngConfigLoader = require('../directive/kngConfigLoader');
var kngCheck = require('../directive/kngCheck');
var kngWrapperPage = require('../directive/kngWrapperPage');
var kngScrollPhoto = require('../directive/kngScrollPhoto');
var kngAnimateImage = require('../directive/kngAnimateImage');

app.config(['$logProvider','$stateProvider','$urlRouterProvider',function ($logProvider, $stateProvider,$urlRouterProvider) {
    ////debug，默认开启
    $logProvider.debugEnabled(true);
    //$logProvider.debugEnabled(false);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('login',{
        url:'/login',
        templateUrl: 'pages/main.html'
    }).state('home',{
        url:'/',
        templateUrl: 'pages/mainPage/personalAlbum.html'
    }).state("uploadImage", {
        url: "/uploadImage",
        templateUrl: 'pages/imageController/uploadImage.html'
    }).state('personalCenter', {
        url: "/photoWall",
        templateUrl: 'pages/personalCenter/photoWall.html'
    }).state('register', {
        url: "/register",
        templateUrl: 'pages/personalCenter/register.html'
    });
    //$routeProvider.when('/',{
    //    templateUrl: 'pages/main.html'
    //})
    //    .when('/person',{
    //        templateUrl: 'pages/menu.html'
    //    })
    //    .otherwise({
    //        templateUrl: 'index.html'
    //    });
}]);

app.controller('rootController', rootController);
app.controller('loginController', loginController);
app.controller('personCenter', personCenter);
app.controller('multipartUpload', multipartUpload);
app.controller('photoWall', photoWall);
app.controller('registerController', registerController);
app.controller('mainController', mainController);
app.controller('wrapperPageController', wrapperPageController);
app.controller('scrollPhotoController', scrollPhotoController);
app.controller('uploadController', uploadController);


app.directive('kngConfigLoader', kngConfigLoader);
app.directive('kngCheck', kngCheck);
app.directive('kngWrapperPage', kngWrapperPage);
app.directive('kngScrollPhoto', kngScrollPhoto);
app.directive('kngAnimateImage', kngAnimateImage);


app.factory('sessionStorage',sessionStorage);
app.service('loginService', loginService);
app.service('imageService', imageService);
app.service('registerService', registerService);

app.constant('AUTH_EVENTS',{
    loginSuccess: false,
    logoutSuccess: false,
    sessionTimeout: false,
    notAuthorized: false
});