angular.module('primeiraApp').controller('DashboardCtrl', [
  '$http',
  '$timeout',
  'consts',
  DashboardController
])

function DashboardController($http, $timeout, consts) {
  const vm = this
  const url = `${consts.apiUrl}/cannonScenes`
  vm.cannonScenes = {}
  vm.cannonScene = {}
  vm.refresh = () => {
    $http.get(url).then((response) => {
      vm.cannonScenes = response.data
      vm.cannonScene = { }
      vm.cannonScene.cannons = []
      vm.cannonScene.cannons.push({params: [{name: '',channel:'',value:''}]}) 
      console.log(vm.cannonScenes[0].name)
      console.log(vm.cannonScenes[0].cannons[0].name)
        
      console.log(vm.cannonScene.cannons)
      console.log('vm.cannonScenes.cannons.params ' + vm.cannonScene.cannons[0].params)
    })
  }

  function slider() {
    console.log('asdasdasdasdasdasdasdasdasdasdasdasdadasd' + vm.cannonScenes)
    
    vm.cannonScenes.forEach(function(scene) {
      scene.cannons.forEach(function(cannon){
        cannon.params.forEach(function(param){
          let id = param._id
          $( `#${id}` ).slider({
            range: false,
            min: 0,
            max: 255,
            values: param.value,
            step: 5,
            //change: function( event, ui ) {},
            slide: function( event, ui ) {
              param.value = ui.value
              $( ".amount" ).val( ui.value )
            },
            
          })
          
        }, this)
      }, this)
    }, this)
  }

  vm.enviarCena = (cannonScene) =>{
    console.log('enviando')
    let string = ''

    cannonScene.cannons.forEach(function(element) {
      element.params.forEach(function(param){
        string += 'C'+param.channel
        string += 'W'+param.value
      },this)
    }, this)
    console.log(string)
  }

  vm.initController = () =>{
    vm.refresh() 
    setTimeout(slider, 1000)
  }
  vm.initController()
  
}
