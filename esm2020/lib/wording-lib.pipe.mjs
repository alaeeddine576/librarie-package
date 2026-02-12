import { Pipe, inject } from '@angular/core';
import { WordingService } from './wording-lib.service';
import * as i0 from "@angular/core";
export class TranslatePipe {
    constructor() {
        this.wordingService = inject(WordingService);
    }
    transform(key, params) {
        const currentLang = this.wordingService.currentLang$.value;
        const currentTranslations = this.wordingService.translations$.value;
        const currentParamsStr = params ? JSON.stringify(params) : undefined;
        // 1. Check if anything changed (Inputs OR Global State)
        if (key === this.lastKey &&
            currentParamsStr === this.lastParams &&
            currentLang === this.lastLang &&
            currentTranslations === this.lastTranslations) { // Essential: check if data arrived!
            return this.lastResult; // Return cached result (Performance optimized)
        }
        // 2. If changed, recalculate
        const result = this.wordingService.get(key, params);
        // 3. Update Cache
        this.lastKey = key;
        this.lastParams = currentParamsStr;
        this.lastLang = currentLang;
        this.lastTranslations = currentTranslations;
        this.lastResult = result;
        return result;
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, isStandalone: true, name: "translate", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate',
                    standalone: true,
                    pure: false // Standard ngx-translate approach: ensures updates always happen
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU92RCxNQUFNLE9BQU8sYUFBYTtJQUwxQjtRQU1ZLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBa0NuRDtJQXpCRyxTQUFTLENBQUMsR0FBVyxFQUFFLE1BQTJDO1FBQzlELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMzRCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNwRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRXJFLHdEQUF3RDtRQUN4RCxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTztZQUNwQixnQkFBZ0IsS0FBSyxJQUFJLENBQUMsVUFBVTtZQUNwQyxXQUFXLEtBQUssSUFBSSxDQUFDLFFBQVE7WUFDN0IsbUJBQW1CLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsb0NBQW9DO1lBQ3JGLE9BQU8sSUFBSSxDQUFDLFVBQVcsQ0FBQyxDQUFDLCtDQUErQztTQUMzRTtRQUVELDZCQUE2QjtRQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEQsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBRXpCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7OzJHQWxDUSxhQUFhO3lHQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFMekIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsV0FBVztvQkFDakIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsaUVBQWlFO2lCQUNoRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXb3JkaW5nU2VydmljZSB9IGZyb20gJy4vd29yZGluZy1saWIuc2VydmljZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndHJhbnNsYXRlJyxcclxuICAgIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgICBwdXJlOiBmYWxzZSAvLyBTdGFuZGFyZCBuZ3gtdHJhbnNsYXRlIGFwcHJvYWNoOiBlbnN1cmVzIHVwZGF0ZXMgYWx3YXlzIGhhcHBlblxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gICAgcHJpdmF0ZSB3b3JkaW5nU2VydmljZSA9IGluamVjdChXb3JkaW5nU2VydmljZSk7XHJcblxyXG4gICAgLy8gTWVtb2l6YXRpb24gQ2FjaGUgKHRvIG9wdGltaXplIHBlcmZvcm1hbmNlIGRlc3BpdGUgcHVyZTogZmFsc2UpXHJcbiAgICBwcml2YXRlIGxhc3RLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgbGFzdFBhcmFtczogc3RyaW5nIHwgdW5kZWZpbmVkOyAvLyBKU09OIHN0cmluZ2lmaWVkIGZvciBjb21wYXJpc29uXHJcbiAgICBwcml2YXRlIGxhc3RMYW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGxhc3RUcmFuc2xhdGlvbnM6IGFueSB8IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgbGFzdFJlc3VsdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIHRyYW5zZm9ybShrZXk6IHN0cmluZywgcGFyYW1zPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExhbmcgPSB0aGlzLndvcmRpbmdTZXJ2aWNlLmN1cnJlbnRMYW5nJC52YWx1ZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VHJhbnNsYXRpb25zID0gdGhpcy53b3JkaW5nU2VydmljZS50cmFuc2xhdGlvbnMkLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXJhbXNTdHIgPSBwYXJhbXMgPyBKU09OLnN0cmluZ2lmeShwYXJhbXMpIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAvLyAxLiBDaGVjayBpZiBhbnl0aGluZyBjaGFuZ2VkIChJbnB1dHMgT1IgR2xvYmFsIFN0YXRlKVxyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMubGFzdEtleSAmJlxyXG4gICAgICAgICAgICBjdXJyZW50UGFyYW1zU3RyID09PSB0aGlzLmxhc3RQYXJhbXMgJiZcclxuICAgICAgICAgICAgY3VycmVudExhbmcgPT09IHRoaXMubGFzdExhbmcgJiZcclxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0aW9ucyA9PT0gdGhpcy5sYXN0VHJhbnNsYXRpb25zKSB7IC8vIEVzc2VudGlhbDogY2hlY2sgaWYgZGF0YSBhcnJpdmVkIVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0UmVzdWx0ITsgLy8gUmV0dXJuIGNhY2hlZCByZXN1bHQgKFBlcmZvcm1hbmNlIG9wdGltaXplZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDIuIElmIGNoYW5nZWQsIHJlY2FsY3VsYXRlXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy53b3JkaW5nU2VydmljZS5nZXQoa2V5LCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAvLyAzLiBVcGRhdGUgQ2FjaGVcclxuICAgICAgICB0aGlzLmxhc3RLZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy5sYXN0UGFyYW1zID0gY3VycmVudFBhcmFtc1N0cjtcclxuICAgICAgICB0aGlzLmxhc3RMYW5nID0gY3VycmVudExhbmc7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhbnNsYXRpb25zID0gY3VycmVudFRyYW5zbGF0aW9ucztcclxuICAgICAgICB0aGlzLmxhc3RSZXN1bHQgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuIl19