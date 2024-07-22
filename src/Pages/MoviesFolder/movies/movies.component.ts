import { Component } from '@angular/core';
import { MoviesService } from '../../../Services/Movies/movies.service';
import { Movie } from '../../../Models/Movie/movie.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
NgFor,
RouterLink
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  moviesList : Movie[] = [];
  constructor(
    private movieService : MoviesService
  ){
this.movieService.Get().subscribe({
  next: (value) => this.moviesList = value,

  
})
  }

}
