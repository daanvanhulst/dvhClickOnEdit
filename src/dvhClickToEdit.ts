/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    export interface IClickToEditScope extends ng.IScope {
        fieldType: string;
        value: string;
    }

    export class Element {
        // #region Angular directive properties, fields, and methods
        public link: (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = {
            fieldType: "@",
            value: "@"
        };
        // #endregion

        // #region Initialization and destruction
        constructor(editableDirectiveFactory, $compile) {
            Element.prototype.link = (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

                // Create the editable element
                var editableElement = editableDirectiveFactory.createEditableDirective(scope.fieldType);

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
