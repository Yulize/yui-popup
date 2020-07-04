import {NgModule} from "@angular/core";
import {YuiPopupComponent} from "./components/popup/yui-popup.component";
import {YuiPopupContentComponent} from "./components/popup-content/yui-popup-content.component";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";


@NgModule({
    declarations: [YuiPopupComponent, YuiPopupContentComponent],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        YuiPopupComponent
    ]
})
export class YuiPopupModule {
}
