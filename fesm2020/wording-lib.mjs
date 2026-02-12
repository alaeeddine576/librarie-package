import * as i0 from '@angular/core';
import { inject, Injectable, ChangeDetectorRef, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

class WordingService {
    constructor() {
        this.http = inject(HttpClient);
        // On utilise TranslationMap au lieu de any
        this.translations$ = new BehaviorSubject({});
        this.currentLang$ = new BehaviorSubject('en');
        // Cache en mémoire (RAM) uniquement - Plus sécurisé que localStorage
        this.memoryCache = new Map();
    }
    async initWording() {
        // Adapter l'URL selon où tu poses tes fichiers (ex: assets/i18n)
        const baseUrl = '/assets/i18n';
        try {
            console.log('🔄 Init Wording (v15)...');
            // Typage de la réponse HTTP
            const config = await firstValueFrom(this.http.get(`${baseUrl}/config.json`));
            // On vérifie si on a déjà charger cette version
            const currentLang = this.currentLang$.value;
            const cacheKey = `wording_data_${currentLang}_v${config.version}`;
            // Vérification du Cache Mémoire
            if (this.memoryCache.has(cacheKey)) {
                console.log('⚡ Memory Cache Hit');
                this.translations$.next(this.memoryCache.get(cacheKey));
                return;
            }
            console.log('⬇️ Téléchargement request config from:', `${baseUrl}/config.json`);
            await this.loadTranslationFromServer(config.version, baseUrl);
        }
        catch (error) {
            console.error("Erreur Wording:", error);
        }
    }
    async loadTranslationFromServer(version, baseUrl) {
        const lang = this.currentLang$.value;
        const cacheKey = `wording_data_${lang}_v${version}`;
        const url = `${baseUrl}/${lang}.v${version}.json`;
        console.log('Trying to load translation from:', url);
        try {
            // Typage de la réponse HTTP
            const data = await firstValueFrom(this.http.get(url));
            console.log('Translation data loaded:', data);
            this.translations$.next(data); // Mise à jour des vues
            // Sauvegarde dans le Cache Mémoire
            this.memoryCache.set(cacheKey, data);
        }
        catch (err) {
            console.error('Error loading translation file:', err);
        }
    }
    async switchLanguage(lang) {
        this.currentLang$.next(lang);
        await this.initWording();
    }
    get(key, params) {
        const keys = key.split('.');
        let result = this.translations$.value;
        for (const k of keys) {
            if (result && typeof result === 'object' && !Array.isArray(result)) {
                result = result[k];
            }
            else {
                return key; // Clé introuvable ou chemin invalide
            }
        }
        // Si le résultat est une chaîne, on applique les paramètres si présents
        if (typeof result === 'string') {
            if (params) {
                return result.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, paramKey) => {
                    const value = params[paramKey];
                    return value !== undefined ? String(value) : match;
                });
            }
            return result;
        }
        return key;
    }
}
WordingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WordingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
WordingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WordingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: WordingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class TranslatePipe {
    constructor() {
        this.wordingService = inject(WordingService);
        this.cdr = inject(ChangeDetectorRef);
        // We subscribe to translation updates
        this.sub = this.wordingService.translations$.subscribe(() => {
            // When translations change (language switch), we force the pipe to re-evaluate
            this.cdr.markForCheck();
        });
    }
    transform(key, params) {
        return this.wordingService.get(key, params);
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, isStandalone: true, name: "translate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                    standalone: true,
                    pure: true // Optimization: Only runs when input changes or we manually trigger it
                }]
        }], ctorParameters: function () { return []; } });

/*
 * Public API Surface of wording-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TranslatePipe, WordingService };
//# sourceMappingURL=wording-lib.mjs.map
