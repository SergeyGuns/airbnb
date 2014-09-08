'use strict';

angular.module('jobInterviewApp')
    .controller('MainCtrl', function($scope, $http, $filter, $timeout, ngTableParams) {
        $scope.rooms = [];

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                name: 'asc' // initial sorting
            }
        }, {
            total: 0, // length of data
            getData: function($defer, params) {

                var dta = params.url();
                dta.sorting = params.sorting();
                // ajax request to api
                var http = $http({
                    method: 'post',
                    url: '/api/roomLists',
                    data: dta
                });

                http.success(function(data) {
                    $timeout(function() {

                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.rooms);



                    }, 500);
                });
            }
        });

        $scope.showDates = function(room) {
            $scope.selectedRooom = room;
        };

        $scope.isAvilable = function(selectedRooom) {
            if (!selectedRooom) {
                return '';
            }
            var str = 'The room is not available.';
            for (var d in selectedRooom.availablty) {
                if (selectedRooom.availablty[d] !== 'not') {
                    str = 'Available in the following dates of this monht: ';
                    break;
                }
            }
            return str;
        };

        $scope.availabltyFilter = function(items) {
            var result = {};
            if (!items) {
                return result;
            }
            angular.forEach(items, function(value, key) {
                if (value !== 'not') {
                    // console.log('value:' + value + ' key: ' + key);
                    result[key] = value;
                }
            });
            return result;
        };


        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 14,
            control: {}
        };
        $scope.options = {
            scrollwheel: true
        };




        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: {
                visible: false,
                draggable: false
            },
            control: {}
        };


        $scope.handelClick = function(room) {
            $scope.showDates(room);
            // console.log(room);
            $scope.map.control.refresh({
                latitude: room.lat,
                longitude: room.lng
            });

            $scope.marker.options.visible = true;

            $scope.marker.coords = {
                latitude: room.lat,
                longitude: room.lng
            };

            var dta = {
                date: new Date(),
                name: room.name
            };
            // var http =
             $http({
                method: 'post',
                url: '/api/saveClicks',
                data: dta
            });



        };

    });