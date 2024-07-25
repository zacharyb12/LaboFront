import { Component, signal, WritableSignal } from '@angular/core';
import { MoviesService } from '../../../../Services/Movies/movies.service';
import { Movie } from '../../../../Models/Movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PeopleService } from '../../../../Services/People/people.service';
import { Person } from '../../../../Models/Person/person.model';
import { AuthService } from '../../../../Auth/AuthService/auth.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    NgFor
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})

export class MovieDetailsComponent {

  actors? : Person[];
  movie? : Movie;
  id : number;
  Role : WritableSignal<string>;



constructor(

  private movieService : MoviesService,
  private peopleService : PeopleService,
  private activRoute : ActivatedRoute,
  private authService : AuthService

){

  this.id = this.activRoute.snapshot.params['id'];

  this.movieService.GetDetails(this.id).subscribe({
    next : (movie) =>{ 
      this.movie = movie
    }
    
  })

  this.peopleService.Get().subscribe({
    next: (response) => this.actors = response
  })

  this.Role = authService.role;  

}



  Delete(){
    this.movieService.DeleteMovie(this.id);
  }

}
