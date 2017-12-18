myApp.service('MyAppService', ['$http', '$mdDialog', function ($http, $mdDialog) {
    // console.log('MyApp Service loaded.');
    const vm = this;

    vm.submitMessage = (contact) => {

        $http.post('/contact', contact).then(function (response) {
            // console.log('Message sent', response.data.responseDesc);
            if (response.data.responseDesc !== "success") {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent(response.data.responseDesc)
                        .ariaLabel('Alert Dialog')
                        .ok('Got it!')
                );
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .textContent(response.data.responseDesc)
                        .ariaLabel('Alert Dialog')
                        .ok('Close')
                );
            }
        });
    }

}]);