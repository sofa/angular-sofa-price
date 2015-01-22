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
        controller: function ($scope) {
            var self = this;

            self.hasSpecialPrice = function () {
                return !!($scope.specialPrice && $scope.specialPrice !== $scope.price);
            };

            self.setPrices = function () {
                self.price = self.hasSpecialPrice() ?  $scope.specialPrice : $scope.price;
                self.oldPrice = self.hasSpecialPrice() ? $scope.price : null;
            };
        },
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
