import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeopleService } from '../../../../Services/People/people.service';
import { Person } from '../../../../Models/Person/person.model';
import { AuthService } from '../../../../Auth/AuthService/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [
RouterLink,
NgIf
  ],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent {
  
  id : number;
  
  person? : Person;
  
  Role : WritableSignal<string> = signal('');
  
  constructor(
    private activRoute : ActivatedRoute,
    private peopleService : PeopleService,
    public authService : AuthService
  ){
this.Role.set(this.authService.role())

    this.id = this.activRoute.snapshot.params['id'];
    
    this.peopleService.GetDetails(this.id).subscribe({
      next: (person) => this.person = person
    })
    
  }
}
