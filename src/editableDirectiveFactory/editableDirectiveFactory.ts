/// <reference path="../../typings/tsd.d.ts" />

module ClickToEditFactories {
    class EditableDirectiveFactory {

        public createEditableDirective(type): String {
            var element = "";
            switch (type) {
                case "textArea":
                    element = "<dvh-textarea-edit><dvh-textarea-edit/>";
                    break;
                case "text":
                default:
                    element = "<dvh-text-edit><dvh-text-edit/>";
                    break;

            }
            return element;
        }
    }

    angular.module("dvhClickToEdit.editableDirectiveFactory", []).factory("editableDirectiveFactory", () => {
        return new EditableDirectiveFactory();
    });
}
