import SwiperCore, { Keyboard, Pagination, Navigation, Autoplay, SwiperOptions } from 'swiper';
SwiperCore.use([Keyboard, Pagination, Navigation, Autoplay]);
import { ConfigService } from '../../services/config/config.service';
import { Project } from '../../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{

  public projects: Project[] = [];
  public activeProjectDescription: string | null = null;

  config: SwiperOptions = {
    loopedSlides: 4,
    initialSlide: 0,
    spaceBetween: 10,
    navigation: true,
    centeredSlides: true,
    keyboard: {
      enabled: true
    },
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 2000,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 25
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1250: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  }

  constructor(private configService: ConfigService) {

  }

  async ngOnInit(): Promise<void> {
    this.projects = await this.configService.getConfigValue('data.projects');
  }

  showDescription(description: string): void {
    this.activeProjectDescription = description;
  }

  hideDescription(): void {
    this.activeProjectDescription = null;
  }
}
