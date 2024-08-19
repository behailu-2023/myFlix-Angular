import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];
  removeFromFavorites: any;

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies;
    });
  }
}
