import {ICoordinate} from "./ICoordinate";
import {TemplateRef} from "@angular/core";
import {ConnectedPosition} from "@angular/cdk/overlay";
import {IPopupTarget} from "./IPopupTarget";
import {Direction} from "@angular/cdk/bidi";

export interface IPopupContext {
    backdropClass?: string;
    coordinates: ICoordinate;
    direction?: Direction;
    hasBackdrop?: boolean;
    positions?: ConnectedPosition[];
    target: IPopupTarget | string;
    template: TemplateRef<any>; // Popup content template
}
