    var app = angular.module("sampleApp", ["dvhClickToEdit-tpl", "dvhClickToEdit"]);
    app.controller("SampleCtrl", function($scope) {
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
                alert("value got saved: " + value)
            }
        };

        $scope.saveTextField = function(value) {
            console.log("in the callback in controller with value: " + value);
        }
    });