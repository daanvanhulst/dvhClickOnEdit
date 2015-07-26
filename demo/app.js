    var app = angular.module("sampleApp", ["dvhClickToEdit-tpl", "dvhClickToEdit"]);
    app.controller("SampleCtrl", function($scope, $timeout, $q) {
        $scope.textModel = {id: 0, value: "blablablabla"};
        $scope.richTextModel = {id: 0, value: "blablablabla"};

        $scope.textConfig = {
            fieldType:"text",
            model: { id: 1, value: "testski"},
            onSave: function(value) {
                alert("value got saved: " + value)
            }
        };

        $scope.textAreaConfig = {
            fieldType:"textArea",
            model: { id: 0, value: "testski" },
            onSave: function(value) {
                alert('got the value' + value);
            }
        };

        $scope.saveTextField = function(model) {
            console.log(model);
            var deferred = $q.defer();
            console.log("in onSave");
            $timeout(function() {
                deferred.resolve();
            }, 4000);

            return deferred.promise;
        };

        $scope.saveRichTestAreaField = function(model) {
            console.log(model);
            var deferred = $q.defer();
            console.log("in onSave");
            $timeout(function() {
                deferred.resolve();
            }, 4000);

            return deferred.promise;
        };
    });