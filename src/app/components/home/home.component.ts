import { SocialNetwork } from '../../models/social-network';
import { ConfigService } from '../../services/config/config.service';
import { TranslateService } from './../../services/translate/translate.service';
import { Component, OnInit } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  text = '';
  fullTranslatedText = '';
  words = ['label.home.gradient.dev', 'label.home.gradient.opportunity', 'label.home.gradient.welcome'];
  wordIndex = 0;
  delay = 100;
  isDeleting = false;

  public socialNetworks: SocialNetwork[] = [];
  public fileCV: string = '';

  public serviceID!: string;
  public templateID!: string;
  public userID!: string;

  constructor(private translateService: TranslateService, private configService: ConfigService,) {
    this.typewrite();
  }

  async ngOnInit(): Promise<void> {
    this.socialNetworks = await this.configService.getConfigValue("data.socialNetworks");
    this.fileCV = await this.configService.getConfigValue('data.fileCV');
    this.serviceID = await this.configService.getConfigValue("data.config.serviceID");
    this.templateID = await this.configService.getConfigValue("data.config.templateID-visita");
    this.userID = await this.configService.getConfigValue("data.config.userID");

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

    let timeout = this.delay;

    if (!this.isDeleting && this.text === this.fullTranslatedText) {
      timeout = 1500;
      this.isDeleting = true;
      this.delay = 50;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.wordIndex++;
      this.delay = 100;
    }

    setTimeout(() => {
      this.typewrite();
    }, timeout);
  }

  translate(key: string): string {
    return this.translateService.getTranslate(key);
  }

  sendEmail() {
    const dateTest = new Date();

    const formattedDate = [
      dateTest.getFullYear(),
      String(dateTest.getMonth() + 1).padStart(2, '0'),
      String(dateTest.getDate()).padStart(2, '0')
    ].join('-') + ' ' + [
      String(dateTest.getHours()).padStart(2, '0'),
      String(dateTest.getMinutes()).padStart(2, '0'),
      String(dateTest.getSeconds()).padStart(2, '0')
    ].join(':');
    const formDataToSend: Record<string, unknown> = {
      date: formattedDate
    };
    emailjs.send(this.serviceID, this.templateID, formDataToSend, this.userID)
  }

}
