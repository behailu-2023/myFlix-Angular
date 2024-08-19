import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Check login status on init

    // Listen for changes in localStorage (e.g., when user logs in/out)
    window.addEventListener('storage', () => this.checkLoginStatus());
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Update login status
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.checkLoginStatus(); // Update navbar visibility on logout
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToFavorites(): void {
    this.router.navigate(['favorites']);
  }

  openUserProfile(): void {
    this.router.navigate(['profile']);
  }
}