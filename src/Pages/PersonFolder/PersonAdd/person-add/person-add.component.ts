import { Component } from '@angular/core';
import { Person } from '../../../../Models/Person/person.model';
import { PeopleService } from '../../../../Services/People/people.service';
import { Router } from '@angular/router';
import { CreatePerson } from '../../../../Models/Person/createPerson.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.css'
})
export class PersonAddComponent {

  model: CreatePerson = {
    lastname: '',
    firstname: '',
    pictureURL: ''
  };

constructor(
  private peopleService : PeopleService,
  private router  : Router
){

}

Add(){
this.peopleService.Add(this.model);
  
}
}
