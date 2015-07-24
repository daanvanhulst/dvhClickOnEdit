/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    interface IClickToEditConfig {
        fieldType: string;
        value: string;
        onSave: ( value ) => ng.IPromise<void>;
    }

    export interface IClickToEditScope extends ng.IScope {
        clickToEditConfig: IClickToEditConfig;
        value;
        fieldType: string;
        onSave: ( value ) => ng.IPromise<void>;
        setUpdatedValue(value: string);

		editMode: boolean;
        resolvingData: boolean;
        errorMessage: string;
        originalValue: string;
        saveValue: ( value ) => void;
        discardValue: () => void;
    }

    export class ClickToEditElement {
        // #region Angular directive properties, fields, and methods
        public link: {
            pre: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => void;
            post: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => void;
        };
        public scope = {
            clickToEditConfig: "=?",
            fieldType: "@",
            value: "@",
            onSave: "&"
        };
        // #endregion

        // #region Initialization and destruction
        constructor(editableDirectiveFactory, $compile) {

            this._$compile = $compile;
            this._editableDirectiveFactory = editableDirectiveFactory;

            ClickToEditElement.prototype.link = {
                pre: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {

                    if (angular.isUndefined(scope.clickToEditConfig)) {
                        scope.clickToEditConfig = { value: "", fieldType: "text", onSave: null };
                    }

                    if ( angular.isDefined(scope.value) )     { scope.clickToEditConfig.value = scope.value; }
                    if ( angular.isDefined(scope.fieldType) ) { scope.clickToEditConfig.fieldType = scope.fieldType; }
                    if ( angular.isDefined(scope.onSave) )    {  scope.clickToEditConfig.onSave = scope.onSave; }

                    scope.originalValue = scope.clickToEditConfig.value;

                    scope.editMode = false;
                },
                post: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {
                    scope.saveValue = function(value) {
                        scope.errorMessage = "";
                        if (angular.isFunction(scope.clickToEditConfig.onSave)) {

                            var promise = scope.clickToEditConfig.onSave(value);

                            if (!promise) {
                                scope.setUpdatedValue(scope.clickToEditConfig.value);
                                return;
                            }

                            scope.resolvingData = true;
                            promise.then(
                                function() {
                                    scope.setUpdatedValue(scope.clickToEditConfig.value);
                                },
                                function(error) {
                                    if (error) {
                                        scope.errorMessage = error;
                                    } else {
                                        scope.errorMessage = "error in application when saving";
                                    }
                                })
                                .finally(function(){
                                    scope.resolvingData = false;
                                });
                        }
                    };

                    scope.discardValue = function() {
                        scope.errorMessage = "";
                        scope.clickToEditConfig.value = scope.originalValue;
                        scope.value = scope.originalValue;
                        scope.editMode = false;
                    };

                    // Create the editable element
                    var editableElement = editableDirectiveFactory.createEditableDirective(scope.clickToEditConfig.fieldType);

                    //Compile the editable element
                    var e = $compile(editableElement)(scope);

                    //Replace the current element with the editable element
                    element.replaceWith(e);

                    scope.setUpdatedValue = function(value) {
                        scope.originalValue = value;
                        scope.clickToEditConfig.value = value;
                        scope.value = value;
                        scope.editMode = false;
                    };

                    scope.$on("$destroy", this.destruct);

                    this._scope = scope;
                }
            };
        }

        public static Factory() {
            var directive = (editableDirectiveFactory, $compile) => {
                return new ClickToEditElement(editableDirectiveFactory, $compile);
            };

            directive["$inject"] = ["editableDirectiveFactory", "$compile"];

            return directive;
        }

        private destruct() {
            this._$compile                    = null;
            this._editableDirectiveFactory    = null;
            this._scope                       = null;
        }
        // #endregion

        // #region Private class properties, fields, and methods
        private _editableDirectiveFactory    : any;
        private _$compile                    : ng.ICompileService;
        private _scope                       : IClickToEditScope;
        // #endregion
    }

    angular.module("dvhClickToEdit", [
        "dvhClickToEdit.editableDirectiveFactory",
        "dvhClickToEdit.dvhTextEdit",
        "dvhClickToEdit.dvhTextAreaEdit",
        "dvhClickToEdit.dvhRichTextAreaEdit"
    ])
    .directive("dvhClickToEdit", ClickToEditElement.Factory());
}
