import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './services/translate/translate.service';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular, faBootstrap, faCss3Alt, faFontAwesome, faGitAlt, faGithub, faHtml5, faJava, faJs, faLinkedinIn, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faArrowsSplitUpAndLeft, faCalendarDays, faCaretRight, faDatabase, faEnvelope, faFile, faHouse, faLeaf, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';

export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProjectsComponent,
    AboutMeComponent,
    ContactComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary, router: Router) {
    library.addIcons(
      faGithub, faLinkedinIn, faHouse, faEnvelope, faPhoneVolume, faCalendarDays, 
      faCaretRight, faHtml5, faCss3Alt, faJs, faJava, faPython, faAngular, faBootstrap, 
      faFontAwesome, faDatabase, faGitAlt, faArrowsSplitUpAndLeft, faWindowRestore, 
      faPaperPlane, faFile, faReact, faLeaf
    );

    // Integración de Google Analytics para el seguimiento de navegación
    router.events.pipe(
      filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      (window as any).gtag('config', 'G-VDV5XSTK26', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
