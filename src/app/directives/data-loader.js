/* @ngInject */
module.exports = function myDataLoader() {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var loaderElm = angular.element('<div class="spinner"></div>');
			element.append(loaderElm);

			var image = new Image();
			image.src = attributes.myDataLoader;
			image.onload = function () {
				scope.$apply(function () {
					// Remove the loader element
					element.empty();
					element.css({ backgroundImage: 'url("' + attributes.myDataLoader + '")' });
				});
			};
		}
	};
};