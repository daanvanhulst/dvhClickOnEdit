/// <reference path="../typings/tsd.d.ts" />

/**
 * @ngdoc overview
 * @name ClickToEdit
 */
module ClickToEdit {

    export interface IClickToEditScope extends ng.IScope {
        name: string;
    }

    export class BaseElement {
        public link: (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public template = "<h1>My Directive</h1>";
        public scope = {};

        constructor() {
            BaseElement.prototype.link = (scope: IClickToEditScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                element.bind("click", function(e) {
                    alert("clicked");
                });
            };
        }

        public static Factory() {
            var directive = () => {
                return new BaseElement();
            };

            directive["$inject"] = [];

            return directive;
        }
    }

    angular.module("dvhClickToEdit", []).directive("dvhClickToEdit", BaseElement.Factory());
}


