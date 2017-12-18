var myApp = angular.module('myApp', ['ngMaterial', 'vcRecaptcha']);

myApp.controller('MyAppController', ['vcRecaptchaService', 'MyAppService', '$mdDialog', function (vcRecaptchaService, MyAppService, $mdDialog) {
    // console.log('MyApp and App Controller is loaded.');
    const vm = this;
    vm.publicKey = "6LeyYD0UAAAAALw9umWm8rCg6sUIpzyFA93HAm2L";

    vm.contact = {};

    vm.senatorList = [
        "Senator A",
        "Senator B",
        "Senator C",
        "Senator D",
        "Senator E"
    ];

    vm.districtList = [
        "District 1",
        "District 2",
        "District 3",
        "District 4",
        "District 5"
    ];

    //Handles selecting a senator or district
    vm.listSelect = (select) => {
        // console.log('List selected as: ', select);
        if (select === 'Senator') {
            vm.contact.district = undefined;
        } else if (select === 'District') {
            vm.contact.senator = undefined;
        }
    }

    //Handles app submission
    vm.submitMessage = (contact) => {
        // console.log('Submit button clicked: ', contact);
        // checking if captcha was clicked
        if (vcRecaptchaService.getResponse() === "") {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .textContent('Please resolve Captcha')
                    .ariaLabel('Alert Dialog')
                    .ok('Got it!')
            );
        } else {
            let contactToSend = {
                'name': contact.name,
                'email': contact.email,
                'phoneNumber': contact.password,
                'address': contact.address,
                'message': contact.message,
                'g-recaptcha-response': vcRecaptchaService.getResponse()  //send g-captcha-reponse to our server
            }
            // console.log('Contact', contactToSend);

            MyAppService.submitMessage(contactToSend);
        }
    }
}]);