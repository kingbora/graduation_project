/**
 * Created by hand on 2016/11/24.
 */
'use strict';
var app = angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'angularFileUpload',
    'toaster',
    'akoenig.deckgrid'
]);

//controller
var rootController = require('../controller/rootController');
var loginController = require('../controller/mainController/loginController');
var personCenter = require("../controller/personalCenter/personCenter");
var registerController = require("../controller/personalCenter/registerController");
var mainController = require("../controller/mainController/mainController");
var wrapperPageController = require("../controller/imageController/wrapperPageController");
var scrollPhotoController = require("../controller/imageController/scrollPhotoController");
var FileUploadCtrl = require("../controller/fileUpload/FileUploadCtrl");
var albumController = require("../controller/fileUpload/albumController");
var userInfoController = require("../controller/userManager/userInfoController");
var commentController = require("../controller/commentController/commentController");
var newAlbumController = require("../controller/fileUpload/newAlbumController");
var waterFallController = require("../controller/imageController/waterFallController");
var commentChildController = require("../controller/commentController/commentChildController");

//service
var sessionStorage = require('../service/sessionStorage');
var loginService = require('../service/loginService');
var imageService = require("../service/imageService");
var registerService = require("../service/registerService");
var commentService = require("../service/commentService");
var confirmService = require("../service/confirmService");
var modalService = require("../service/modalService");
var albumService = require("../service/albumService");

//directive
var kngConfigLoader = require('../directive/kngConfigLoader');
var kngCheck = require('../directive/kngCheck');
var kngScrollPhoto = require('../directive/kngScrollPhoto');
var kngAnimateImage = require('../directive/kngAnimateImage');
var kngTreeMap = require('../directive/kngTreeMap');
var kngAutoFocus = require('../directive/kngAutoFocus');
var kngButterBar = require('../directive/kngButterBar');

//filter
var timeFilter = require('../filter/timeFilter');
var textLengthFilter = require('../filter/textLengthFilter');

app.config(['$logProvider','$stateProvider','$urlRouterProvider',function ($logProvider, $stateProvider,$urlRouterProvider) {
    ////debug，默认开启
    $logProvider.debugEnabled(true);
    //$logProvider.debugEnabled(false);
    $urlRouterProvider.otherwise('/home/start');
    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'pages/mainPage/personalAlbum.html'
    }).state("home.start", {
        url:'/start',
        templateUrl:'pages/contentPage/homePage.html'
    }).state("home.tu", {
        url: '/tu',
        templateUrl: 'pages/contentPage/tu.html'
    }).state("home.child", {
        url: '/child',
        templateUrl: 'pages/contentPage/child.html'
    }).state('home.hot', {
        url: '/hot',
        templateUrl: 'pages/contentPage/hot.html'
    }).state('home.personalCenter', {
        url: '/personalCenter',
        templateUrl: 'pages/personalCenter/personalCenter.html'
    }).state("uploadImage", {
        url: "/uploadImage",
        templateUrl: 'pages/imageController/uploadImage.html'
    }).state('register', {
        url: "/register",
        templateUrl: 'pages/personalCenter/register.html'
    }).state('home.albumSet', {
        url: '/albumSet',
        templateUrl: 'pages/fileUpload/albumSet.html'
    }).state('home.albumUpload', {
        url: '/albumUpload?currentId',
        templateUrl: 'pages/fileUpload/albumUpload.html'
    }).state('userInfo', {
        url: '/userInfo',
        templateUrl: 'pages/Manager/userInfo.html'
    }).state('comment', {
        url:'/comment',
        templateUrl: 'pages/commentArea/commentArea.html'
    }).state('forgotpwd', {
        url: '/forgotpwd',
        templateUrl: 'pages/personalCenter/forgotpwd.html'
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
app.controller('registerController', registerController);
app.controller('mainController', mainController);
app.controller('wrapperPageController', wrapperPageController);
app.controller('scrollPhotoController', scrollPhotoController);
app.controller('FileUploadCtrl', FileUploadCtrl);
app.controller('albumController',albumController);
app.controller('userInfoController', userInfoController);
app.controller('commentController', commentController);
app.controller('newAlbumController',newAlbumController);
app.controller('waterFallController', waterFallController);
app.controller('commentChildController', commentChildController);

app.directive('kngConfigLoader', kngConfigLoader);
app.directive('kngCheck', kngCheck);
app.directive('kngScrollPhoto', kngScrollPhoto);
app.directive('kngAnimateImage', kngAnimateImage);
app.directive('kngTreeMap', kngTreeMap);
app.directive('kngAutoFocus', kngAutoFocus);
app.directive('kngButterBar', kngButterBar);


app.factory('sessionStorage',sessionStorage);
app.factory('confirmService', confirmService);
app.factory('modalService', modalService);
app.service('loginService', loginService);
app.service('imageService', imageService);
app.service('registerService', registerService);
app.service('commentService', commentService);
app.service('albumService', albumService);

app.filter('timeFilter', timeFilter);
app.filter('textLengthFilter', textLengthFilter);