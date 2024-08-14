import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TmdbService } from '../tmdb.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FetchApiDataService } from '../fetch-api-data.service';

interface Movie {
  title: string;
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
  favorites: string[] = [];

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
        this.tmdbService.getMoviePoster(movie.title).subscribe((posterUrl: string) => {
          movie.poster = posterUrl || 'assets/placeholder.png';
        });
      });
    });
  }

  getUserFavorites(): void {
    this.fetchApiData.getOneUser().subscribe((user: any) => {
      this.favorites = user.FavoriteMovies || [];
    });
  }

  openGenreDialog(genreName: string): void {
    this.fetchApiData.getOneGenre(genreName).subscribe((genre) => {
      this.dialog.open(GenreComponent, {
        data: genre,
        width: '500px'
      });
    });
  }

  openDirectorDialog(directorName: string): void {
    this.fetchApiData.getOneDirector(directorName).subscribe((director) => {
      this.dialog.open(DirectorComponent, {
        data: director,
        width: '500px'
      });
    });
  }

  openMovieDetailsDialog(movie: Movie): void {
    this.fetchApiData.getMovieDetails(movie.title).subscribe((response: any) => {
      this.dialog.open(MovieDetailsComponent, {
        data: { movie: response },
        width: '500px'
      });
    });
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
      this.getUserFavorites();
    });
  }

  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      this.getUserFavorites();
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }
}
