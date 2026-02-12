# Wording Library (wording-lib)

This library provides a simple and consistent way to manage translations in your Angular applications. It includes a `WordingService` for loading JSON translation files and a `TranslatePipe` for using them in your templates.

## 🚀 Quick Start Guide

Follow these steps to integrate `wording-lib` into a new Angular project.

### 1. Create a New Angular Project (Optional)

If you don't have a project yet, create one:

```bash
ng new my-new-app --standalone
cd my-new-app
```

### 2. Install the Library

Copy the `wording-lib-0.0.1.tgz` package file to the root of your new project. Then run:

```bash
npm install ./wording-lib-0.0.1.tgz
```

### 3. Setup Translation Files

The library fetches translation files from **`/assets/i18n`**.

#### Option A: Angular 17+ (Recommended for New Projects)
New Angular projects use a `public` folder instead of `src/assets`.
1.  Go to your `public` folder.
2.  Create the folders: `public/assets/i18n`.
3.  Place your `config.json` and translation `.json` files there.
    *   *Result:* The files will be accessible at `http://.../assets/i18n/config.json`, and the library will find them automatically. **No angular.json changes needed.**

#### Option B: Older Angular versions (src/assets)
1.  Create `src/assets/i18n`.
2.  Ensure `src/assets` is declared in your `angular.json` under `"assets"`.
3.  Place your files there.
like this:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  },
  "src/assets"
],
```

#### File Content Example
**config.json**:
```json
    {
        "version": "1",
        "active_languages": ["en", "fr", "es"],
        "default_lang": "en"
    }
    ```

3.  Add your translation files (e.g., `en.v1.json`, `fr.v1.json`) in the same folder:
    
**src/assets/i18n/en.v1.json**
```json
    {
        "HOME": {
            "TITLE": "Hello World",
            "SUBTITLE": "This is a test"
        }
    }
    ```

### 4. Verify App Config (Important for Angular 17+)
If you are using a Standalone application (default in Angular 19), you must provide `HttpClient`.

Open `src/app/app.config.ts`:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // <--- Import this

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <--- Add this
  ]
};
```

### 5. Integrate into Your Application

Update your `src/app/app.component.ts` to use the library.

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, WordingService } from 'wording-lib'; // Import from library

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslatePipe], // Add TranslatePipe to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private wordingService = inject(WordingService);

  ngOnInit() {
    // Initialize the translation service on startup
    // It will automatically load files from /assets/i18n
    this.wordingService.initWording(); 
  }

  // Helper method to switch languages
  changeLanguage(lang: string) {
    this.wordingService.switchLanguage(lang);
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
