import {Component} from "@angular/core";
import {IPopupRef} from "yui-popup";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public popupRef: IPopupRef = null;

    public onPopupCreated(actions: IPopupRef) {
        this.popupRef = actions;
    }
}
