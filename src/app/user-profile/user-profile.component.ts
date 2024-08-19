import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};
  favoriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getAllMovies();
  }

  getUserProfile(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.updatedUser = { ...this.user };
      this.getFavoriteMovies();
    });
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.allMovies = response;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((movies: any[]) => {
      console.log('Fetched favorite movies:', movies);
      this.favoriteMovies = movies;
    });
  }

  updateUserProfile(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe({
      next: (response: any) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['movies']);  // Navigate to movies after update
      },
      error: () => {
        this.snackBar.open('Profile update failed.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  deleteUserAccount(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 2000,
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      },
      error: () => {
        this.snackBar.open('Failed to delete account.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  addFavoriteMovie(MovieId: string): void {
    this.fetchApiData.addFavoriteMovie(MovieId).subscribe({
      next: () => {
        this.snackBar.open('Movie added to favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); 
      },
      error: () => {
        this.snackBar.open('Failed to add movie to favorites.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  removeFavoriteMovie(MoviesId: string): void {
    this.fetchApiData.deleteFavoriteMovie(MoviesId).subscribe({
      next: () => {
        this.snackBar.open('Movie removed from favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); 
      },
      error: () => {
        this.snackBar.open('Failed to remove movie from favorites.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  isFavorite(MovieId: string): boolean {
    console.log('Checking if movie is favorite:', MovieId, this.favoriteMovies);
    return this.favoriteMovies?.includes(MovieId) || false;
  }
}