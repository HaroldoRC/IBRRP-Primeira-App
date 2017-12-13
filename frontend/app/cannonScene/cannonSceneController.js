(function(){
    angular.module('primeiraApp').controller('CannonSceneCtrl',[
        '$http',
        'consts',
        'msgs',
        'tabs',
        CannonSceneController
    ])

    function CannonSceneController ($http, consts, msgs, tabs) {
        const vm = this
        const url = `${consts.apiUrl}/cannonScenes`
        
        console.log('controller')
        vm.create = function() {
            console.log('create!')
            $http.post(url, vm.cannonScene).then(function(response){
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                msgs.addError(response.data.errors)
            })
        }
        
        vm.delete = () => {
            const deleteUrl = `${url}/${vm.cannonScene._id}`
            $http.delete(deleteUrl, vm.cannonScene).then((response) => {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch((response)=>{
                msgs.addError(response.data.errors)
            })
        }

        vm.update = () => {
            const updateUrl = `${url}/${vm.cannonScene._id}`
            $http.put(updateUrl, vm.cannonScene).then((response) => {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch((response)=>{
                msgs.addError(response.data.errors)
            })
        }

        vm.refresh = () => {
            $http.get(url).then((response) => {
                vm.cannonScenes = response.data
                vm.cannonScene = { }
                vm.cannonScene.cannons = []
                vm.cannonScene.cannons.push({params: [{name: '',channel:'',value:''}]}) 
                console.log(vm.cannonScene)
                console.log(vm.cannonScene.cannons)
                console.log('vm.cannonScenes.cannons.params ' + vm.cannonScene.cannons[0].params)
                
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }
        
        vm.showTabUpdate = (cannonScene)=> {
            console.log('showTabUpdate')
            vm.cannonScene = cannonScene
            tabs.show(vm, {tabUpdate: true})
        }
        vm.showTabDelete = (cannonScene) => {
            console.log('showTabDelete')
            vm.cannonScene = cannonScene
            tabs.show(vm, {tabDelete: true})
        }

        vm.addCannon = function(index) {
            vm.cannonScene.cannons.splice(index + 1, 0, {params: [{}] })
        }
        vm.cloneCannon = function(index, {name, ip}) {
            vm.cannonScene.cannons.splice(index + 1, 0, {name, ip, params:[{}]})
        }
        vm.deleteCannon = function(index) {
            if(vm.cannonScene.cannons.length > 1){
                vm.cannonScene.cannons.splice(index, 1)
            }
            
        }
        vm.addParam = function(index, {name, channel, value}) {
            channel = channel +1
            vm.cannonScene.cannons[index].params.splice(index + 1, 0, {channel})
        }
        vm.cloneParam = function(index, {name, channel, value}) {
            channel = channel +1
            vm.cannonScene.cannons[index].params.splice(index + 1, 0, {name, channel, value})
        }
        vm.deleteParam = function(index) {
            if(vm.cannonScene.cannons[index].params.length >1){
                vm.cannonScene.cannons[index].params.splice(index, 1)
            }
        }
        
        vm.refresh()
          
    }
})()