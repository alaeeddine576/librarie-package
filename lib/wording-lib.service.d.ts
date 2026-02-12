import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export interface WordingConfig {
    version: string;
    active_languages: string[];
    default_lang: string;
}
export interface TranslationMap {
    [key: string]: string | TranslationMap;
}
export declare class WordingService {
    private http;
    translations$: BehaviorSubject<TranslationMap>;
    currentLang$: BehaviorSubject<string>;
    private memoryCache;
    initWording(): Promise<void>;
    private loadTranslationFromServer;
    switchLanguage(lang: string): Promise<void>;
    get(key: string, params?: {
        [key: string]: string | number;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WordingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WordingService>;
}
