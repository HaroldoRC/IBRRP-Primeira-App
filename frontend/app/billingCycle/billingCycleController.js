angular.module('primeiraApp').controller('CannasdasonSceneCtrl', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  CannonSceneController
])

function CannonSceneController($scope, $http, $location, msgs, tabs, consts) {

  $scope.getCannonScene = function() {
    const page = parseInt($location.search().page) || 1
    const url = `${consts.apiUrl}/cannonScenes?skip=${(page - 1) * 10}&limit=10`
    $http.get(url).then(function(resp) {
      $scope.cannonScenes = resp.data
      $scope.cannonScene = {}
      initCreditsAndDebts()
      $http.get(`${consts.apiUrl}/cannonScenes/count`).then(function(resp) {
        $scope.pages = Math.ceil(resp.data.value / 10)
        tabs.show($scope, {tabList: true, tabCreate: true})
      })
    })
  }

  $scope.createCannonScene = function() {
    const url = `${consts.apiUrl}/cannonScenes`;
    $http.post(url, $scope.cannonScene).then(function(response) {
      $scope.cannonScene = {}
      initCreditsAndDebts()
      $scope.getCannonScenes()
      msgs.addSuccess('Operação realizada com sucesso!!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabUpdate = function(billingCycle) {
    $scope.billingCycle = billingCycle
    initCreditsAndDebts()
    tabs.show($scope, {tabUpdate: true})
  }

  $scope.updateCannonScene = function() {
    const url = `${consts.apiUrl}/billingCycles/${$scope.billingCycle._id}`
    $http.put(url, $scope.billingCycle).then(function(response) {
      $scope.billingCycle = {}
      initCreditsAndDebts()
      $scope.getBillingCycles()
      tabs.show($scope, {tabList: true, tabCreate: true})
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabDelete = function(billingCycle) {
    $scope.billingCycle = billingCycle
    initCreditsAndDebts()
    tabs.show($scope, {tabDelete: true})
  }

  $scope.deleteBillingCycle = function() {
    const url = `${consts.apiUrl}/billingCycles/${$scope.billingCycle._id}`
    $http.delete(url, $scope.billingCycle).then(function(response) {
       $scope.billingCycle = {}
       initCreditsAndDebts()
       $scope.getBillingCycles()
       tabs.show($scope, {tabList: true, tabCreate: true})
       msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function(resp) {
       msgs.addError(resp.data)
    })
  }

  $scope.addDebt = function(index) {
    $scope.cannonScene.cannons.params.splice(index + 1, 0, {})
  }

  $scope.cloneDebt = function(index, {name, chanel, value}) {
    $scope.cannonScene.cannons.params.splice(index + 1, 0, {name, chanel, value})
    initCreditsAndDebts()
  }

  $scope.deleteDebt = function(index) {
    $scope.cannonScene.cannons.params.splice(index, 1)
    initCreditsAndDebts()
  }

  $scope.addCredit = function(index) {
    $scope.cannonScene.cannons.splice(index + 1, 0, {name: null, value: null})
  }

  $scope.cloneCredit = function(index, {name, value}) {
    $scope.cannonScene.cannons.splice(index + 1, 0, {name, value})
    initCreditsAndDebts()
  }

  $scope.deleteCredit = function(index) {
    $scope.cannonScene.cannons.splice(index, 1)
    initCreditsAndDebts()
  }

  $scope.cancel = function() {
    tabs.show($scope, {tabList: true, tabCreate: true})
    $scope.cannonScene = {}
    initCreditsAndDebts()
  }

  var initCreditsAndDebts = function() {
    if(!$scope.cannonScene.cannons || !$scope.cannonScene.cannons.length) {
      $scope.cannonScene.cannons = []
      $scope.cannonScene.cannons.push({})
    }

    if(!$scope.cannonScene.cannons.params || !$scope.cannonScene.cannons.params.length) {
      $scope.cannonScene.cannons.params = []
      $scope.cannonScene.cannons.params.push({})
    }
  }

  $scope.getCannonScene()
}
