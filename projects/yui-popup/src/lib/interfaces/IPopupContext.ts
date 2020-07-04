import {ICoordinate} from "./ICoordinate";
import {TemplateRef} from "@angular/core";
import {ConnectedPosition} from "@angular/cdk/overlay";
import {IPopupTarget} from "./IPopupTarget";

export interface IPopupContext {
    backdropClass?: string;
    coordinates: ICoordinate;
    hasBackdrop?: boolean;
    positions?: ConnectedPosition[];
    target: IPopupTarget;
    template: TemplateRef<any>; // Popup content template
}
