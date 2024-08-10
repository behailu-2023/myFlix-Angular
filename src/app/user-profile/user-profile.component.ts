import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<UserProfileComponent>
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getAllMovies();
  }

  // Method to get user profile data
  getUserProfile(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.updatedUser = { ...this.user };
      this.getFavoriteMovies();
    });
  }

  // Method to get all movies
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.allMovies = response;
    });
  }

  // Method to get user's favorite movies
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies;
    });
  }

  // Method to update user profile data
  updateUserProfile(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe({
      next: (response: any) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(response));
        this.dialogRef.close();
      },
      error: (response: any) => {
        this.snackBar.open('Profile update failed.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Method to add a movie to favorites
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe({
      next: () => {
        this.snackBar.open('Movie added to favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); // Refresh the list of favorite movies
      },
      error: () => {
        this.snackBar.open('Failed to add movie to favorites.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Method to remove a movie from favorites
  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
      next: () => {
        this.snackBar.open('Movie removed from favorites!', 'OK', {
          duration: 2000,
        });
        this.getFavoriteMovies(); // Refresh the list of favorite movies
      },
      error: () => {
        this.snackBar.open('Failed to remove movie from favorites.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Method to delete the user account
  deleteUserAccount(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 2000,
        });
        localStorage.clear();
        this.dialogRef.close();
      },
      error: () => {
        this.snackBar.open('Failed to delete account.', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Check if a movie is in the user's favorites
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }
}
