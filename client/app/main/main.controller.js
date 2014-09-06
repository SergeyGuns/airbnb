'use strict';

angular.module('jobInterviewApp')
    .controller('MainCtrl', function($scope, $http, $filter) {
        $scope.rooms = [];
        $scope.filter = $filter;

        $scope.callServer = function getData(tableState) {

            var sortBy = tableState.sort.predicate;
            var http = $http({
                method: 'post',
                url: 'api/roomLists'
            });

            http.success(function(data) {
                data.rooms.sort(function(a, b) {
                    if (a[sortBy] < b[sortBy]) {
                        return -1;
                    }
                    if (a[sortBy] > b[sortBy]) {
                        return 1;
                    }
                    return 0;
                });
                $scope.rooms = data.rooms;
                console.log(data.rooms);
            });
        };

        var http = $http({
            method: 'post',
            url: 'api/roomLists'

        });
        http.success(function(data) {
            $scope.rooms = data.rooms;
        });



    });