import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    NgIf,
    FormsModule
  ],
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent {

  id!: number;
  group!: FormGroup;

  movie!: Movie;

  actorList: Person[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private peopleService: PeopleService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {

    this.id = this.activeRoute.snapshot.params['id'];
    console.log(this.id);
    

    this.movieService.GetDetails(this.id).subscribe({
      next: (movie) => {
        this.movie = movie;
        
        this.group = this.formBuilder.group({
          title : [this.movie.title,[Validators.required]],
          description : [this.movie.description,[Validators.required]],
          realisatorId : [this.movie.realisator.id,[Validators.required]],
          
          casting : this.formBuilder.array(
            this.movie.casting.map(actor => this.createCastingGroup(actor))
          ),
        })
      
    }
    });

    this.peopleService.Get().subscribe({
      next: (data) => this.actorList = data
    });
  }

  getCasting(): FormArray {
    return this.group.get('casting') as FormArray;
  }
  
  addCasting() {
    this.getCasting().push(this.createCastingGroup({ actor: null, role: null }));
  }


  createCastingGroup(actor: any): FormGroup {
    return this.formBuilder.group({
      actor: [actor, [Validators.required]],
      role: [actor.role, [Validators.required]]
    });
  }

  removeCasting(index: number) {
    this.getCasting().removeAt(index);
  }

  updateMovie(e:Event){
    e.preventDefault()
    if(this.group.valid){
      let movieModel : CreateMovie = {
  
        title : this.group.value["title"],
        description : this.group.value["description"],
        realisatorId : this.group.value["realisatorId"].id,
        
        casting: this.group.value["casting"].map((castingItem: any) => ({
          id: castingItem.actor.id,
          firstname: castingItem.actor.firstname,
          lastname: castingItem.actor.lastname,
          pictureURL: castingItem.actor.pictureURL,
          role: castingItem.role
        }))
      }
      console.log(movieModel);
      console.log(this.id);
      
        this.movieService.UpdateMovie(this.id,movieModel);
  
        this.router.navigateByUrl('/')
      }
    }
  
}
