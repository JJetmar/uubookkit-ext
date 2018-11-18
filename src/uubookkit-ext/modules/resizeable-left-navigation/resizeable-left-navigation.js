import {requirements, resources} from "../global-dependencies.json";
import {BookkitExtModule} from "../../core/bookkit-ext-module";

export class ResizeableLeftNavigation extends BookkitExtModule {

    onLoad() {
        const RES_LEFT_NAV_WIDTH = "width";
        let leftNavigationElement = $(".plus4u5-app-page-left-wrapper.uu5-bricks-page-left");
        let leftWidth = this.loadData(RES_LEFT_NAV_WIDTH);

        if(leftWidth) {
            leftNavigationElement.width(leftWidth);
        }

        if (!leftNavigationElement.data("initialized")) {
            leftNavigationElement.data("initialized", true);
            leftNavigationElement.resizable({
                option: {"handles": "e"},
                resize: ( event, ui ) => { this.storeData(RES_LEFT_NAV_WIDTH, ui.size.width); },
                containment: 'document'
            });
        }
    }

    getExternalRequirements() {
        return [
            requirements.JQUERY,
            requirements.JQUERY_UI
        ];
    }

    getExternalResources() {
        return [
            resources.JQUERY_UI_CSS
        ]
    }
}