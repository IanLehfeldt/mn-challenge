var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('MyAppController', ['MyAppService', function(MyAppService) {
    // console.log('MyApp and App Controller is loaded.');
    const vm = this;

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
        console.log('List selected as: ', select);
        if(select === 'Senator') {
            vm.contact.district = undefined;
        } else if(select === 'District'){
            vm.contact.senator = undefined;
        }
    }

    //Handles app submission
    vm.submitMessage = (contact) => {
        console.log('Submit button clicked: ', contact);
    }
}]);