angular.module('sofa-price.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-price.tpl.html',
    '<span class="sofa-price" ng-class="product.hasOldPrice() ? \'sofa-price--special\' : \'sofa-price--basic\'">\n' +
    '    <span class="sofa-price__price--old" ng-if="product.hasOldPrice()" ng-bind="priceOld | currency"></span>\n' +
    '    <span class="sofa-price__price" ng-bind="price | currency"></span>\n' +
    '</span>');
}]);
