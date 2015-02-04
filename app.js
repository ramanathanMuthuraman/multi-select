'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);
app.factory("category", function() {
    return {
        types: ["Accordion", "Table", "Tree", "Calendar", "Slider", "Splitter"]
    };
});
app.directive("list", ['category', function(category) {

    return {
        restrict: 'E',
        /* restrict this directive to elements */
        scope: {
            multiple: "@",
            filter: "@"
        },
        template: '<input type="text" ng-model="stringofitems" class="input-text" />' + '<ul class="dropdown">' +
            '<li ng-show={{(filter=="true")}}><input type="text" class="search-text" ng-model="query" /></li>' +
            '<li ng-repeat="item in types|filter:query"><label for={{item}} class="item-type">' +
            '<input id={{item}} ng-attr-type={{(multiple=="true")?"checkbox":"radio"}} ng-model="confirmed"' +
            ' name="controls" ng-checked="ischecked(item)"  ng-change="selectionToggle(confirmed,item)" />' +
            '{{item}}</label></li></ul>',
        controller: function($scope) {
            $scope.confirmed = false;
            $scope.types = category.types;
            $scope.items = [];
            $scope.ischecked = function(item) {

                return $scope.items.indexOf(item) > -1;
            };
            $scope.selectionToggle = function(confirmed, item) {
                if (confirmed) {
                    $scope.items.push(item);
                } else {
                    var index = $scope.items.indexOf(item);
                    if (index > -1) {
                        $scope.items.splice(index, 1);
                    }
                    //radio button logic
                    else {
                        $scope.items = [];
                        $scope.items.push(item);
                    }
                }
                $scope.stringofitems = $scope.items.toString();
            };
        }
    };
}]);