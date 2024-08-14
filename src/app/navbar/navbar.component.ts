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
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if token is present
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
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
