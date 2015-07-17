(function(module) {
try {
  module = angular.module('dvhClickToEdit-tpl');
} catch (e) {
  module = angular.module('dvhClickToEdit-tpl', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dvhClickToEdit/dvhClickToEdit.html',
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dvhClickToEdit-tpl');
} catch (e) {
  module = angular.module('dvhClickToEdit-tpl', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dvhClickToEdit/dvhTextAreaEdit/dvhTextAreaEdit.html',
    '<div ng-show="!editMode" ng-bind-html="isoConfig.value"></div><a ng-show="!editMode" ng-click="editMode = true"><i class="fa fa-pencil fa-fw"></i> Edit</a> <a ng-show="editMode" ng-click="saveValue(isoConfig.value)"><i class="fa fa-floppy-o"></i> Save</a><div ng-show="editMode" text-angular="" ng-model="isoConfig.value"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvhClickToEdit-tpl');
} catch (e) {
  module = angular.module('dvhClickToEdit-tpl', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dvhClickToEdit/dvhTextEdit/dvhTextEdit.html',
    '<span ng-show="!editMode" ng-bind="isoConfig.value"></span> <a ng-show="!editMode" ng-click="editMode = true"><i class="fa fa-pencil fa-fw"></i> Edit</a> <a ng-show="editMode" ng-click="saveValue(isoConfig.value)"><i class="fa fa-floppy-o"></i> Save</a> <input ng-show="editMode" type="text" ng-model="isoConfig.value">');
}]);
})();
