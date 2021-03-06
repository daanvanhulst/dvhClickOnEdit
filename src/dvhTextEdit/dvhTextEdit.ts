/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    export class TextEdit {
        // #region Angular directive properties, fields, and methods
        public link: (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public templateUrl = "dvhClickToEdit/dvhTextEdit/dvhTextEdit.html";
        // #endregion

        // #region Initialization and destruction
        constructor() {
            TextEdit.prototype.link = (scope: IClickToEditScope,
                                       element: ng.IAugmentedJQuery,
                                       attrs: ng.IAttributes) => {
                scope.$on("$destroy", this.destruct);
            };
        }

        public static Factory() {
            var directive = () => {
                return new TextEdit();
            };

            directive["$inject"] = [];

            return directive;
        }

        private destruct() {
            console.log("destroying");
        }
        // #endregion
    }

    angular.module("dvhClickToEdit.dvhTextEdit", [])
        .directive("dvhTextEdit", TextEdit.Factory());
}
