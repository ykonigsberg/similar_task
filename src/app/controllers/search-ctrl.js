/* @ngInject */
module.exports = function SearchCtrl($state, FlickrService) {
    'use strict';
	var ctrl = this;
	ctrl.displayText = 'Flickr Photos';
	ctrl.size = 'm';
	ctrl.searchType = {
		state: $state.current.name,
		searchQuery: $state.params.tag  || $state.params.id
	};
	ctrl.displayLayout = 'gallery';
	ctrl.sort = {
		column: '',
		descending: true
	};

	ctrl.getIndexValue = function(index) {
		if ((ctrl.sort.column === '' && ctrl.sort.descending ) ||
				ctrl.sort.column !== '') {
					return index
		} else {
			return ctrl.photos.length - index;
		}
	};

	ctrl.setSelectedColumnClass = function(column) {
		return column == ctrl.sort.column && 'sort-' + ctrl.sort.descending;
	};

	ctrl.changeSorting = function(column) {
		if (ctrl.sort.column === column) {
			ctrl.sort.descending = !ctrl.sort.descending;
		} else {
			ctrl.sort.column = column;
			ctrl.sort.descending = false;
		}
	};

	ctrl.setSearchByRoute = function () {
		if (ctrl.searchType.state === 'owner') {
			FlickrService.getPublicPhotos({ user_id: ctrl.searchType.searchQuery },
				function (data) {
					ctrl.photos = data.photos.photo;
				});
		} else if (ctrl.searchType.state === "tags") {
			FlickrService.search({tags: ctrl.searchType.searchQuery},
			function (data) {
				ctrl.photos = data.photos.photo;
			});
		}
	};

	ctrl.searchPhotos = function() {
		if(ctrl.searchType.state === 'owner') {
			$state.go('owner', { id: ctrl.searchType.searchQuery });
		} else if (ctrl.searchType.state === 'tags') {
			$state.go('tags', { tag: ctrl.searchType.searchQuery});
		}
	};

	ctrl.setSearchByRoute();
};
