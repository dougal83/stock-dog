'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, $modal, WatchlistService, CompanyService) {
    // Initializations
    $scope.companies = CompanyService.query();
    $scope.watchlist = WatchlistService.query($routeParams.listId);

    $scope.stocks = $scope.watchlist.stocks;
    $scope.newStock = {};

    $scope.openStockModal = function () {
      $scope.modalInstance = $modal.open({
        templateUrl: 'views/templates/addstock-modal.html',
        scope: $scope
      });
    };

    $scope.cancelModal = function () {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.addNewStock = function () {
      $scope.watchlist.addStock({
        listId: $routeParams.listId,
        company: $scope.newStock.company,
        shares: $scope.newStock.shares
      });
      $scope.modalInstance.close();
      $scope.newStock = {};
    };
    
  });
