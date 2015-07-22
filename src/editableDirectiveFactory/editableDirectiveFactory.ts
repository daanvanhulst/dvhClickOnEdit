/// <reference path="../../typings/tsd.d.ts" />

module ClickToEditFactories {
    class EditableDirectiveFactory {

        public createEditableDirective(type): String {
            var element = "";
            switch (type) {
                case "textArea":
                    element = "<span dvh-text-area-edit></span>";
                    break;
                case "richTextArea":
                    element = "<span dvh-rich-text-area-edit></span>";
                    break;
                case "text":
                default:
                    element = "<span dvh-text-edit></span>";
                    break;

            }
            return element;
        }
    }

    angular.module("dvhClickToEdit.editableDirectiveFactory", []).factory("editableDirectiveFactory", () => {
        return new EditableDirectiveFactory();
    });
}
