/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    export class TextAreaEdit {
        // #region Angular directive properties, fields, and methods
        public link: (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = false;
        public templateUrl = "dvhClickToEdit/dvhTextAreaEdit/dvhTextAreaEdit.html";
        // #endregion

        // #region Initialization and destruction
        constructor() {
            TextAreaEdit.prototype.link = (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                console.log(scope);
                scope.$on("$destroy", this.destruct);
            };
        }

        public static Factory() {
            var directive = () => {
                return new TextAreaEdit();
            };

            directive["$inject"] = [];

            return directive;
        }

        private destruct() {
            console.log("destroying");
        }
        // #endregion
    }

    angular.module("dvhClickToEdit.dvhTextAreaEdit", ["textAngular"])
        .directive("dvhTextAreaEdit", TextAreaEdit.Factory());
}
