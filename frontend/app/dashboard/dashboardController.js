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
      vm.paramsList = []
      vm.cannonScenes.forEach(function(scene) {
        scene.cannons.forEach(function(cannon) {
          cannon.params.forEach(function(param) {
            if(param.channel === 1 || param.channel === 3 || param.channel === 8 ){
              console.log(param.value)
              vm.paramsList.push(param)
            }
          }, this);
        }, this);
      }, this);
    })
  }

  function slider() {
    let urlEnviar = ''
    vm.cannonScenes.forEach(function(scene) {
      scene.cannons.forEach(function(cannon){
        urlEnviar = `http://${cannon.ip}/`
        cannon.params.forEach(function(param){
          let id = param._id
          $( `#${id}` ).slider({
            range: false,
            min: 0,
            max: 255,
            values: [param.value],
            step: 1,
            slide: function( event, ui ) {
              console.log('slider mudando')
              let req = {
                method: 'POST',
                url: urlEnviar,
                headers: {
                  'Content-Type': 'text/plain'
                },
                data: `${param.channel}c${param.value}w`
               }
              $http(req).then((respose) => {
              }).catch((resp)=>{
              })
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
    let urlEnviar = ''
    cannonScene.cannons.forEach(function(cannon) {
      string = ''
      cannon.params.forEach(function(param){
        string += param.channel+'c'
        string += param.value+'w'
      },this)
      urlEnviar = `http://${cannon.ip}/`
      let req = {
        method: 'POST',
        url: urlEnviar,
        headers: {
          'Content-Type': 'text/plain'
        },
        data: string
       }
       console.log(string)
      $http(req).then((respose) => {
      }).catch((resp)=>{
      })
    }, this)

    

    //console.log(`$http.post(${urlEnviar}, ${string})`)
  }

  vm.salvarCena = (cannonScene) => {
    const urlUpdate = `http://localhost:3003/api/cannonScenes/${cannonScene._id}`
    $http.put(urlUpdate, cannonScene).then((response) => {
      msgs.addSuccess('Cena salva com sucesso!')
    }).catch(function(resp) {
      msgs.addError(resp.data.errors)
    })
  }

  vm.luz = () => {
    let req = {
      method: 'POST',
      url: `http://192.168.15.177/`,
      headers: {
        'Content-Type': 'text/plain'
      },
      data: '8c255w'
     }
    $http(req).then((respose) => {
      
    }).catch((resp)=>{
    })
  }
  
  vm.initController = () =>{
    vm.refresh() 
    setTimeout(slider, 1000)
    console.log('asdasd')
    setTimeout(vm.keyCode, 1000)
  }
  vm.initController()
  
}
