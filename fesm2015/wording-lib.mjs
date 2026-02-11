import { __awaiter } from 'tslib';
import * as i0 from '@angular/core';
import { inject, Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

class WordingService {
    constructor() {
        this.http = inject(HttpClient);
        // Version Compatible Angular 15 (BehaviorSubject)
        this.translations$ = new BehaviorSubject({});
        this.currentLang$ = new BehaviorSubject('en');
    }
    initWording() {
        return __awaiter(this, void 0, void 0, function* () {
            // Adapter l'URL selon où tu poses tes fichiers (ex: assets/i18n)
            const baseUrl = '/assets/i18n';
            try {
                console.log('🔄 Init Wording (v15)...');
                const config = yield firstValueFrom(this.http.get(`${baseUrl}/config.json`));
                // On vérifie si on a déjà charger cette version
                const currentLang = this.currentLang$.value;
                const cacheKey = `wording_data_${currentLang}_v${config.version}`;
                const storedData = localStorage.getItem(cacheKey);
                if (storedData) {
                    console.log('⚡ Cache Hit');
                    this.translations$.next(JSON.parse(storedData));
                    return;
                }
                console.log('⬇️ Téléchargement request config from:', `${baseUrl}/config.json`);
                yield this.loadTranslationFromServer(config.version, baseUrl);
            }
            catch (error) {
                console.error("Erreur Wording:", error);
            }
        });
    }
    loadTranslationFromServer(version, baseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const lang = this.currentLang$.value;
            const url = `${baseUrl}/${lang}.v${version}.json`;
            console.log('Trying to load translation from:', url);
            try {
                const data = yield firstValueFrom(this.http.get(url));
                console.log('Translation data loaded:', data);
                this.translations$.next(data); // Mise à jour des vues
                // Cache
                localStorage.setItem(`wording_data_${lang}_v${version}`, JSON.stringify(data));
            }
            catch (err) {
                console.error('Error loading translation file:', err);
            }
        });
    }
    switchLanguage(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentLang$.next(lang);
            yield this.initWording();
        });
    }
    get(key) {
        const keys = key.split('.');
        let result = this.translations$.value; // .value au lieu de ()
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            }
            else {
                return key;
            }
        }
        return result;
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
    }
    transform(key) {
        return this.wordingService.get(key);
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, isStandalone: true, name: "translate", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                    standalone: true,
                    pure: false
                }]
        }] });

/*
 * Public API Surface of wording-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TranslatePipe, WordingService };
//# sourceMappingURL=wording-lib.mjs.map
