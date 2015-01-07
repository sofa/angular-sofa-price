'use strict';

describe('sofa.price', function () {

    var element, $compile, $rootScope;

    beforeEach(module('sofa.price'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should display price of given product', function () {
        $rootScope.product = {
            price: 22.40
        };
        element = $compile('<sofa-price product="product"></sofa-price>')($rootScope);
        $rootScope.$digest();

        expect(element.scope().product.price).toEqual(22.4);
    });
});
