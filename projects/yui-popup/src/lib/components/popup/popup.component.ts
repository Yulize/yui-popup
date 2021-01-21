import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output, Renderer2,
    TemplateRef
} from "@angular/core";
import {IPopupRef} from "../../interfaces/IPopupRef";
import {ICoordinate} from "../../interfaces/ICoordinate";
import {PopupService} from "../../services/popup.service";
import {Direction} from "@angular/cdk/bidi";
import {IPopupTarget} from "../../interfaces/IPopupTarget";
import {element} from "protractor";

@Component({
    selector: "yui-popup",
    templateUrl: "./popup.component.html",
    styleUrls: ["./popup.component.scss"]
})
export class PopupComponent implements AfterViewInit, OnDestroy {

    private popupRef: IPopupRef = null;
    private rendererListenerRefList: Array<() => void> = [];

    @Input() direction: Direction = "ltr";
    @Input() precise: boolean = true;
    @Input() target: Element | ElementRef | ICoordinate | string;
    @Input() template: TemplateRef<any>;
    @Input() trigger: string = "click";
    @Output() create: EventEmitter<IPopupRef> = new EventEmitter<IPopupRef>();
    @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;

    public constructor(
        private popupService: PopupService,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        const targetElements: Element[] = [];
        if (typeof this.target === "string") {
            document.querySelectorAll(this.target as string).forEach(e => targetElements.push(e));
        }
        if (this.trigger) {
            if (targetElements.length > 0) {
                for (const e of targetElements) {
                    this.eventHandler(e);
                }
            } else {
                this.eventHandler(this.target);
            }
        } else {
            this.popupRef = this.popupService.createPopup({
                coordinates: null,
                target: this.target,
                template: this.template ?? this.contentTemplate,
                direction: this.direction ?? "ltr"
            });
            this.create.emit(this.popupRef);
        }
    }

    ngOnDestroy(): void {
        this.rendererListenerRefList.forEach(ref => ref?.());
    }

    private eventHandler(targetElement: IPopupTarget | string): void {
        const listenerRef = this.renderer.listen(targetElement, this.trigger, (event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            const coordinates = event instanceof MouseEvent && this.precise ? {x: event.x, y: event.y} as ICoordinate : null;
            this.popupRef = this.popupService.createPopup({
                coordinates,
                target: targetElement,
                template: this.template ?? this.contentTemplate,
                direction: this.direction ?? "ltr"
            });
            this.create.emit(this.popupRef);
        });
        this.rendererListenerRefList.push(listenerRef);
    }
}
