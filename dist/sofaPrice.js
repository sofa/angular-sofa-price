/**
 * angular-sofa-price - v0.1.1 - Wed Jan 21 2015 18:21:07 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-price.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-price.tpl.html',
    '<span class="sofa-price" ng-class="priceController.hasSpecialPrice() ? \'sofa-price--special\' : \'sofa-price--basic\'">\n' +
    '    <span class="sofa-price__price--old" ng-if="priceController.hasSpecialPrice()" ng-bind="priceController.oldPrice | currency"></span>\n' +
    '    <span class="sofa-price__price" ng-bind="priceController.price | currency"></span>\n' +
    '</span>\n' +
    '');
}]);

/**
 * @sofadoc overview
 * @name sofa.price
 * @package angular-sofa-price
 * @distFile dist/sofaPrice.js
 *
 * @description
 * `sofa.price` Angular module.
 */
angular.module('sofa.price', ['sofa-price.tpl.html'])

/**
 * @sofadoc directive
 * @name sofa.price.directive:sofaPrice
 * @restrict E
 *
 * @description
 *
 * The `sofaPrice` directives displays either a normal price
 * or a combination of "special price" and "old price", by passing it
 * a normal price and optionally a "special price".
 *
 */
.directive('sofaPrice', function() {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        controller: ["$scope", function ($scope) {
            var self = this;

            self.hasSpecialPrice = function () {
                return !!($scope.specialPrice && $scope.specialPrice !== $scope.price);
            };

            self.setPrices = function () {
                self.price = self.hasSpecialPrice() ?  $scope.specialPrice : $scope.price;
                self.oldPrice = self.hasSpecialPrice() ? $scope.price : null;
            };
        }],
        controllerAs: 'priceController',
        scope: {
            price: '=',
            specialPrice: '=?'
        },
        templateUrl: 'sofa-price.tpl.html',
        link: function (scope, element, attrs, ctrl) {
            ctrl.setPrices();

            scope.$watchCollection('[price, specialPrice]', function (nv, ov) {
                if (nv !== ov) {
                    ctrl.setPrices();
                }
            });

        }
    };
});
}(angular));
