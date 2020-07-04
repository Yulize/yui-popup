import {InjectionToken, TemplateRef} from "@angular/core";

export const POPUP_DATA = new InjectionToken<IPopupInjectorData>("POPUP_DATA");

export interface IPopupInjectorData {
    template: TemplateRef<any>;
}
