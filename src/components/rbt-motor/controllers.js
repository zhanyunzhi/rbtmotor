/**
 * Created by zhan on 2016/4/3.
 */
import '../../lib/js/angular.min.js';                   //引入angular文件
//var angular = require('angular');//引入angular
var appModule = angular.module("ngApp",[]);
appModule.controller("IndexCtrl",
    function($scope, $http) {
        //url是相对于我们的html文件的
        /*$http.get("./data.txt").success(function (data) {

        });*/
        var swiper = new Swiper('.nav-swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3000,
            speed: 700,
            loop: true
        })
        var swiperS = new Swiper('.solution-swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2500,
            speed: 500,
            loop: false,
        })
    }
);
appModule.filter(
    'toTrusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);
appModule.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
appModule.directive('onFinishRenderFiltersHistory', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinishedHistory');
                });
            }
        }
    };
});
/*appModule.directive('hello', function() {
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span></div>',
        replace: true,
        transclude: true
    };
});*/
