angular.module('primeiraApp').controller('DashboardCtrl', [
  '$http',
  '$timeout',
  'consts',
  'msgs',
  DashboardController
])

function DashboardController($http, $timeout, consts, msgs) {
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
    })
  }

  function slider() {
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
            slide: function( event, ui ) {
              param.value = ui.value
              $( `#amount${id}` ).val( ui.value )
            },
          })
          $( `#amount${id}` ).val( param.value )
          
        }, this)
      }, this)
    }, this)
  }

  vm.enviarCena = (cannonScene) =>{
    let string = ''

    cannonScene.cannons.forEach(function(cannon) {
      cannon.params.forEach(function(param){
        string += param.channel+'c'
        string += param.value+'w'
      },this)
      let urlEnviar = `http://${cannon.ip}`
    }, this)

    console.log(`$http.post(${urlEnviar}, ${string})`)
    console.log(string)
    msgs.addSuccess('Cena enviada com sucesso!')
  }

  vm.salvarCena = (cannonScene) => {
    const urlUpdate = `http://localhost:3003/api/cannonScenes/${cannonScene._id}`
    $http.put(urlUpdate, cannonScene).then((response) => {
      msgs.addSuccess('Cena salva com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  vm.initController = () =>{
    vm.refresh() 
    setTimeout(slider, 1000)
  }
  vm.initController()
  
}
