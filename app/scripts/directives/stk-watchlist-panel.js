'use strict';

angular.module('stockDogApp')
  // [1] Register directive and inject dependencies
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
        // [2] Initialize variables
        $scope.currentList = $routeParams.listId;
        $scope.watchlist = {};

        // [3] Bind model from service to this scope
        $scope.watchlists = WatchlistService.query();

        // [4] Display addlist modal
        $scope.openModal = function () {
          $scope.modalInstance = $modal.open({
            templateUrl: 'views/templates/addlist-modal.html',
            scope: $scope
          });
        };

        $scope.cancelModal = function () {
          $scope.modalInstance.dismiss('cancel');
        };

        // [5] Create a new list from fields in modal
        $scope.createList = function () {
          WatchlistService.save($scope.watchlist);
          $scope.modalInstance.close();
          $scope.watchlist = {};
        };

        // [6] Delete desired list and redirect to home
        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        };

        $scope.gotoList = function (listId) {
        	$location.path('watchlist/' + listId);
        };
      }
    };
  });
