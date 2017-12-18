myApp.service('MyAppService', ['$http', '$mdDialog', function ($http, $mdDialog) {
    // console.log('MyApp Service loaded.');
    const vm = this;

    //function that handles http request and spits out an angular-material alert depending on the outcome
    vm.submitMessage = (contact) => {
        $http.post('/contact', contact).then(function (response) {
            // console.log('Message sent', response.data.responseDesc);
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .textContent(response.data.responseDesc)
                    .ariaLabel('Alert Dialog')
                    .ok('Close')
            );
        });
    }

}]);