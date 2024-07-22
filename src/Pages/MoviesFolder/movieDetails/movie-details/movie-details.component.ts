import { Component } from '@angular/core';
import { MoviesService } from '../../../../Services/Movies/movies.service';
import { Movie } from '../../../../Models/Movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

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

  movie? : Movie;
  id : number;
  constructor(
    private movieService : MoviesService,
    private activRoute : ActivatedRoute
  ){
    this.id = this.activRoute.snapshot.params['id'];
    this.movieService.GetDetails(this.id).subscribe({
      next : (movie) => this.movie = movie
    })
  }

  Delete(){
    this.movieService.DeleteMovie(this.id);
  }
}
