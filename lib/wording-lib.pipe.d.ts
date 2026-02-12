import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TranslatePipe implements PipeTransform {
    private wordingService;
    private lastKey;
    private lastParams;
    private lastLang;
    private lastTranslations;
    private lastResult;
    transform(key: string, params?: {
        [key: string]: string | number;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, "translate", true>;
}
