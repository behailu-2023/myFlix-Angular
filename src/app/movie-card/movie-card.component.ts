import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  poster?: string;  // The poster property is optional initially
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [
    { title: 'Pay it Forward', Genre: { Name: 'Drama' }, Director: { Name: 'Mimi Leder' }, _id: '1' },
    { title: 'Focus', Genre: { Name: 'Crime' }, Director: { Name: 'Glenn Ficarra' }, _id: '2' },
    { title: 'Freedom Writers', Genre: { Name: 'Biography' }, Director: { Name: 'Richard LaGravenese' }, _id: '3' },
    { title: 'Pursuit of Happyness', Genre: { Name: 'Biography' }, Director: { Name: 'Gabriele Muccino' }, _id: '4' },
    { title: 'Roman J.Israel, Esq', Genre: { Name: 'Crime' }, Director: { Name: 'Dan Gilroy' }, _id: '5' },
    { title: 'Catch Me If You Can', Genre: { Name: 'Biography' }, Director: { Name: 'Steven Spielberg' }, _id: '6' },
    { title: 'Fences', Genre: { Name: 'Drama' }, Director: { Name: 'Denzel Washington' }, _id: '7' },
    { title: 'The Wolf of Wall Street', Genre: { Name: 'Biography' }, Director: { Name: 'Martin Scorsese' }, _id: '8' },
    { title: 'Now You See Me', Genre: { Name: 'Thriller' }, Director: { Name: 'Louis Leterrier' }, _id: '9' },
    { title: 'The Terminal', Genre: { Name: 'Comedy' }, Director: { Name: 'Steven Spielberg' }, _id: '10' },
    { title: 'Zodiac', Genre: { Name: 'Crime' }, Director: { Name: 'David Fincher' }, _id: '11' },
  ];
  users: any[] =[];
  favorites: any[] = [];

  constructor(
    private tmdbService: TmdbService, 
    public dialog: MatDialog, 
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.movies.forEach(movie => {
      this.tmdbService.getMoviePoster(movie.title).subscribe((posterUrl: string) => {
        movie.poster = posterUrl || 'assets/placeholder.png'; // Assign the poster URL to the movie object
      });
    });
  }

  openGenreDialog(genreName: string): void {
    console.log(`Opening genre dialog for: ${genreName}`);
    this.fetchApiData.getOneGenre(genreName).subscribe((genre) => {
      console.log('Genre data:', genre);
      if (genre) {
        this.dialog.open(GenreComponent, {
          data: genre,
          width: '500px'
        });
      } else {
        console.error('Genre data is missing or invalid.');
      }
    });
  }
  
  openDirectorDialog(directorName: string): void {
    console.log(`Opening director dialog for: ${directorName}`);
    this.fetchApiData.getOneDirector(directorName).subscribe((director) => {
      console.log('Director data:', director);
      if (director) {
        this.dialog.open(DirectorComponent, {
          data: director,
          width: '500px'
        });
      } else {
        console.error('Director data is missing or invalid.');
      }
    });
  }
  
  openMovieDetailsDialog(movie: any): void {
    console.log(`Opening movie details dialog for: ${movie.Title}`);
    this.fetchApiData.getMovieDetails(movie.Title).subscribe((response: any) => {
      console.log('Movie details data:', response);
      if (response) {
        this.dialog.open(MovieDetailsComponent, {
          data: { movie: response },
          width: '500px'
        });
      } else {
        console.error('Movie details data is missing or invalid.');
      }
    });
  }
  
  addToFavorites(movieId: string): void {
    console.log(`Adding movie to favorites with ID: ${movieId}`);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
      alert(`Movie with ID ${movieId} added to favorites!`);
    });
  }
  
}
