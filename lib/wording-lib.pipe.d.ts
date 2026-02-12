import { PipeTransform, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TranslatePipe implements PipeTransform, OnDestroy {
    private wordingService;
    private cdr;
    private sub;
    constructor();
    transform(key: string, params?: {
        [key: string]: string | number;
    }): string;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, "translate", true>;
}
