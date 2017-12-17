myApp.service('MyAppService', ['$http', function ($http) {
    // console.log('MyApp Service loaded.');
    const vm = this;

    vm.submitMessage = (contact) => {
        $http.post('/contact', contact).then(function (response) {
            console.log('Message sent');
        });
    }

}]);