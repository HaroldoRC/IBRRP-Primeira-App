angular.module('primeiraApp').controller('JoystickCtrl', [
    '$http',
    '$timeout',
    'consts',
    'msgs',
    JoystickController
  ])
  
  function JoystickController($http, $timeout, consts, msgs) {
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
        vm.cannonScenes.forEach(function(scene) {
          console.log(scene.name)
          scene.cannons.forEach(function(cannon) {
            console.log(cannon.name)
            cannon.params.forEach(function(param) {
              if(param.channel === 1 || param.channel === 3 || param.channel === 8 )console.log(param.value)
            }, this);
          }, this);
        }, this);
      })
    }
  
    document.addEventListener('keydown', (event) => {
      console.log(event.key)
      if(event.key === "w"){//2
        let valor = 0
        console.log(vm.cannonScenes)
        vm.cannonScenes.forEach(function(scene, index) {
          console.log(index)
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              console.log(index)
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 2){
                    valor = param.value
                    console.log(valor)
                    valor = param.value + 1
                    console.log(valor)
                    param.value = valor
                    let req = {
                      method: 'POST',
                      url: `http://192.168.15.177/`,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      data: `${param.channel}c${param.value}w`
                    }
                    $http(req).then((respose) => {
                      valor = 0
                    }).catch((resp)=>{
                    })
                  }
      
                },this)
              }
              
            }, this)
          }
          
        }, this)
      
      }
      
      if(event.key === "s"){ //2
      let valor = 0
      console.log(vm.cannonScenes)
      vm.cannonScenes.forEach(function(scene, index) {
        console.log(index)
        if(index === 2){
          scene.cannons.forEach(function(cannon, index) {
            console.log(index)
            if(index === 0){
              cannon.params.forEach(function(param, index){
                if (index === 2){
                  valor = param.value
                  console.log(valor)
                  valor = param.value - 1
                  console.log(valor)
                  param.value = valor
                  let req = {
                    method: 'POST',
                    url: `http://192.168.15.177/`,
                    headers: {
                      'Content-Type': 'text/plain'
                    },
                    data: `${param.channel}c${param.value}w`
                  }
                  $http(req).then((respose) => {
                    valor = 0
                  }).catch((resp)=>{
                  })
                }
    
              },this)
            }
            
          }, this)
        }
        
      }, this)
    
      }
      if(event.key === "a"){//0
        let valor = 0
        console.log(vm.cannonScenes)
        vm.cannonScenes.forEach(function(scene, index) {
          console.log(index)
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              console.log(index)
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 0){
                    valor = param.value
                    console.log(valor)
                    valor = param.value - 1
                    console.log(valor)
                    param.value = valor
                    let req = {
                      method: 'POST',
                      url: `http://192.168.15.177/`,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      data: `${param.channel}c${param.value}w`
                    }
                    $http(req).then((respose) => {
                      valor = 0
                    }).catch((resp)=>{
                    })
                  }
      
                },this)
              }
              
            }, this)
          }
          
        }, this)
      
      }
      if(event.key === "d"){//0
        let valor = 0
        console.log(vm.cannonScenes)
        vm.cannonScenes.forEach(function(scene, index) {
          console.log(index)
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              console.log(index)
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 0){
                    valor = param.value
                    console.log(valor)
                    valor = param.value + 1
                    console.log(valor)
                    param.value = valor
                    let req = {
                      method: 'POST',
                      url: `http://192.168.15.177/`,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      data: `${param.channel}c${param.value}w`
                    }
                    $http(req).then((respose) => {
                      valor = 0
                    }).catch((resp)=>{
                    })
                  }
      
                },this)
              }
              
            }, this)
          }
          
        }, this)
      
      }
      if(event.key === "q"){//7
        let valor = 0
        console.log(vm.cannonScenes)
        vm.cannonScenes.forEach(function(scene, index) {
          console.log(index)
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              console.log(index)
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 7){
                    valor = param.value
                    valor = 255
                    param.value = valor
                    let req = {
                      method: 'POST',
                      url: `http://192.168.15.177/`,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      data: `${param.channel}c${param.value}w`
                    }
                    $http(req).then((respose) => {
                      valor = 0
                    }).catch((resp)=>{
                    })
                  }
      
                },this)
              }
              
            }, this)
          }
          
        }, this)
      
      }
      if(event.key === "e"){//7
        let valor = 0
        console.log(vm.cannonScenes)
        vm.cannonScenes.forEach(function(scene, index) {
          console.log(index)
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              console.log(index)
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 7){
                    valor = param.value
                    valor = 0
                    param.value = valor
                    let req = {
                      method: 'POST',
                      url: `http://192.168.15.177/`,
                      headers: {
                        'Content-Type': 'text/plain'
                      },
                      data: `${param.channel}c${param.value}w`
                    }
                    $http(req).then((respose) => {
                      valor = 0
                    }).catch((resp)=>{
                    })
                  }
      
                },this)
              }
              
            }, this)
          }
          
        }, this)
      
      }
      if(event.key === "p"){//7
        vm.porta()
      }
    })  
    
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
  
    vm.initController = () =>{
      vm.refresh() 
    }
    vm.initController()

    vm.porta = () => {
      let string = '1c43w2c0w3c87w4c0w5c0w6c0w7c0w8c255w9c0w10c0w'
      let req = {
        method: 'POST',
        url: `http://192.168.15.177/`,
        headers: {
          'Content-Type': 'text/plain'
        },
        data: string
       }
      $http(req).then((respose) => {
        vm.cannonScenes.forEach(function(scene, index) {
          if(index === 2){
            scene.cannons.forEach(function(cannon, index) {
              if(index === 0){
                cannon.params.forEach(function(param, index){
                  if (index === 0){
                    param.value = 43
                  }
                  if (index === 2){
                    param.value = 87
                  }
                  if (index === 7){
                    param.value = 255
                  }
                },this)
              }
            }, this)
          }
        }, this)
      }).catch((resp)=>{
      })
    }
    
  }
  