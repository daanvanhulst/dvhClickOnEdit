/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    interface IClickToEditOnSaveParam {
        model: IClickToEditModel;
    }

    interface IClickToEditModel {
        value: string;
    }

    interface IClickToEditConfig {
        fieldType: string;
        model: IClickToEditModel;
        onSave: ( modelParam: IClickToEditOnSaveParam ) => ng.IPromise<void>;
    }

    export interface IClickToEditScope extends ng.IScope {
        clickToEditConfig: IClickToEditConfig;
        model: IClickToEditModel;
        fieldType: string;
        onSave: (  modelParam: IClickToEditOnSaveParam ) => ng.IPromise<void>;
        setUpdatedModel(model: IClickToEditModel);

		editMode: boolean;
        resolvingData: boolean;
        errorMessage: string;
        originalValue: string;
        saveModel: (  model: IClickToEditModel ) => void;
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
            fieldType: "@?",
            model: "=?",
            onSave: "&?"
        };
        // #endregion

        // #region Initialization and destruction
        constructor(editableDirectiveFactory, $compile) {

            this._$compile = $compile;
            this._editableDirectiveFactory = editableDirectiveFactory;

            ClickToEditElement.prototype.link = {
                pre: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {

                    if (angular.isUndefined(scope.clickToEditConfig)) {
                        scope.clickToEditConfig = { model: {value: ""}, fieldType: "text", onSave: null };
                    }

                    if ( angular.isDefined(scope.model) && angular.isDefined(scope.model.value) ) {
                        scope.clickToEditConfig.model = scope.model;
                    }
                    if ( angular.isDefined(scope.fieldType) ) { scope.clickToEditConfig.fieldType = scope.fieldType; }
                    if ( angular.isDefined(scope.onSave) )    {  scope.clickToEditConfig.onSave = scope.onSave; }

                    scope.originalValue = scope.clickToEditConfig.model.value;

                    scope.editMode = false;
                },
                post: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {
                    scope.saveModel = function( model: IClickToEditModel) {
                        scope.errorMessage = "";

                        if (angular.isFunction(scope.clickToEditConfig.onSave)) {

                            var promise = scope.clickToEditConfig.onSave({model: model});

                            if (!promise) {
                                scope.setUpdatedModel(model);
                                return;
                            }

                            scope.resolvingData = true;
                            promise.then(
                                function() {
                                    scope.setUpdatedModel(model);
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

                    scope.setUpdatedModel = function(model) {
                        scope.originalValue = model.value;
                        scope.clickToEditConfig.model = model;
                        scope.model = model;
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
