import { Component } from '@angular/core';
import { AuthService } from '../../Auth/AuthService/auth.service';
import { MoviesComponent } from "../MoviesFolder/movies/movies.component";
import { PeopleComponent } from "../PersonFolder/people/people.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    MoviesComponent,
    PeopleComponent
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(

  ){


  }
}
