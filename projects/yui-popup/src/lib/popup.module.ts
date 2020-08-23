import {NgModule} from "@angular/core";
import {PopupComponent} from "./components/popup/popup.component";
import {PopupContentComponent} from "./components/popup-content/popup-content.component";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";


@NgModule({
    declarations: [PopupComponent, PopupContentComponent],
    imports: [
        CommonModule,
        OverlayModule
    ],
    exports: [
        PopupComponent
    ]
})
export class PopupModule {
}
