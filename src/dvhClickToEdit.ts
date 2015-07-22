/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    interface IClickToEditConfig {
        fieldType: string;
        value: string;
        onSave: ( value ) => void;
    }

    export interface IClickToEditScope extends ng.IScope {
        clickToEditConfig: IClickToEditConfig;
        value;
        fieldType: string;
        onSave: ( value ) => void;

        isoConfig: IClickToEditConfig;
		editMode: boolean;
        saveValue: ( value ) => void;
    }

    export class ClickToEditElement {
        // #region Angular directive properties, fields, and methods
        public link: {
            pre: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl ) => void;
            post: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl ) => void;
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

            ClickToEditElement.prototype.link = {
                pre: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl ) => {

                    if (angular.isDefined(scope.clickToEditConfig)) {
                        scope.isoConfig = scope.clickToEditConfig;
                    } else {
                        scope.isoConfig = { value: "", fieldType: "text", onSave: null };
                    }

                    if ( angular.isDefined(scope.value) )     { scope.isoConfig.value = scope.value; }
                    if ( angular.isDefined(scope.fieldType) ) { scope.isoConfig.fieldType = scope.fieldType; }
                    if ( angular.isDefined(scope.onSave) )    {  scope.isoConfig.onSave = scope.onSave; }

                    scope.editMode = false;
                },
                post: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl ) => {

                    scope.saveValue = function(value) {
                        scope.editMode = false;

                        if (angular.isFunction(scope.isoConfig.onSave)) {
                            scope.isoConfig.onSave(value);
                        }
                    };

                    // Create the editable element
                    var editableElement = editableDirectiveFactory.createEditableDirective(scope.isoConfig.fieldType);

                    //Compile the editable element
                    var e = $compile(editableElement)(scope);

                    //Replace the current element with the editable element
                    element.replaceWith(e);

                    scope.$on("$destroy", this.destruct);
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
            console.log("destroying");
        }
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
