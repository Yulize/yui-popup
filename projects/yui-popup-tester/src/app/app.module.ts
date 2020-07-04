import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {YuiPopupModule} from "yui-popup";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        YuiPopupModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
