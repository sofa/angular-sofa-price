/**
 * angular-sofa-price - v0.1.0 - Wed Jan 07 2015 15:29:45 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-price.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-price.tpl.html',
    '<span class="sofa-price" ng-class="product.hasOldPrice() ? \'sofa-price--special\' : \'sofa-price--basic\'">\n' +
    '    <span class="sofa-price__price--old" ng-if="product.hasOldPrice()" ng-bind="priceOld | currency"></span>\n' +
    '    <span class="sofa-price__price" ng-bind="price | currency"></span>\n' +
    '</span>');
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
 * The `sofaPrice` directives takes care of updating a products price when it
 * changes due to updates in an existing variant selector.
 */
.directive('sofaPrice', function() {

    'use strict';

    return {
        restrict: 'E',
        replace: true,
        scope: {
            product: '=',
            selectedVariant: '=?'
        },
        templateUrl: 'sofa-price.tpl.html',
        link: function ($scope) {

            // We can't have the template directly bind to the product.price because
            // that's leaving out the selected variant which changes dynamically
            // outside of the product model.

            // So what we need to do is to listen manually for changes on the product or
            // the variant and then update the price on our isolated scope.
            var updatePrices = function() {
                $scope.price = $scope.product.price;
                $scope.priceOld = $scope.product.priceOld;

                if ($scope.selectedVariant && $scope.selectedVariant.price !== undefined) {
                    $scope.price = $scope.selectedVariant.price;
                }
            };

            $scope.$watch('product', updatePrices);
            $scope.$watch('selectedVariant', updatePrices);
        }
    };
});
}(angular));
