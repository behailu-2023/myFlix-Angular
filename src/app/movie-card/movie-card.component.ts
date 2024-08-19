import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TmdbService } from '../tmdb.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FetchApiDataService } from '../fetch-api-data.service';

interface Movie {
  Title: string;
  Genre: { Name: string };
  Director: { Name: string };
  _id: string;
  poster?: string;
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  favoriteMovies: string[] = [];

  constructor(
    private tmdbService: TmdbService, 
    public dialog: MatDialog, 
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach(movie => {
        this.tmdbService.getMoviePoster(movie.Title).subscribe((posterUrl: string) => {
          movie.poster = posterUrl;
        });
      });
    });
  }

  getUserFavorites(): void {
    this.fetchApiData.getOneUser().subscribe((user: any) => {
      this.favoriteMovies = user.FavoriteMovies || [];
    });
  }

  openGenreDialog(genreName: string): void {
    this.fetchApiData.getOneGenre(genreName).subscribe((genre) => {
      if (genre) { // Ensure genre data is available
        this.dialog.open(GenreComponent, {
          data: genre,
          width: '500px'
        });
      } else {
        console.error('Genre data not found');
      }
    });
  }
  
  openDirectorDialog(directorName: string): void {
    this.fetchApiData.getOneDirector(directorName).subscribe((director) => {
      if (director) { // Ensure director data is available
        this.dialog.open(DirectorComponent, {
          data: director,
          width: '500px'
        });
      } else {
        console.error('Director data not found');
      }
    });
  }
  
  openMovieDetailsDialog(movie: Movie): void {
    this.fetchApiData.getMovieDetails(movie.Title).subscribe((response: any) => {
      if (response) { // Ensure movie details are available
        this.dialog.open(MovieDetailsComponent, {
          data: { movie: response },
          width: '500px'
        });
      } else {
        console.error('Movie details not found');
      }
    });
  }
  addToFavorites(MovieId: string): void {
    this.fetchApiData.addFavoriteMovie(MovieId).subscribe(() => {
      this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
      this.getUserFavorites();
    });
  }

  removeFromFavorites(MoviesId: string): void {
    this.fetchApiData.deleteFavoriteMovie(MoviesId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      this.getUserFavorites();
    });
  }

  isFavorite(MovieId: string): boolean {

    return this.favoriteMovies?.includes(MovieId) || false;
  }
}