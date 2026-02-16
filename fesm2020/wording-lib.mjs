import * as i0 from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, firstValueFrom, from } from 'rxjs';

class WordingService {
    constructor() {
        this.http = inject(HttpClient);
        // On utilise TranslationMap au lieu de any
        this.translations$ = new BehaviorSubject({});
        this.currentLang$ = new BehaviorSubject('en');
        // Cache en mémoire (RAM) uniquement - Plus sécurisé que localStorage
        this.memoryCache = new Map();
        this.configSource = null; // Store config instance
    }
    /**
     * Called by APP_INITIALIZER to load config before app starts
     */
    loadConfig() {
        const baseUrl = '/assets/i18n';
        return this.http.get(`${baseUrl}/config.json`).pipe(
        // Tap into the stream to save the config
        tap(config => this.configSource = config));
    }
    async initWording() {
        const lang = this.currentLang$.value;
        const data = await firstValueFrom(this.getTranslation(lang));
        this.translations$.next(data);
    }
    getTranslation(lang) {
        return from(this.loadTranslation(lang));
    }
    async loadTranslation(lang) {
        // Adapter l'URL selon où tu poses tes fichiers (ex: assets/i18n)
        const baseUrl = '/assets/i18n';
        try {
            console.log(`🔄 Loading Wording for ${lang} (v15)...`);
            let config = this.configSource;
            if (!config) {
                console.warn('⚠️ Config not preloaded. Fetching now...');
                // Typage de la réponse HTTP
                config = await firstValueFrom(this.http.get(`${baseUrl}/config.json`));
                this.configSource = config;
            }
            else {
                console.log('✅ Using preloaded config (APP_INITIALIZER)');
            }
            // On vérifie si on a déjà charger cette version
            const cacheKey = `wording_data_${lang}_v${config.version}`;
            // Vérification du Cache Mémoire
            if (this.memoryCache.has(cacheKey)) {
                console.log('⚡ Memory Cache Hit');
                return this.memoryCache.get(cacheKey);
            }
            console.log('⬇️ Téléchargement request config from:', `${baseUrl}/config.json`);
            return await this.loadTranslationFromServer(config.version, baseUrl, lang);
        }
        catch (error) {
            console.error("Erreur Wording:", error);
            return {};
        }
    }
    async loadTranslationFromServer(version, baseUrl, lang) {
        const cacheKey = `wording_data_${lang}_v${version}`;
        const url = `${baseUrl}/${lang}.v${version}.json`;
        console.log('Trying to load translation from:', url);
        try {
            // Typage de la réponse HTTP
            const data = await firstValueFrom(this.http.get(url));
            console.log('Translation data loaded:', data);
            // Sauvegarde dans le Cache Mémoire
            this.memoryCache.set(cacheKey, data);
            return data;
        }
        catch (err) {
            console.error('Error loading translation file:', err);
            return {};
        }
    }
    async switchLanguage(lang) {
        this.currentLang$.next(lang);
        // await this.initWording(); // Let ngx-translate handle the switch via getTranslation
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

/*
 * Public API Surface of wording-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { WordingService };
//# sourceMappingURL=wording-lib.mjs.map
