angular.module('primeiraApp').constant('consts', {
  appName: 'IBRRP - Primeira Aplicação',
  version: '1.0',
  owner: 'IBRRP',
  year: '2017',
  site: 'https://www.ibrrp.com.br',
  //apiUrl: 'http://billingcycle.jelasticlw.com.br/api',
  apiUrl: 'http://localhost:3003/api',
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
