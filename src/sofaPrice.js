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
