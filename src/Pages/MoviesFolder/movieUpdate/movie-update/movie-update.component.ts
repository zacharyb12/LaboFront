import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../../../../Models/Person/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMovie } from '../../../../Models/Movie/createMovie.model';
import { MoviesService } from '../../../../Services/Movies/movies.service';
import { PeopleService } from '../../../../Services/People/people.service';
import { Movie } from '../../../../Models/Movie/movie.model';

@Component({
  selector: 'app-movie-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'] // styleUrl -> styleUrls
})
export class MovieUpdateComponent {
  id!: number;
  group!: FormGroup;

  movie!: Movie;
  actorToSend: Person[] = [];
  actorList: Person[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private peopleService: PeopleService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    // Get Id From Route
    this.id = this.activeRoute.snapshot.params['id'];

    // Get Movie 
    this.movieService.GetDetails(this.id).subscribe({
      next: (movie) => {
        this.movie = movie;

        this.group = this.formBuilder.group({
          title: [this.movie.title, [Validators.required]],
          description: [this.movie.description, [Validators.required]],
          realisatorId: [this.movie.realisatorId, [Validators.required]],
          casting: this.formBuilder.array([]) // Initialize casting FormArray
        });

        // Populate the casting FormArray
        this.movie.casting.forEach(castMember => {
          this.addCastingMember(castMember);
        });
      }
    });

    // Get Actor List
    this.peopleService.Get().subscribe({
      next: (data) => this.actorList = data
    });
  }

  getCasting(): FormArray {
    return this.group.get('casting') as FormArray;
  }

  addCastingMember(castMember: Person) {
    this.getCasting().push(this.formBuilder.group({
      id: [castMember.id, [Validators.required]],
      firstname: [castMember.firstname, [Validators.required]],
      lastname: [castMember.lastname, [Validators.required]],
      pictureURL: [castMember.pictureURL, [Validators.required]],
      role: [castMember.role, [Validators.required]]
    }));
  }

  addCasting() {
    this.getCasting().push(this.formBuilder.group({
      id: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      pictureURL: [null, [Validators.required]],
      role: [null, [Validators.required]]
    }));
  }

  removeCasting(index: number) {
    this.getCasting().removeAt(index);
  }

  AddActor(actor: Person) {
    this.actorToSend.push(actor);
    this.addCastingMember(actor);
  }

  AddMovie(e: Event) {
    e.preventDefault();

    if (this.group.valid) {
      let movieModel: CreateMovie = {
        title: this.group.value["title"],
        description: this.group.value["description"],
        realisatorId: this.group.value["realisatorId"],
        casting: this.group.value["casting"]
      };
        console.log(movieModel);
        
       this.movieService.UpdateMovie(this.id, movieModel)
       this.router.navigateByUrl('/')
      };
    }
  
}
