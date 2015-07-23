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
                fieldType: "@",
                value: "@",
                onSave: "&"
            };
            ClickToEditElement.prototype.link = {
                pre: function (scope, element, attrs, ctrl) {
                    if (angular.isDefined(scope.clickToEditConfig)) {
                        scope.isoConfig = scope.clickToEditConfig;
                    }
                    else {
                        scope.isoConfig = { value: "", fieldType: "text", onSave: null };
                    }
                    if (angular.isDefined(scope.value)) {
                        scope.isoConfig.value = scope.value;
                    }
                    if (angular.isDefined(scope.fieldType)) {
                        scope.isoConfig.fieldType = scope.fieldType;
                    }
                    if (angular.isDefined(scope.onSave)) {
                        scope.isoConfig.onSave = scope.onSave;
                    }
                    scope.clickToEditConfig = scope.isoConfig;
                    scope.editMode = false;
                },
                post: function (scope, element, attrs, ctrl) {
                    scope.saveValue = function (value) {
                        if (angular.isFunction(scope.isoConfig.onSave)) {
                            var promise = scope.isoConfig.onSave(value);
                            if (!promise) {
                                scope.setUpdatedValue(scope.isoConfig.value);
                                return;
                            }
                            promise.then(function () {
                                scope.setUpdatedValue(scope.isoConfig.value);
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    };
                    // Create the editable element
                    var editableElement = editableDirectiveFactory.createEditableDirective(scope.isoConfig.fieldType);
                    //Compile the editable element
                    var e = $compile(editableElement)(scope);
                    //Replace the current element with the editable element
                    element.replaceWith(e);
                    scope.setUpdatedValue = function (value) {
                        scope.clickToEditConfig.value = value;
                        scope.editMode = false;
                    };
                    scope.$on("$destroy", _this.destruct);
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
            console.log("destroying");
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
