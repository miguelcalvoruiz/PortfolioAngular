import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ConfigService } from '../../services/config/config.service';
import { Contact } from '../../models/contact';
import { PersonalData } from '../../models/personal-data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public formData: Contact = new Contact();
  public personalData: PersonalData[] = [];
  public img_profile: string = '';
  public serviceID!: string;
  public templateID!: string;
  public userID!: string;

  public progress: number = 0;
  public showProgressBar: boolean = false;

  public successAlertVisible: boolean = false;
  public errorAlertVisible: boolean = false;

  constructor(private configService: ConfigService) { }

  async ngOnInit(): Promise<void> {
    this.serviceID = await this.configService.getConfigValue("data.config.serviceID");
    this.templateID = await this.configService.getConfigValue("data.config.templateID");
    this.userID = await this.configService.getConfigValue("data.config.userID");
    this.img_profile = await this.configService.getConfigValue('data.imgProfile');
    this.personalData = await this.configService.getConfigValue("data.personalData");
  }

  sendEmail(form: any) {
    this.progress = 0;
    this.showProgressBar = true;

    const formDataToSend: Record<string, unknown> = {
      name: this.formData.name,
      email: this.formData.email,
      company: this.formData.company,
      message: this.formData.message
    };

    let intervalId = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(intervalId);
        this.showProgressBar = false;
      }
    }, 1000);

    emailjs.send(this.serviceID, this.templateID, formDataToSend, this.userID)
      .then((response: EmailJSResponseStatus) => {
        form.resetForm();
        this.progress = 100;
        setTimeout(() => {
          this.showProgressBar = false;
        }, 4000);
        clearInterval(intervalId);
        this.showSuccessAlert();
      }, (error) => {
        console.error('Error al enviar el correo', error);
        this.progress = 80;
        clearInterval(intervalId);
        this.showErrorAlert();
      });
  }

  showSuccessAlert() {
    this.successAlertVisible = true;
    setTimeout(() => {
      this.successAlertVisible = false;
    }, 4000);
  }

  showErrorAlert() {
    this.errorAlertVisible = true;
    setTimeout(() => {
      this.errorAlertVisible = false;
    }, 4000);
  }
}
