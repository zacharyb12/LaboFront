import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal } from '@angular/core';
import { Person } from '../../Models/Person/person.model';
import { AuthService } from '../../Auth/AuthService/auth.service';
import { CreatePerson } from '../../Models/Person/createPerson.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

token! : WritableSignal<string>;

constructor(
  private httpClient : HttpClient,
  private authService : AuthService
) { 
  this.token = authService.token
}

Get(){
  return this.httpClient.get<Person[]>('http://tfcybersecu.somee.com/api/Person');
}

GetDetails(id : number){
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  return this.httpClient.get<Person>('http://tfcybersecu.somee.com/api/Person/'+ id, {headers: headers});
  }

  Add(person : CreatePerson){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.httpClient.post<CreatePerson>('http://tfcybersecu.somee.com/api/Person',person,{headers: headers}).subscribe({
      
    })
  }

}