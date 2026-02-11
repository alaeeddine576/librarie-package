import { Pipe, inject } from '@angular/core';
import { WordingService } from './wording-lib.service';
import * as i0 from "@angular/core";
export class TranslatePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZGluZy1saWIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dvcmRpbmctbGliL3NyYy9saWIvd29yZGluZy1saWIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU92RCxNQUFNLE9BQU8sYUFBYTtJQUwxQjtRQU1ZLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBS25EO0lBSEcsU0FBUyxDQUFDLEdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDOzsyR0FMUSxhQUFhO3lHQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFMekIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsV0FBVztvQkFDakIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxLQUFLO2lCQUNkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdvcmRpbmdTZXJ2aWNlIH0gZnJvbSAnLi93b3JkaW5nLWxpYi5zZXJ2aWNlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICd0cmFuc2xhdGUnLFxyXG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICAgIHB1cmU6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICBwcml2YXRlIHdvcmRpbmdTZXJ2aWNlID0gaW5qZWN0KFdvcmRpbmdTZXJ2aWNlKTtcclxuXHJcbiAgICB0cmFuc2Zvcm0oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndvcmRpbmdTZXJ2aWNlLmdldChrZXkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==