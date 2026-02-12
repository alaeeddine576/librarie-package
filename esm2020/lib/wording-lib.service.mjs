import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class WordingService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBaUJ2RCxNQUFNLE9BQU8sY0FBYztJQUgzQjtRQUlVLFNBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEMsMkNBQTJDO1FBQ3BDLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFFeEQscUVBQXFFO1FBQzdELGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQTBCLENBQUM7S0FpRnpEO0lBL0VDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsaUVBQWlFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUUvQixJQUFJO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3hDLDRCQUE0QjtZQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBZ0IsR0FBRyxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFNUYsZ0RBQWdEO1lBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzVDLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixXQUFXLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWxF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QUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs0R0F4RlUsY0FBYztnSEFBZCxjQUFjLGNBRmIsTUFBTTs0RkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGZpcnN0VmFsdWVGcm9tLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLy8gSW50ZXJmYWNlIHBvdXIgbGEgc3RydWN0dXJlIGR1IGZpY2hpZXIgY29uZmlnLmpzb25cbmV4cG9ydCBpbnRlcmZhY2UgV29yZGluZ0NvbmZpZyB7XG4gIHZlcnNpb246IHN0cmluZztcbiAgYWN0aXZlX2xhbmd1YWdlczogc3RyaW5nW107XG4gIGRlZmF1bHRfbGFuZzogc3RyaW5nO1xufVxuXG4vLyBJbnRlcmZhY2UgcsOpY3Vyc2l2ZSBwb3VyIGxlcyBkb25uw6llcyBkZSB0cmFkdWN0aW9uIChKU09OIGFyYml0cmFpcmUpXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbGF0aW9uTWFwIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgVHJhbnNsYXRpb25NYXA7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFdvcmRpbmdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBodHRwID0gaW5qZWN0KEh0dHBDbGllbnQpO1xuXG4gIC8vIE9uIHV0aWxpc2UgVHJhbnNsYXRpb25NYXAgYXUgbGlldSBkZSBhbnlcbiAgcHVibGljIHRyYW5zbGF0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRyYW5zbGF0aW9uTWFwPih7fSk7XG4gIHB1YmxpYyBjdXJyZW50TGFuZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2VuJyk7XG5cbiAgLy8gQ2FjaGUgZW4gbcOpbW9pcmUgKFJBTSkgdW5pcXVlbWVudCAtIFBsdXMgc8OpY3VyaXPDqSBxdWUgbG9jYWxTdG9yYWdlXG4gIHByaXZhdGUgbWVtb3J5Q2FjaGUgPSBuZXcgTWFwPHN0cmluZywgVHJhbnNsYXRpb25NYXA+KCk7XG5cbiAgYXN5bmMgaW5pdFdvcmRpbmcoKSB7XG4gICAgLy8gQWRhcHRlciBsJ1VSTCBzZWxvbiBvw7kgdHUgcG9zZXMgdGVzIGZpY2hpZXJzIChleDogYXNzZXRzL2kxOG4pXG4gICAgY29uc3QgYmFzZVVybCA9ICcvYXNzZXRzL2kxOG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCfwn5SEIEluaXQgV29yZGluZyAodjE1KS4uLicpO1xuICAgICAgLy8gVHlwYWdlIGRlIGxhIHLDqXBvbnNlIEhUVFBcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuaHR0cC5nZXQ8V29yZGluZ0NvbmZpZz4oYCR7YmFzZVVybH0vY29uZmlnLmpzb25gKSk7XG5cbiAgICAgIC8vIE9uIHbDqXJpZmllIHNpIG9uIGEgZMOpasOgIGNoYXJnZXIgY2V0dGUgdmVyc2lvblxuICAgICAgY29uc3QgY3VycmVudExhbmcgPSB0aGlzLmN1cnJlbnRMYW5nJC52YWx1ZTtcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYHdvcmRpbmdfZGF0YV8ke2N1cnJlbnRMYW5nfV92JHtjb25maWcudmVyc2lvbn1gO1xuXG4gICAgICAvLyBWw6lyaWZpY2F0aW9uIGR1IENhY2hlIE3DqW1vaXJlXG4gICAgICBpZiAodGhpcy5tZW1vcnlDYWNoZS5oYXMoY2FjaGVLZXkpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfimqEgTWVtb3J5IENhY2hlIEhpdCcpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9ucyQubmV4dCh0aGlzLm1lbW9yeUNhY2hlLmdldChjYWNoZUtleSkhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygn4qyH77iPIFTDqWzDqWNoYXJnZW1lbnQgcmVxdWVzdCBjb25maWcgZnJvbTonLCBgJHtiYXNlVXJsfS9jb25maWcuanNvbmApO1xuICAgICAgYXdhaXQgdGhpcy5sb2FkVHJhbnNsYXRpb25Gcm9tU2VydmVyKGNvbmZpZy52ZXJzaW9uLCBiYXNlVXJsKTtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIFdvcmRpbmc6XCIsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRUcmFuc2xhdGlvbkZyb21TZXJ2ZXIodmVyc2lvbjogc3RyaW5nLCBiYXNlVXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsYW5nID0gdGhpcy5jdXJyZW50TGFuZyQudmFsdWU7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgd29yZGluZ19kYXRhXyR7bGFuZ31fdiR7dmVyc2lvbn1gO1xuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9LyR7bGFuZ30udiR7dmVyc2lvbn0uanNvbmA7XG4gICAgY29uc29sZS5sb2coJ1RyeWluZyB0byBsb2FkIHRyYW5zbGF0aW9uIGZyb206JywgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUeXBhZ2UgZGUgbGEgcsOpcG9uc2UgSFRUUFxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuaHR0cC5nZXQ8VHJhbnNsYXRpb25NYXA+KHVybCkpO1xuICAgICAgY29uc29sZS5sb2coJ1RyYW5zbGF0aW9uIGRhdGEgbG9hZGVkOicsIGRhdGEpO1xuXG4gICAgICB0aGlzLnRyYW5zbGF0aW9ucyQubmV4dChkYXRhKTsgLy8gTWlzZSDDoCBqb3VyIGRlcyB2dWVzXG5cbiAgICAgIC8vIFNhdXZlZ2FyZGUgZGFucyBsZSBDYWNoZSBNw6ltb2lyZVxuICAgICAgdGhpcy5tZW1vcnlDYWNoZS5zZXQoY2FjaGVLZXksIGRhdGEpO1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHRyYW5zbGF0aW9uIGZpbGU6JywgZXJyKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzd2l0Y2hMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLmN1cnJlbnRMYW5nJC5uZXh0KGxhbmcpO1xuICAgIGF3YWl0IHRoaXMuaW5pdFdvcmRpbmcoKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZywgcGFyYW1zPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSk6IHN0cmluZyB7XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGxldCByZXN1bHQ6IHN0cmluZyB8IFRyYW5zbGF0aW9uTWFwIHwgdW5kZWZpbmVkID0gdGhpcy50cmFuc2xhdGlvbnMkLnZhbHVlO1xuXG4gICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQgPSAocmVzdWx0IGFzIFRyYW5zbGF0aW9uTWFwKVtrXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXk7IC8vIENsw6kgaW50cm91dmFibGUgb3UgY2hlbWluIGludmFsaWRlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2kgbGUgcsOpc3VsdGF0IGVzdCB1bmUgY2hhw65uZSwgb24gYXBwbGlxdWUgbGVzIHBhcmFtw6h0cmVzIHNpIHByw6lzZW50c1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnJlcGxhY2UoL1xce1xce1xccyooW2EtekEtWjAtOV9dKylcXHMqXFx9XFx9L2csIChtYXRjaCwgcGFyYW1LZXkpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1twYXJhbUtleV07XG4gICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyBTdHJpbmcodmFsdWUpIDogbWF0Y2g7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5O1xuICB9XG59XG4iXX0=