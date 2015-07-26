/// <reference path="../typings/tsd.d.ts" />
/**
 * @ngdoc overview
 * @name ClickToEdit
 */
var ClickToEdit;
(function (ClickToEdit) {
    var ClickToEditElement = (function () {
        // #endregion
        // #region Initialization and destruction
        function ClickToEditElement(editableDirectiveFactory, $compile) {
            var _this = this;
            this.scope = {
                clickToEditConfig: "=?",
                fieldType: "@?",
                model: "=?",
                onSave: "&?"
            };
            this._$compile = $compile;
            this._editableDirectiveFactory = editableDirectiveFactory;
            ClickToEditElement.prototype.link = {
                pre: function (scope, element, attrs) {
                    if (angular.isUndefined(scope.clickToEditConfig)) {
                        scope.clickToEditConfig = { model: { value: "" }, fieldType: "text", onSave: null };
                    }
                    if (angular.isDefined(scope.model) && angular.isDefined(scope.model.value)) {
                        scope.clickToEditConfig.model = scope.model;
                    }
                    if (angular.isDefined(scope.fieldType)) {
                        scope.clickToEditConfig.fieldType = scope.fieldType;
                    }
                    if (angular.isDefined(scope.onSave)) {
                        scope.clickToEditConfig.onSave = scope.onSave;
                    }
                    scope.originalValue = scope.clickToEditConfig.model.value;
                    scope.editMode = false;
                },
                post: function (scope, element, attrs) {
                    scope.saveModel = function (model) {
                        scope.errorMessage = "";
                        if (angular.isFunction(scope.clickToEditConfig.onSave)) {
                            var promise = scope.clickToEditConfig.onSave({ model: model });
                            if (!promise) {
                                scope.setUpdatedModel(model);
                                return;
                            }
                            scope.resolvingData = true;
                            promise.then(function () {
                                scope.setUpdatedModel(model);
                            }, function (error) {
                                if (error) {
                                    scope.errorMessage = error;
                                }
                                else {
                                    scope.errorMessage = "error in application when saving";
                                }
                            })
                                .finally(function () {
                                scope.resolvingData = false;
                            });
                        }
                    };
                    scope.discardValue = function () {
                        scope.errorMessage = "";
                        scope.clickToEditConfig.model.value = scope.originalValue;
                        scope.model.value = scope.originalValue;
                        scope.editMode = false;
                    };
                    // Create the editable element
                    var editableElement = editableDirectiveFactory.createEditableDirective(scope.clickToEditConfig.fieldType);
                    //Compile the editable element
                    var e = $compile(editableElement)(scope);
                    //Replace the current element with the editable element
                    element.replaceWith(e);
                    scope.setUpdatedModel = function (model) {
                        scope.originalValue = model.value;
                        scope.clickToEditConfig.model = model;
                        scope.model = model;
                        scope.editMode = false;
                    };
                    scope.$on("$destroy", _this.destruct);
                    _this._scope = scope;
                }
            };
        }
        ClickToEditElement.Factory = function () {
            var directive = function (editableDirectiveFactory, $compile) {
                return new ClickToEditElement(editableDirectiveFactory, $compile);
            };
            directive["$inject"] = ["editableDirectiveFactory", "$compile"];
            return directive;
        };
        ClickToEditElement.prototype.destruct = function () {
            this._$compile = null;
            this._editableDirectiveFactory = null;
            this._scope = null;
        };
        return ClickToEditElement;
    })();
    ClickToEdit.ClickToEditElement = ClickToEditElement;
    angular.module("dvhClickToEdit", [
        "dvhClickToEdit.editableDirectiveFactory",
        "dvhClickToEdit.dvhTextEdit",
        "dvhClickToEdit.dvhTextAreaEdit",
        "dvhClickToEdit.dvhRichTextAreaEdit"
    ])
        .directive("dvhClickToEdit", ClickToEditElement.Factory());
})(ClickToEdit || (ClickToEdit = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />
/**
 * @ngdoc overview
 * @name ClickToEdit
 */
var ClickToEdit;
(function (ClickToEdit) {
    var TextAreaEdit = (function () {
        // #endregion
        // #region Initialization and destruction
        function TextAreaEdit() {
            var _this = this;
            this.scope = false;
            this.templateUrl = "dvhClickToEdit/dvhTextAreaEdit/dvhTextAreaEdit.html";
            TextAreaEdit.prototype.link = function (scope, element, attrs) {
                scope.$on("$destroy", _this.destruct);
            };
        }
        TextAreaEdit.Factory = function () {
            var directive = function () {
                return new TextAreaEdit();
            };
            directive["$inject"] = [];
            return directive;
        };
        TextAreaEdit.prototype.destruct = function () {
            console.log("destroying");
        };
        return TextAreaEdit;
    })();
    ClickToEdit.TextAreaEdit = TextAreaEdit;
    angular.module("dvhClickToEdit.dvhTextAreaEdit", ["textAngular"])
        .directive("dvhTextAreaEdit", TextAreaEdit.Factory());
})(ClickToEdit || (ClickToEdit = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />
/**
 * @ngdoc overview
 * @name ClickToEdit
 */
var ClickToEdit;
(function (ClickToEdit) {
    var RichTextAreaEdit = (function () {
        // #endregion
        // #region Initialization and destruction
        function RichTextAreaEdit() {
            var _this = this;
            this.scope = false;
            this.templateUrl = "dvhClickToEdit/dvhRichTextAreaEdit/dvhRichTextAreaEdit.html";
            RichTextAreaEdit.prototype.link = function (scope, element, attrs) {
                scope.$on("$destroy", _this.destruct);
            };
        }
        RichTextAreaEdit.Factory = function () {
            var directive = function () {
                return new RichTextAreaEdit();
            };
            directive["$inject"] = [];
            return directive;
        };
        RichTextAreaEdit.prototype.destruct = function () {
            console.log("destroying");
        };
        return RichTextAreaEdit;
    })();
    ClickToEdit.RichTextAreaEdit = RichTextAreaEdit;
    angular.module("dvhClickToEdit.dvhRichTextAreaEdit", ["textAngular"])
        .directive("dvhRichTextAreaEdit", RichTextAreaEdit.Factory());
})(ClickToEdit || (ClickToEdit = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />
/**
 * @ngdoc overview
 * @name ClickToEdit
 */
var ClickToEdit;
(function (ClickToEdit) {
    var TextEdit = (function () {
        // #endregion
        // #region Initialization and destruction
        function TextEdit() {
            var _this = this;
            this.templateUrl = "dvhClickToEdit/dvhTextEdit/dvhTextEdit.html";
            TextEdit.prototype.link = function (scope, element, attrs) {
                scope.$on("$destroy", _this.destruct);
            };
        }
        TextEdit.Factory = function () {
            var directive = function () {
                return new TextEdit();
            };
            directive["$inject"] = [];
            return directive;
        };
        TextEdit.prototype.destruct = function () {
            console.log("destroying");
        };
        return TextEdit;
    })();
    ClickToEdit.TextEdit = TextEdit;
    angular.module("dvhClickToEdit.dvhTextEdit", [])
        .directive("dvhTextEdit", TextEdit.Factory());
})(ClickToEdit || (ClickToEdit = {}));

/// <reference path="../../typings/tsd.d.ts" />
var ClickToEditFactories;
(function (ClickToEditFactories) {
    var EditableDirectiveFactory = (function () {
        function EditableDirectiveFactory() {
        }
        EditableDirectiveFactory.prototype.createEditableDirective = function (type) {
            var element = "";
            switch (type) {
                case "textArea":
                    element = "<span dvh-text-area-edit></span>";
                    break;
                case "richTextArea":
                    element = "<span dvh-rich-text-area-edit></span>";
                    break;
                case "text":
                default:
                    element = "<span dvh-text-edit></span>";
                    break;
            }
            return element;
        };
        return EditableDirectiveFactory;
    })();
    angular.module("dvhClickToEdit.editableDirectiveFactory", []).factory("editableDirectiveFactory", function () {
        return new EditableDirectiveFactory();
    });
})(ClickToEditFactories || (ClickToEditFactories = {}));
