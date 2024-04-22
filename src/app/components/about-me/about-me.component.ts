import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { PersonalData } from '../../models/personal-data';
import { Studie } from '../../models/studie';
import { Course } from '../../models/course';
import { Expereince } from '../../models/experience';
import { SkillGroup } from '../../models/skill';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {
  public img_profile: string = '';
  public personalData: PersonalData[] = [];
  public studies: Studie[] = [];
  public courses: Course[] = [];
  public experiences: Expereince[] = [];
  public skillsGroups: SkillGroup[] = [];

  showModal = false;
  selectedExperience: any = null;

  constructor(private configService: ConfigService,) {
  }

  async ngOnInit(): Promise<void> {
    this.img_profile = await this.configService.getConfigValue('data.imgProfile');
    this.personalData = await this.configService.getConfigValue("data.personalData");
    this.studies = await this.configService.getConfigValue("data.studies");
    this.courses = await this.configService.getConfigValue("data.courses");
    this.experiences = await this.configService.getConfigValue("data.experiences");
    this.skillsGroups = await this.configService.getConfigValue("data.skills");
  }

  getAosAnimationDownRightUpLeft(index: number): string {
    return index % 2 === 0 ? 'fade-down-right' : 'fade-up-left';
  }

  getAosAnimationDownUp(index: number): string {
    return index % 2 === 0 ? 'fade-down' : 'fade-up';
  }

  openModal(experience: any) {
    this.selectedExperience = experience;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }
}
