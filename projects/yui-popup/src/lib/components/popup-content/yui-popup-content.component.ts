import {Component, HostBinding, Inject, TemplateRef} from "@angular/core";
import {IPopupInjectorData, POPUP_DATA} from "../../interfaces/IPopupInjectorData";

@Component({
    selector: "yui-popup-content",
    templateUrl: "./yui-popup-content.component.html",
    styleUrls: ["./yui-popup-content.component.scss"]
})
export class YuiPopupContentComponent {

    @HostBinding("class.yui-popup") get hostClass() {
        return true;
    }

    public constructor(
        @Inject(POPUP_DATA) private popupData: IPopupInjectorData
    ) {
    }

    public get ContentTemplate(): TemplateRef<any> {
        return this.popupData?.template;
    }

}
