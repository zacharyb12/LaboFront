import { Routes } from '@angular/router';
import { HomepageComponent } from '../Pages/homepage/homepage.component';
import { MoviesComponent } from '../Pages/MoviesFolder/movies/movies.component';
import { MovieDetailsComponent } from '../Pages/MoviesFolder/movieDetails/movie-details/movie-details.component';
import { PeopleComponent } from '../Pages/PersonFolder/people/people.component';
import { PersonDetailsComponent } from '../Pages/PersonFolder/PersonDetails/person-details/person-details.component';
import { RegisterComponent } from '../Auth/RegisterComponent/register/register.component';
import { MovieAddComponent } from '../Pages/MoviesFolder/movieAdd/movie-add/movie-add.component';
import { PersonAddComponent } from '../Pages/PersonFolder/PersonAdd/person-add/person-add.component';
import { MovieUpdateComponent } from '../Pages/MoviesFolder/movieUpdate/movie-update/movie-update.component';
import { authGuard } from '../Auth/Guard/authGuard.guard';

export const routes: Routes = [
    { path : '' , component : HomepageComponent },
    { path : 'movies' , component : MoviesComponent},
    { path : 'movieDetails/:id' , component : MovieDetailsComponent},
    { path : 'people' , component: PeopleComponent},
    { path : 'personAdd' , component: PersonAddComponent, canActivate:[authGuard]},
    { path : 'personDetails/:id' , component : PersonDetailsComponent , canActivate:[authGuard]},
    { path : 'register' , component : RegisterComponent},
    { path : 'movieAdd' , component : MovieAddComponent, canActivate:[authGuard]},
    { path : 'movieUpdate/:id' , component : MovieUpdateComponent, canActivate:[authGuard]},


    
    { path : '**' , component : HomepageComponent}
];
