angular.module('sofa-price.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-price.tpl.html',
    '<span class="sofa-price" ng-class="priceController.hasSpecialPrice() ? \'sofa-price--special\' : \'sofa-price--basic\'">\n' +
    '    <span class="sofa-price__price--old" ng-if="priceController.hasSpecialPrice()" ng-bind="priceController.oldPrice | currency"></span>\n' +
    '    <span class="sofa-price__price" ng-bind="priceController.price | currency"></span>\n' +
    '</span>\n' +
    '');
}]);
