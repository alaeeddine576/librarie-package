import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WordingService {
    private http;
    translations$: BehaviorSubject<any>;
    currentLang$: BehaviorSubject<string>;
    initWording(): Promise<void>;
    private loadTranslationFromServer;
    switchLanguage(lang: string): Promise<void>;
    get(key: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WordingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WordingService>;
}
