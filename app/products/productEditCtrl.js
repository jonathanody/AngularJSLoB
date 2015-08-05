(function () {
    "use strict";
    
    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
                   ["product", "$state", ProductEditCtrl]);
    
    function ProductEditCtrl(product, $state) {
        var vm = this;
        
        vm.product = product;
        
        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }
        
        vm.openAvailabilityDatepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            
            vm.availabilityDatepickerOpen = !vm.availabilityDatepickerOpen;
        };
        
        vm.submit = function () {
            vm.product.$save(function (data) {
                toastr.success("Save successful: " + data.productName);
            });
        };
        
        vm.cancel = function () {
            $state.go("productList");
        };
        
        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        };
        
        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx, 1);
        };
    }
}());