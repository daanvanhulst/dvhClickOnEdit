    var app = angular.module("sampleApp", ["dvhClickToEdit-tpl", "dvhClickToEdit"]);
    app.controller("SampleCtrl", function($scope, $timeout, $q) {
        $scope.text = "blablablabla";
        $scope.textConfig = {
            fieldType:"text",
            value: $scope.text,
            onSave: function(value) {
                alert("value got saved: " + value)
            }
        };

        $scope.textAreaConfig = {
            fieldType:"textArea",
            value: $scope.text,
            onSave: function(value) {
                alert('got the value' + value);
            }
        };

        $scope.saveTextField = function(value) {
            var deferred = $q.defer();
            console.log("in onSave");
            $timeout(function() {
                deferred.resolve();
            }, 4000);

            return deferred.promise;
        };

        $scope.saveRichTestAreaField = function(value) {
            var deferred = $q.defer();
            console.log("in onSave");
            $timeout(function() {
                deferred.resolve();
            }, 4000);

            return deferred.promise;
        };
    });