var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('MyAppController', function() {
    console.log('MyApp and App Controller is loaded.');
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

    vm.submitMessage = (contact) => {
        console.log('Submit button clicked: ', contact);
    }
});