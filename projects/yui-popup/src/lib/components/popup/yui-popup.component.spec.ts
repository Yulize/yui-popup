import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {YuiPopupComponent} from "./yui-popup.component";

describe("YuiPopupComponent", () => {
    let component: YuiPopupComponent;
    let fixture: ComponentFixture<YuiPopupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YuiPopupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YuiPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
