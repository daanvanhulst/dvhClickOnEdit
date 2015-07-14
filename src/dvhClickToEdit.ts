/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    interface IDvhConfig {
        fieldType: string;
        value: string;
        onSave: ( value ) => void;
    }

    export interface IClickToEditScope extends ng.IScope {
        dvhConfig: IDvhConfig;
        value;
		editMode: boolean;
        saveValue: Function;
    }

    export class Element {
        // #region Angular directive properties, fields, and methods
        public link: ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => void;
        public scope = {
            dvhConfig: "="
        };
        // #endregion

        // #region Initialization and destruction
        constructor(editableDirectiveFactory, $compile) {
            Element.prototype.link = ( scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {

                scope.value = scope.dvhConfig.value;
				scope.editMode = false;

                scope.saveValue = function(value) {
                    scope.editMode = false;

                    if (angular.isFunction(scope.dvhConfig.onSave)) {
                        scope.dvhConfig.onSave(scope.value);
                    }
                    scope.dvhConfig.value = value;
                };

                // Create the editable element
                var editableElement = editableDirectiveFactory.createEditableDirective(scope.dvhConfig.fieldType);

                //Compile the editable element
                var e = $compile(editableElement)(scope);

                //Replace the current element with the editable element
                element.replaceWith(e);

                scope.$on("$destroy", this.destruct);
            };
        }

        public static Factory() {
            var directive = (editableDirectiveFactory, $compile) => {
                return new Element(editableDirectiveFactory, $compile);
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
        "dvhClickToEdit.dvhTextAreaEdit"
    ])
    .directive("dvhClickToEdit", Element.Factory());
}
