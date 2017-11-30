/**
 * Created by zhan on 2016/4/3.
 */
import '../../lib/js/angular.min.js';                   //引入angular文件
//var angular = require('angular');//引入angular
var appModule = angular.module("ngApp",[]);
appModule.controller("IndexCtrl",
    function($scope, $http, $location) {
        //url是相对于我们的html文件的
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURIComponent(r[2]); return null;
        }
        window.sessionStorage.pId = GetQueryString('id');
        var pId = parseInt(window.sessionStorage.pId) || '';
        $scope.page = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.length-1);
        $http.get("./data.txt").success(function (data) {
            $scope.products = data.products;           //产品所有数据
            $scope.productDetail = data.products[pId-1];           //当前产品数据
            $scope.navs = data.navs;
        });
        var swiper = new Swiper('.nav-swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 3000,
            speed: 700,
            loop: true
        })
        var swiper1 = new Swiper('.solution-swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            //pagination: '.swiper-pagination',
            //paginationClickable: true,
            autoplay: 2500,
            speed: 500,
            loop: true,
        });
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
