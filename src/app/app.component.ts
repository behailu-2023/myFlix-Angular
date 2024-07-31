import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular';
  movies: any[] = [];

  constructor(private fetchApiDataService: FetchApiDataService) { }

  ngOnInit() {
    this.fetchApiDataService.getAllMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
}
