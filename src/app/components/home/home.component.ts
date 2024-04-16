import { TranslateService } from './../../services/translate/translate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  text = '';
  fullTranslatedText = '';
  words = ['label.home.gradient.dev', 'label.home.gradient.opportunity', 'label.home.gradient.welcome'];
  wordIndex = 0;
  delay = 100;
  isDeleting = false;

  constructor(private translateService: TranslateService) {
    this.typewrite();
  }

  typewrite() {
    const current = this.wordIndex % this.words.length;
    const fullTextKey = this.words[current];
    this.fullTranslatedText = this.translate(fullTextKey);

    if (this.isDeleting) {
      this.text = this.fullTranslatedText.substring(0, this.text.length - 1);
    } else {
      this.text = this.fullTranslatedText.substring(0, this.text.length + 1);
    }

    setTimeout(() => {
      this.typewrite();
    }, this.delay);

    if (!this.isDeleting && this.text === this.fullTranslatedText) {
      this.isDeleting = true;
      this.delay = 200;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.wordIndex++;
      this.delay = 100;
    }
  }

  translate(key: string): string {
    return this.translateService.getTranslate(key);
  }
}
