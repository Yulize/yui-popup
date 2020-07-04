import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {YuiPopupContentComponent} from "./yui-popup-content.component";

describe("YuiPopupContentComponent", () => {
    let component: YuiPopupContentComponent;
    let fixture: ComponentFixture<YuiPopupContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YuiPopupContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YuiPopupContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
