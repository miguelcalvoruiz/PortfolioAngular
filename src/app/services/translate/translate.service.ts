import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;
  private language: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.language = navigator.language || 'es';
    } else {
      this.language = 'es';
    }
  }

  public getData() {
    return new Promise((resolve, reject) => {
      const languageCode = this.language.split('-')[0];
      this.http.get(`assets/translations/${languageCode}.json`).subscribe(data => {
        this.data = data;
        resolve(true);
      }, error => {
        console.error('Error al recuperar las traducciones:', error);
        reject(error);
      });
    });
  }

  public getTranslate(word: string) {
    return this.data ? this.data[word] : '';
  }
}
