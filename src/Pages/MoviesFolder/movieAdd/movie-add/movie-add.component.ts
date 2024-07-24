import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateMovie } from '../../../../Models/Movie/createMovie.model';
import { MoviesService } from '../../../../Services/Movies/movies.service';
import { Router } from '@angular/router';
import { Person } from '../../../../Models/Person/person.model';
import { PeopleService } from '../../../../Services/People/people.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './movie-add.component.html',
  styleUrl: './movie-add.component.css'
})
export class MovieAddComponent {
group : FormGroup;


actorList : Person[] = [];

constructor(
  private formBuilder : FormBuilder,
  private movieService : MoviesService,
  private peopleService : PeopleService,
  private router : Router
){
  this.group = this.formBuilder.group({
    title : [null,[Validators.required]],
    description : [null,[Validators.required]],
    realisatorId : [null,[Validators.required]],
    
    casting : this.formBuilder.array([ ]),
    
  })

  this.peopleService.Get().subscribe({
    next : (data) => this.actorList = data
  })
}

getCasting(): FormArray {
  return this.group.get('casting') as FormArray;
}

addCasting() {
  this.getCasting().push(

    this.formBuilder.group({
      actor: [null, [Validators.required]],
      role: [null, [Validators.required]]
    })

  )
}

removeCasting(index: number) {
  this.getCasting().removeAt(index)
}

AddMovie(e:Event){

  e.preventDefault()

  if(this.group.valid){
    
    let movieModel : CreateMovie = {

      title : this.group.value["title"],
      description : this.group.value["description"],
      realisatorId : this.group.value["realisatorId"],

      casting: this.group.value["casting"].map((castingItem: any) => ({
        id: castingItem.actor.id,
        firstname: castingItem.actor.firstname,
        lastname: castingItem.actor.lastname,
        pictureURL: castingItem.actor.pictureURL,
        role: castingItem.role
      }))
    }
      this.movieService.AddMovie(movieModel);

      this.router.navigateByUrl('/')
    }
  }
}
