import { Component } from '@angular/core';
import { PeopleService } from '../../../Services/People/people.service';
import { Person } from '../../../Models/Person/person.model';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    RouterLink,
    NgFor
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {

  people : Person[] = [];
constructor(
  private peopleService : PeopleService
){
  this.peopleService.Get().subscribe({
    next: (people) => this.people = people
  })
}
}
