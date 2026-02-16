import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject, from, tap } from 'rxjs';
import * as i0 from "@angular/core";
export class WordingService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQWMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFrQjlFLE1BQU0sT0FBTyxjQUFjO0lBSDNCO1FBSVUsU0FBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQywyQ0FBMkM7UUFDcEMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDeEQsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV4RCxxRUFBcUU7UUFDN0QsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUNoRCxpQkFBWSxHQUF5QixJQUFJLENBQUMsQ0FBQyx3QkFBd0I7S0E0RzVFO0lBMUdDOztPQUVHO0lBQ0gsVUFBVTtRQUNSLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixHQUFHLE9BQU8sY0FBYyxDQUFDLENBQUMsSUFBSTtRQUNoRSx5Q0FBeUM7UUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVk7UUFDeEMsaUVBQWlFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUUvQixJQUFJO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxXQUFXLENBQUMsQ0FBQztZQUV2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2dCQUN6RCw0QkFBNEI7Z0JBQzVCLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZ0IsR0FBRyxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQzthQUMzRDtZQUVELGdEQUFnRDtZQUNoRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsSUFBSSxLQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUzRCxnQ0FBZ0M7WUFDaEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDO2FBQ3hDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLE9BQU8sY0FBYyxDQUFDLENBQUM7WUFDaEYsT0FBTyxNQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUU1RTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLElBQVk7UUFDcEYsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztRQUNwRCxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sSUFBSSxJQUFJLEtBQUssT0FBTyxPQUFPLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVyRCxJQUFJO1lBQ0YsNEJBQTRCO1lBQzVCLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFOUMsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztTQUViO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFZO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLHNGQUFzRjtJQUN4RixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxNQUEyQztRQUMxRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUF3QyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUUzRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNwQixJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsRSxNQUFNLEdBQUksTUFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxPQUFPLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQzthQUNsRDtTQUNGO1FBRUQsd0VBQXdFO1FBQ3hFLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtvQkFDMUUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvQixPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7NEdBcEhVLGNBQWM7Z0hBQWQsY0FBYyxjQUZiLE1BQU07NEZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBmaXJzdFZhbHVlRnJvbSwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBmcm9tLCB0YXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG4vLyBJbnRlcmZhY2UgcG91ciBsYSBzdHJ1Y3R1cmUgZHUgZmljaGllciBjb25maWcuanNvblxuZXhwb3J0IGludGVyZmFjZSBXb3JkaW5nQ29uZmlnIHtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBhY3RpdmVfbGFuZ3VhZ2VzOiBzdHJpbmdbXTtcbiAgZGVmYXVsdF9sYW5nOiBzdHJpbmc7XG59XG5cbi8vIEludGVyZmFjZSByw6ljdXJzaXZlIHBvdXIgbGVzIGRvbm7DqWVzIGRlIHRyYWR1Y3Rpb24gKEpTT04gYXJiaXRyYWlyZSlcbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRpb25NYXAge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBUcmFuc2xhdGlvbk1hcDtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV29yZGluZ1NlcnZpY2UgaW1wbGVtZW50cyBUcmFuc2xhdGVMb2FkZXIge1xuICBwcml2YXRlIGh0dHAgPSBpbmplY3QoSHR0cENsaWVudCk7XG5cbiAgLy8gT24gdXRpbGlzZSBUcmFuc2xhdGlvbk1hcCBhdSBsaWV1IGRlIGFueVxuICBwdWJsaWMgdHJhbnNsYXRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VHJhbnNsYXRpb25NYXA+KHt9KTtcbiAgcHVibGljIGN1cnJlbnRMYW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignZW4nKTtcblxuICAvLyBDYWNoZSBlbiBtw6ltb2lyZSAoUkFNKSB1bmlxdWVtZW50IC0gUGx1cyBzw6ljdXJpc8OpIHF1ZSBsb2NhbFN0b3JhZ2VcbiAgcHJpdmF0ZSBtZW1vcnlDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBUcmFuc2xhdGlvbk1hcD4oKTtcbiAgcHJpdmF0ZSBjb25maWdTb3VyY2U6IFdvcmRpbmdDb25maWcgfCBudWxsID0gbnVsbDsgLy8gU3RvcmUgY29uZmlnIGluc3RhbmNlXG5cbiAgLyoqXG4gICAqIENhbGxlZCBieSBBUFBfSU5JVElBTElaRVIgdG8gbG9hZCBjb25maWcgYmVmb3JlIGFwcCBzdGFydHNcbiAgICovXG4gIGxvYWRDb25maWcoKTogT2JzZXJ2YWJsZTxXb3JkaW5nQ29uZmlnPiB7XG4gICAgY29uc3QgYmFzZVVybCA9ICcvYXNzZXRzL2kxOG4nO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFdvcmRpbmdDb25maWc+KGAke2Jhc2VVcmx9L2NvbmZpZy5qc29uYCkucGlwZShcbiAgICAgIC8vIFRhcCBpbnRvIHRoZSBzdHJlYW0gdG8gc2F2ZSB0aGUgY29uZmlnXG4gICAgICB0YXAoY29uZmlnID0+IHRoaXMuY29uZmlnU291cmNlID0gY29uZmlnKVxuICAgICk7XG4gIH1cblxuICBhc3luYyBpbml0V29yZGluZygpIHtcbiAgICBjb25zdCBsYW5nID0gdGhpcy5jdXJyZW50TGFuZyQudmFsdWU7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZykpO1xuICAgIHRoaXMudHJhbnNsYXRpb25zJC5uZXh0KGRhdGEpO1xuICB9XG5cbiAgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLmxvYWRUcmFuc2xhdGlvbihsYW5nKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIEFkYXB0ZXIgbCdVUkwgc2Vsb24gb8O5IHR1IHBvc2VzIHRlcyBmaWNoaWVycyAoZXg6IGFzc2V0cy9pMThuKVxuICAgIGNvbnN0IGJhc2VVcmwgPSAnL2Fzc2V0cy9pMThuJztcblxuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhg8J+UhCBMb2FkaW5nIFdvcmRpbmcgZm9yICR7bGFuZ30gKHYxNSkuLi5gKTtcblxuICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuY29uZmlnU291cmNlO1xuICAgICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCfimqDvuI8gQ29uZmlnIG5vdCBwcmVsb2FkZWQuIEZldGNoaW5nIG5vdy4uLicpO1xuICAgICAgICAvLyBUeXBhZ2UgZGUgbGEgcsOpcG9uc2UgSFRUUFxuICAgICAgICBjb25maWcgPSBhd2FpdCBmaXJzdFZhbHVlRnJvbSh0aGlzLmh0dHAuZ2V0PFdvcmRpbmdDb25maWc+KGAke2Jhc2VVcmx9L2NvbmZpZy5qc29uYCkpO1xuICAgICAgICB0aGlzLmNvbmZpZ1NvdXJjZSA9IGNvbmZpZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfinIUgVXNpbmcgcHJlbG9hZGVkIGNvbmZpZyAoQVBQX0lOSVRJQUxJWkVSKScpO1xuICAgICAgfVxuXG4gICAgICAvLyBPbiB2w6lyaWZpZSBzaSBvbiBhIGTDqWrDoCBjaGFyZ2VyIGNldHRlIHZlcnNpb25cbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYHdvcmRpbmdfZGF0YV8ke2xhbmd9X3Yke2NvbmZpZy52ZXJzaW9ufWA7XG5cbiAgICAgIC8vIFbDqXJpZmljYXRpb24gZHUgQ2FjaGUgTcOpbW9pcmVcbiAgICAgIGlmICh0aGlzLm1lbW9yeUNhY2hlLmhhcyhjYWNoZUtleSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+KaoSBNZW1vcnkgQ2FjaGUgSGl0Jyk7XG4gICAgICAgIHJldHVybiB0aGlzLm1lbW9yeUNhY2hlLmdldChjYWNoZUtleSkhO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygn4qyH77iPIFTDqWzDqWNoYXJnZW1lbnQgcmVxdWVzdCBjb25maWcgZnJvbTonLCBgJHtiYXNlVXJsfS9jb25maWcuanNvbmApO1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9hZFRyYW5zbGF0aW9uRnJvbVNlcnZlcihjb25maWcudmVyc2lvbiwgYmFzZVVybCwgbGFuZyk7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBXb3JkaW5nOlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBsb2FkVHJhbnNsYXRpb25Gcm9tU2VydmVyKHZlcnNpb246IHN0cmluZywgYmFzZVVybDogc3RyaW5nLCBsYW5nOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGB3b3JkaW5nX2RhdGFfJHtsYW5nfV92JHt2ZXJzaW9ufWA7XG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVVybH0vJHtsYW5nfS52JHt2ZXJzaW9ufS5qc29uYDtcbiAgICBjb25zb2xlLmxvZygnVHJ5aW5nIHRvIGxvYWQgdHJhbnNsYXRpb24gZnJvbTonLCB1cmwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFR5cGFnZSBkZSBsYSByw6lwb25zZSBIVFRQXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmlyc3RWYWx1ZUZyb20odGhpcy5odHRwLmdldDxUcmFuc2xhdGlvbk1hcD4odXJsKSk7XG4gICAgICBjb25zb2xlLmxvZygnVHJhbnNsYXRpb24gZGF0YSBsb2FkZWQ6JywgZGF0YSk7XG5cbiAgICAgIC8vIFNhdXZlZ2FyZGUgZGFucyBsZSBDYWNoZSBNw6ltb2lyZVxuICAgICAgdGhpcy5tZW1vcnlDYWNoZS5zZXQoY2FjaGVLZXksIGRhdGEpO1xuICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgdHJhbnNsYXRpb24gZmlsZTonLCBlcnIpO1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN3aXRjaExhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuY3VycmVudExhbmckLm5leHQobGFuZyk7XG4gICAgLy8gYXdhaXQgdGhpcy5pbml0V29yZGluZygpOyAvLyBMZXQgbmd4LXRyYW5zbGF0ZSBoYW5kbGUgdGhlIHN3aXRjaCB2aWEgZ2V0VHJhbnNsYXRpb25cbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZywgcGFyYW1zPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSk6IHN0cmluZyB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGxldCByZXN1bHQ6IHN0cmluZyB8IFRyYW5zbGF0aW9uTWFwIHwgdW5kZWZpbmVkID0gdGhpcy50cmFuc2xhdGlvbnMkLnZhbHVlO1xuXG4gICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQgPSAocmVzdWx0IGFzIFRyYW5zbGF0aW9uTWFwKVtrXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXk7IC8vIENsw6kgaW50cm91dmFibGUgb3UgY2hlbWluIGludmFsaWRlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2kgbGUgcsOpc3VsdGF0IGVzdCB1bmUgY2hhw65uZSwgb24gYXBwbGlxdWUgbGVzIHBhcmFtw6h0cmVzIHNpIHByw6lzZW50c1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnJlcGxhY2UoL1xce1xce1xccyooW2EtekEtWjAtOV9dKylcXHMqXFx9XFx9L2csIChtYXRjaCwgcGFyYW1LZXkpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1twYXJhbUtleV07XG4gICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyBTdHJpbmcodmFsdWUpIDogbWF0Y2g7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5O1xuICB9XG59XG4iXX0=