import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class WordingService {
    constructor() {
        this.http = inject(HttpClient);
        // Version Compatible Angular 15 (BehaviorSubject)
        this.translations$ = new BehaviorSubject({});
        this.currentLang$ = new BehaviorSubject('en');
    }
    async initWording() {
        // Adapter l'URL selon où tu poses tes fichiers (ex: assets/i18n)
        const baseUrl = '/assets/i18n';
        try {
            console.log('🔄 Init Wording (v15)...');
            const config = await firstValueFrom(this.http.get(`${baseUrl}/config.json`));
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
            await this.loadTranslationFromServer(config.version, baseUrl);
        }
        catch (error) {
            console.error("Erreur Wording:", error);
        }
    }
    async loadTranslationFromServer(version, baseUrl) {
        const lang = this.currentLang$.value;
        const url = `${baseUrl}/${lang}.v${version}.json`;
        console.log('Trying to load translation from:', url);
        try {
            const data = await firstValueFrom(this.http.get(url));
            console.log('Translation data loaded:', data);
            this.translations$.next(data); // Mise à jour des vues
            // Cache
            localStorage.setItem(`wording_data_${lang}_v${version}`, JSON.stringify(data));
        }
        catch (err) {
            console.error('Error loading translation file:', err);
        }
    }
    async switchLanguage(lang) {
        this.currentLang$.next(lang);
        await this.initWording();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBS3ZELE1BQU0sT0FBTyxjQUFjO0lBSDNCO1FBSVUsU0FBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQyxrREFBa0Q7UUFDM0Msa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO0tBZ0V6RDtJQTlEQyxLQUFLLENBQUMsV0FBVztRQUNmLGlFQUFpRTtRQUNqRSxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFFL0IsSUFBSTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQztZQUVsRixnREFBZ0Q7WUFDaEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDNUMsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLFdBQVcsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEUsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE9BQU87YUFDUjtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxPQUFPLGNBQWMsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FFL0Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLHlCQUF5QixDQUFDLE9BQWUsRUFBRSxPQUFlO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxJQUFJLElBQUksS0FBSyxPQUFPLE9BQU8sQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXJELElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7WUFFdEQsUUFBUTtZQUNSLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksS0FBSyxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDaEY7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFZO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyx1QkFBdUI7UUFFOUQsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDO2FBQ1o7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OzRHQXBFVSxjQUFjO2dIQUFkLGNBQWMsY0FGYixNQUFNOzRGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgZmlyc3RWYWx1ZUZyb20sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXb3JkaW5nU2VydmljZSB7XG4gIHByaXZhdGUgaHR0cCA9IGluamVjdChIdHRwQ2xpZW50KTtcblxuICAvLyBWZXJzaW9uIENvbXBhdGlibGUgQW5ndWxhciAxNSAoQmVoYXZpb3JTdWJqZWN0KVxuICBwdWJsaWMgdHJhbnNsYXRpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih7fSk7XG4gIHB1YmxpYyBjdXJyZW50TGFuZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ2VuJyk7XG5cbiAgYXN5bmMgaW5pdFdvcmRpbmcoKSB7XG4gICAgLy8gQWRhcHRlciBsJ1VSTCBzZWxvbiBvw7kgdHUgcG9zZXMgdGVzIGZpY2hpZXJzIChleDogYXNzZXRzL2kxOG4pXG4gICAgY29uc3QgYmFzZVVybCA9ICcvYXNzZXRzL2kxOG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCfwn5SEIEluaXQgV29yZGluZyAodjE1KS4uLicpO1xuICAgICAgY29uc3QgY29uZmlnID0gYXdhaXQgZmlyc3RWYWx1ZUZyb20odGhpcy5odHRwLmdldDxhbnk+KGAke2Jhc2VVcmx9L2NvbmZpZy5qc29uYCkpO1xuXG4gICAgICAvLyBPbiB2w6lyaWZpZSBzaSBvbiBhIGTDqWrDoCBjaGFyZ2VyIGNldHRlIHZlcnNpb25cbiAgICAgIGNvbnN0IGN1cnJlbnRMYW5nID0gdGhpcy5jdXJyZW50TGFuZyQudmFsdWU7XG4gICAgICBjb25zdCBjYWNoZUtleSA9IGB3b3JkaW5nX2RhdGFfJHtjdXJyZW50TGFuZ31fdiR7Y29uZmlnLnZlcnNpb259YDtcbiAgICAgIGNvbnN0IHN0b3JlZERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZUtleSk7XG5cbiAgICAgIGlmIChzdG9yZWREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfimqEgQ2FjaGUgSGl0Jyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zJC5uZXh0KEpTT04ucGFyc2Uoc3RvcmVkRGF0YSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKCfirIfvuI8gVMOpbMOpY2hhcmdlbWVudCByZXF1ZXN0IGNvbmZpZyBmcm9tOicsIGAke2Jhc2VVcmx9L2NvbmZpZy5qc29uYCk7XG4gICAgICBhd2FpdCB0aGlzLmxvYWRUcmFuc2xhdGlvbkZyb21TZXJ2ZXIoY29uZmlnLnZlcnNpb24sIGJhc2VVcmwpO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgV29yZGluZzpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFRyYW5zbGF0aW9uRnJvbVNlcnZlcih2ZXJzaW9uOiBzdHJpbmcsIGJhc2VVcmw6IHN0cmluZykge1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLmN1cnJlbnRMYW5nJC52YWx1ZTtcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlVXJsfS8ke2xhbmd9LnYke3ZlcnNpb259Lmpzb25gO1xuICAgIGNvbnNvbGUubG9nKCdUcnlpbmcgdG8gbG9hZCB0cmFuc2xhdGlvbiBmcm9tOicsIHVybCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuaHR0cC5nZXQ8YW55Pih1cmwpKTtcbiAgICAgIGNvbnNvbGUubG9nKCdUcmFuc2xhdGlvbiBkYXRhIGxvYWRlZDonLCBkYXRhKTtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25zJC5uZXh0KGRhdGEpOyAvLyBNaXNlIMOgIGpvdXIgZGVzIHZ1ZXNcblxuICAgICAgLy8gQ2FjaGVcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGB3b3JkaW5nX2RhdGFfJHtsYW5nfV92JHt2ZXJzaW9ufWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgdHJhbnNsYXRpb24gZmlsZTonLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN3aXRjaExhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuY3VycmVudExhbmckLm5leHQobGFuZyk7XG4gICAgYXdhaXQgdGhpcy5pbml0V29yZGluZygpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBrZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMudHJhbnNsYXRpb25zJC52YWx1ZTsgLy8gLnZhbHVlIGF1IGxpZXUgZGUgKClcblxuICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdFtrXSkge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRba107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=