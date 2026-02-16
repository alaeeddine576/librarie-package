# Wording Library (wording-lib)

A robust Angular library for managing translations with versioning, caching, and `APP_INITIALIZER` support for high performance.

## 🚀 Quick Start Guide

### 1. Install the Library

Copy the `wording-lib-0.0.1.tgz` package file to the root of your project and run:

```bash
npm install ./wording-lib-0.0.1.tgz --legacy-peer-deps
```

### 2. Setup Translation Files

Create a folder `src/assets/i18n` and add your configuration and translation files.

**src/assets/i18n/config.json** (Required):
```json
{
    "version": "1",
    "active_languages": ["en", "fr"],
    "default_lang": "en"
}
```

**src/assets/i18n/en.v1.json**:
```json
{
    "HOME": {
        "TITLE": "Hello World"
    }
}
```

### 3. Configure Application (Critical Step)

To ensure translations are loaded **before** the app starts (preventing flickering/LCP issues), you must use `APP_INITIALIZER`.

#### For Standalone Applications (Angular 15+)
Update your `src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { WordingService } from 'wording-lib'; // Import from library

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: WordingService
        }
      })
    ),
    // Initialize WordingService before the app starts
    {
      provide: APP_INITIALIZER,
      useFactory: (service: WordingService) => () => service.loadConfig(),
      deps: [WordingService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
```

#### For Module-based Applications (Legacy)
Update your `app.module.ts`:

```typescript
// ... imports
import { APP_INITIALIZER } from '@angular/core';
import { WordingService } from 'wording-lib';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function initializeApp(wordingService: WordingService) {
  return () => wordingService.loadConfig();
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WordingService
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [WordingService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. Use in Components

**src/app/app.component.ts**:
```typescript
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule], 
  template: `
    <h1>{{ 'HOME.TITLE' | translate }}</h1>
    <button (click)="switchLang('fr')">FR</button>
  `
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Default lang is handled by WordingService, but you can force it here if needed
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
```

### 6. Use in Templates

Update your `src/app/app.component.html` to display translated text.

```html
<div style="text-align: center; margin-top: 50px;">
  <h1>{{ 'HOME.TITLE' | translate }}</h1>
  <h1>{{ 'HOME.TITLE' | translate }}</h1>
  <h3>{{ 'HOME.SUBTITLE' | translate }}</h3>

  <!-- Exemple avec Paramètres Dynamiques -->
  <p>{{ 'WELCOME_MSG' | translate: { name: 'Alae' } }}</p>

  <div style="margin-top: 20px;">
    <button (click)="changeLanguage('en')">English</button>
    <button (click)="changeLanguage('fr')">Français</button>
  </div>
</div>
```

### 7. Run Your App!

```bash
npm start
```

Visit `http://localhost:4200` and you should see your translated text!
