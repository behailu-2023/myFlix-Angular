import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fetchApiData: FetchApiDataService
  ) { }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '400px'
    });
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
}
