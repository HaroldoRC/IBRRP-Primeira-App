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
                vm.cannonScene = { cannons: [{ params: [{}] }] }
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }
        vm.refresh()

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

    }
})()