import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {PopupModule} from "yui-popup";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PopupModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
