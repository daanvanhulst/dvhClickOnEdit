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
  $templateCache.put('dvhClickToEdit/dvhRichTextAreaEdit/dvhRichTextAreaEdit.html',
    '<div ng-show="!editMode" ng-bind-html="clickToEditConfig.model.value"></div><div ng-show="editMode" text-angular="" ng-model="clickToEditConfig.model.value"></div><a ng-show="!editMode" ng-click="editMode = true"><i class="fa fa-pencil fa-fw"></i> Edit</a> <a ng-show="editMode" ng-click="saveModel(clickToEditConfig.model)"><i class="fa fa-floppy-o"></i> Save</a> <a ng-show="editMode" ng-click="discardValue()"><i class="fa fa-trash-o"></i> Discard</a> <i ng-show="resolvingData" class="fa fa-cog fa-spin"></i><div class="form-group has-error" ng-show="errorMessage"><span class="help-block">{{errorMessage}}</span></div>');
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
    '<div ng-show="!editMode" ng-bind="clickToEditConfig.model.value"></div><textarea ng-show="editMode" ng-model="clickToEditConfig.model.value"></textarea> <a ng-show="!editMode" ng-click="editMode = true"><i class="fa fa-pencil fa-fw"></i> Edit</a> <a ng-show="editMode" ng-click="saveModel(clickToEditConfig.model)"><i class="fa fa-floppy-o"></i> Save</a> <a ng-show="editMode" ng-click="discardValue()"><i class="fa fa-trash-o"></i> Discard</a> <i ng-show="resolvingData" class="fa fa-cog fa-spin"></i><div class="form-group has-error" ng-show="errorMessage"><span class="help-block">{{errorMessage}}</span></div>');
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
    '<span ng-show="!editMode" ng-bind="clickToEditConfig.model.value"></span> <input ng-show="editMode" type="text" ng-model="clickToEditConfig.model.value"> <a ng-show="!editMode" ng-click="editMode = true"><i class="fa fa-pencil fa-fw"></i> Edit</a> <a ng-show="editMode" ng-click="saveModel(clickToEditConfig.model)"><i class="fa fa-floppy-o"></i> Save</a> <a ng-show="editMode" ng-click="discardValue()"><i class="fa fa-trash-o"></i> Discard</a> <i ng-show="resolvingData" class="fa fa-cog fa-spin"></i><div class="form-group has-error" ng-show="errorMessage"><span class="help-block">{{errorMessage}}</span></div>');
}]);
})();
