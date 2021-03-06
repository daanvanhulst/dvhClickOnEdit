/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../dvhClickToEdit.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    export class RichTextAreaEdit {
        // #region Angular directive properties, fields, and methods
        public link: (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public scope = false;
        public templateUrl = "dvhClickToEdit/dvhRichTextAreaEdit/dvhRichTextAreaEdit.html";
        // #endregion

        // #region Initialization and destruction
        constructor() {
            RichTextAreaEdit.prototype.link = (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                scope.$on("$destroy", this.destruct);
            };
        }

        public static Factory() {
            var directive = () => {
                return new RichTextAreaEdit();
            };

            directive["$inject"] = [];

            return directive;
        }

        private destruct() {
            console.log("destroying");
        }
        // #endregion
    }

    angular.module("dvhClickToEdit.dvhRichTextAreaEdit", ["textAngular"])
        .directive("dvhRichTextAreaEdit", RichTextAreaEdit.Factory());
}
