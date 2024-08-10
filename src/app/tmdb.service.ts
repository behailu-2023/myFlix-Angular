import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private tmdbApiKey = '6c0b6772ebea0ad89f5ac29c4c8be3df';
  private tmdbApiUrl = `https://api.themoviedb.org/3`;

  constructor(private http: HttpClient) {}

  getMoviePoster(title: string): Observable<string> {
    return this.http.get(`${this.tmdbApiUrl}/search/movie?api_key=${this.tmdbApiKey}&query=${encodeURIComponent(title)}`)
      .pipe(
        map((response: any) => {
          if (response.results.length > 0) {
            return `https://image.tmdb.org/t/p/w500${response.results[0].poster_path}`;
          } else {
            return ''; // Return an empty string if no poster found
          }
        })
      );
  }
}
