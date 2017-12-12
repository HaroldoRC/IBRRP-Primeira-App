angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('billingCycle', {
      url: "/billingCycles?page",
      templateUrl: "billingCycle/tabs.html"
    }).state('cannonScene', {
      url: "/cannonScenes?page",
      templateUrl: "cannonScene/tabs.html"
    })
    $urlRouterProvider.otherwise('/dashboard')
}])
