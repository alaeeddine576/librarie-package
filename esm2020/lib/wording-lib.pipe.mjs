import { Pipe, inject, ChangeDetectorRef } from '@angular/core';
import { WordingService } from './wording-lib.service';
import * as i0 from "@angular/core";
export class TranslatePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVF2RCxNQUFNLE9BQU8sYUFBYTtJQUt0QjtRQUpRLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLFFBQUcsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUlwQyxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hELCtFQUErRTtZQUMvRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFXLEVBQUUsTUFBMkM7UUFDOUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQzs7MkdBckJRLGFBQWE7eUdBQWIsYUFBYTs0RkFBYixhQUFhO2tCQUx6QixJQUFJO21CQUFDO29CQUNGLElBQUksRUFBRSxXQUFXO29CQUNqQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyx1RUFBdUU7aUJBQ3JGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgaW5qZWN0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdvcmRpbmdTZXJ2aWNlIH0gZnJvbSAnLi93b3JkaW5nLWxpYi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndHJhbnNsYXRlJyxcclxuICAgIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgICBwdXJlOiB0cnVlIC8vIE9wdGltaXphdGlvbjogT25seSBydW5zIHdoZW4gaW5wdXQgY2hhbmdlcyBvciB3ZSBtYW51YWxseSB0cmlnZ2VyIGl0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgd29yZGluZ1NlcnZpY2UgPSBpbmplY3QoV29yZGluZ1NlcnZpY2UpO1xyXG4gICAgcHJpdmF0ZSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xyXG4gICAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBXZSBzdWJzY3JpYmUgdG8gdHJhbnNsYXRpb24gdXBkYXRlc1xyXG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy53b3JkaW5nU2VydmljZS50cmFuc2xhdGlvbnMkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gdHJhbnNsYXRpb25zIGNoYW5nZSAobGFuZ3VhZ2Ugc3dpdGNoKSwgd2UgZm9yY2UgdGhlIHBpcGUgdG8gcmUtZXZhbHVhdGVcclxuICAgICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKGtleTogc3RyaW5nLCBwYXJhbXM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53b3JkaW5nU2VydmljZS5nZXQoa2V5LCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1Yikge1xyXG4gICAgICAgICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=