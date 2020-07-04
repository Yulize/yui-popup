import {IPopupContext} from "./IPopupContext";
import {Subject} from "rxjs";

export interface IPopupRef {
    context: IPopupContext;
    outsideClick$: Subject<void>;

    close();
}
