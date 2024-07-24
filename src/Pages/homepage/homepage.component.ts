import { Component, signal, WritableSignal } from '@angular/core';
import { MoviesComponent } from "../MoviesFolder/movies/movies.component";
import { PeopleComponent } from "../PersonFolder/people/people.component";
import { MoviesService } from '../../Services/Movies/movies.service';
import { Movie } from '../../Models/Movie/movie.model';
import { NgFor } from '@angular/common';
import { Person } from '../../Models/Person/person.model';
import { PeopleService } from '../../Services/People/people.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Auth/AuthService/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    MoviesComponent,
    PeopleComponent,
    NgFor,
    RouterLink,
    FormsModule
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  selectedValue : number = -1;
  people! : Person[];
  movieList! : Movie[];
  isLogged : WritableSignal<string>;

  constructor(
  private movieService : MoviesService,
  private peopleService : PeopleService,
  private authService : AuthService

  ){    
    
    this.peopleService.Get().subscribe({
      next: (response) => this.people = response
    })

    this.movieService.GetMovieByActorId(this.selectedValue).subscribe({
      next: (response) => {
        this.movieList = response
        
      }
    })

    this.isLogged = authService.isLogged
  }
  
  search(id : number){
    if(this.selectedValue != -1 && this.authService.isLogged() == "true"){

      this.movieService.GetMovieByActorId(this.selectedValue).subscribe({
        next: (response) => {
          this.movieList = response
          
        }
      })
    }

}

}
