import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DirectorComponent } from './director/director.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { GenreComponent } from './genre/genre.component';


export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'director', component: DirectorComponent},
  { path: 'genre', component: GenreComponent},
  { path: 'favorites', component: FavoriteMoviesComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
 ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }