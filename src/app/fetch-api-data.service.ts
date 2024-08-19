import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const apiUrl = "https://movie-api-7p14.onrender.com/";

/**
 * Service providing methods to interact with the movie API.
 * Handles user registration, login, and various movie-related requests.
 */
@Injectable({
  providedIn: 'root', useClass: FetchApiDataService
})
export class FetchApiDataService {

   /**
   * Constructor for FetchApiDataService.
   * @param http - HttpClient used to perform HTTP requests.
   */

  constructor(private http: HttpClient) { }

   /**
   * Registers a new user.
   * @param userDetails - Object containing user registration details.
   * @returns Observable<any> - Observable containing the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

    /**
   * Logs in a user.
   * @param userDetails - Object containing user login details.
   * @returns Observable<any> - Observable containing the API response.
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies.
   * @returns Observable<any> - Observable containing an array of movie objects.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
   * Retrieves details of a single movie by title.
   * @param title - The title of the movie to retrieve.
   * @returns Observable<any> - Observable containing the movie object.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
   * Fetches details of a single movie.
   * @param movieTitle - The title of the movie to retrieve.
   * @returns Observable<any> - Observable containing the movie details.
   */
  getMovieDetails(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${movieTitle}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


   /**
   * Retrieves details of a specific director.
   * @param directorName - The name of the director.
   * @returns Observable<any> - Observable containing the director details.
   */
   getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map((movie: any) => movie.Director), // Extract the Director from the movie object
      catchError(this.handleError)
    );
  }


   /**
   * Retrieves details of a specific genre.
   * @param genreName - The name of the genre.
   * @returns Observable<any> - Observable containing the genre details.
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/genres/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map((movie: any) => movie.Genre), // Extract the Genre from the movie object
      catchError(this.handleError)
    );
  }

   /**
   * Retrieves details of the logged-in user.
   * @returns Observable<any> - Observable containing the user object.
   */
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    //const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the favorite movies of the logged-in user.
   * @returns Observable<any> - Observable containing an array of favorite movie IDs.
   */
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((data: any) => {
        console.log('User data fetched from API:', data); // Log the complete user data
        return data.FavoriteMovies || [];
      }),
      catchError(this.handleError)
    );
  }
  

  /**
   * Adds a movie to the logged-in user's favorites.
   * @param MovieID - The ID of the movie to add to favorites.
   * @returns Observable<any> - Observable containing the API response.
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + MovieID, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((response: any) => {
        // Update user data in local storage to reflect the added favorite movie
        if (response && user.FavoriteMovies) {
          user.FavoriteMovies.push(MovieID);
          localStorage.setItem('user', JSON.stringify(user));
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Checks if a movie is in the logged-in user's favorites.
   * @param MovieId - The ID of the movie to check.
   * @returns boolean - True if the movie is a favorite, false otherwise.
   */
  isFavoriteMovie(MovieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(MovieId) >= 0;
  }

   /**
   * Updates the logged-in user's details.
   * @param updatedUser - The updated user object.
   * @returns Observable<any> - Observable containing the updated user object.
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes the logged-in user's account.
   * @returns Observable<any> - Observable containing the API response.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user._id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * Removes a movie from the logged-in user's favorites.
   * @param MoviesId - The ID of the movie to remove from favorites.
   * @returns Observable<any> - Observable containing the API response.
   */
  deleteFavoriteMovie(MoviesId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const index = user.FavoriteMovies.indexOf(MoviesId);
    console.log(index);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + MoviesId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Extracts response data from an HTTP response.
   * @param res - The HTTP response.
   * @returns any - The extracted data.
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

   /**
   * Handles errors from HTTP requests.
   * @param error - The HTTP error response.
   * @returns Observable<never> - An observable that throws an error.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}