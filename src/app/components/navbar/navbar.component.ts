import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(){

  }

  isMenuOpen = false;
  navLinks = [
    { label: 'label.navbar.home', url: '/home' },
    { label: 'label.navbar.aboutMe', url: '/aboutMe' },
    { label: 'label.navbar.projects', url: '/projects' },
    { label: 'label.navbar.contact', url: '/contact' }
  ];

}
