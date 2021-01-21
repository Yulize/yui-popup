import {Injectable, Injector, TemplateRef} from "@angular/core";
import {ConnectedPosition, Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {IPopupContext} from "../interfaces/IPopupContext";
import {IPopupRef} from "../interfaces/IPopupRef";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {Subject} from "rxjs";
import {IPopupInjectorData, POPUP_DATA} from "../interfaces/IPopupInjectorData";
import {PopupContentComponent} from "../components/popup-content/popup-content.component";
import {IPopupTarget} from "../interfaces/IPopupTarget";

@Injectable({
    providedIn: "root"
})
export class PopupService {
    private readonly defaultPositions: ConnectedPosition[] = [
        {
            originX: "start", originY: "bottom",
            overlayX: "start", overlayY: "top"
        },
        {
            originX: "start", originY: "top",
            overlayX: "start", overlayY: "bottom"
        },
        {
            originX: "end", originY: "top",
            overlayX: "end", overlayY: "top"
        },
        {
            originX: "start", originY: "top",
            overlayX: "end", overlayY: "top"
        },
        {
            originX: "end", originY: "top",
            overlayX: "start", overlayY: "top"
        },
        {
            originX: "end", originY: "center",
            overlayX: "start", overlayY: "center"
        },
        {
            originX: "start", originY: "center",
            overlayX: "end", overlayY: "center"
        }
    ];

    public constructor(
        private injector: Injector,
        private overlay: Overlay
    ) {
    }

    public createPopup(popupContext: IPopupContext): IPopupRef {

        const anchorPoint = popupContext.coordinates ?? popupContext.target;
        const positions = popupContext.positions?.length > 0 ? popupContext.positions : this.defaultPositions;
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(anchorPoint as IPopupTarget)
            .withPositions(positions)
            .withPush(true);
        const overlayConfig = new OverlayConfig({
            positionStrategy,
            hasBackdrop: popupContext.hasBackdrop ?? true,
            backdropClass: popupContext.backdropClass ?? "transparent",
            direction: popupContext.direction ?? "ltr"
        });
        const popupOverlayRef = this.overlay.create(overlayConfig);
        popupOverlayRef.attach(
            new ComponentPortal(
                PopupContentComponent,
                null,
                this.createInjector(PopupService.createInjectorData(popupContext.template), popupOverlayRef)
            )
        );
        const outsideClick$: Subject<void> = new Subject<void>();
        popupOverlayRef.backdropClick().subscribe(() => {
            popupOverlayRef.dispose();
            outsideClick$.next();
            outsideClick$.unsubscribe();
        });
        return {
            outsideClick$,
            close: () => {
                popupOverlayRef.detach();
                popupOverlayRef.dispose();
            },
            context: popupContext
        } as IPopupRef;
    }

    private createInjector(popupData: IPopupInjectorData, overlayRef: OverlayRef): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(OverlayRef, overlayRef);
        injectorTokens.set(POPUP_DATA, popupData);
        return new PortalInjector(this.injector, injectorTokens);
    }

    private static createInjectorData(content: TemplateRef<any>): IPopupInjectorData {
        return {
            template: content
        } as IPopupInjectorData;
    }
}
