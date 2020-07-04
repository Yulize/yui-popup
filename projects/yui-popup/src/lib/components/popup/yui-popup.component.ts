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
import {YuiPopupService} from "../../services/yui-popup.service";

@Component({
    selector: "yui-popup",
    templateUrl: "./yui-popup.component.html",
    styleUrls: ["./yui-popup.component.scss"]
})
export class YuiPopupComponent implements AfterViewInit, OnDestroy {

    private popupRef: IPopupRef = null;
    private rendererListenerRef: () => void;

    @Input() precise: boolean = true;
    @Input() target: Element | ElementRef | ICoordinate;
    @Input() template: TemplateRef<any>;
    @Input() trigger: string = "click";
    @Output() create: EventEmitter<IPopupRef> = new EventEmitter<IPopupRef>();
    @ContentChild(TemplateRef) contentTemplate: TemplateRef<any>;

    public constructor(
        private popupService: YuiPopupService,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        if (this.trigger) {
            this.rendererListenerRef = this.renderer.listen(this.target, this.trigger, (event: MouseEvent) => {
                event.stopPropagation();
                event.preventDefault();
                const coordinates = event instanceof MouseEvent && this.precise ? {x: event.x, y: event.y} as ICoordinate : null;
                this.popupRef = this.popupService.createPopup({
                    coordinates,
                    target: this.target,
                    template: this.template ?? this.contentTemplate
                });
                this.create.emit(this.popupRef);
            });
        } else {
            this.popupRef = this.popupService.createPopup({
                coordinates: null,
                target: this.target,
                template: this.template ?? this.contentTemplate
            });
            this.create.emit(this.popupRef);
        }
    }

    ngOnDestroy(): void {
        this.rendererListenerRef?.();
    }

}
