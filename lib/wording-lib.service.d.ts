import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export interface WordingConfig {
    version: string;
    active_languages: string[];
    default_lang: string;
}
export interface TranslationMap {
    [key: string]: string | TranslationMap;
}
export declare class WordingService implements TranslateLoader {
    private http;
    translations$: BehaviorSubject<TranslationMap>;
    currentLang$: BehaviorSubject<string>;
    private memoryCache;
    private configSource;
    /**
     * Called by APP_INITIALIZER to load config before app starts
     */
    loadConfig(): Observable<WordingConfig>;
    initWording(): Promise<void>;
    getTranslation(lang: string): Observable<any>;
    private loadTranslation;
    private loadTranslationFromServer;
    switchLanguage(lang: string): Promise<void>;
    get(key: string, params?: {
        [key: string]: string | number;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WordingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WordingService>;
}
