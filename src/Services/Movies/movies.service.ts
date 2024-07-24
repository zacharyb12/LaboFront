import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../Models/Movie/movie.model';
import { CreateMovie } from '../../Models/Movie/createMovie.model';
import { AuthService } from '../../Auth/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient : HttpClient,
    private authService : AuthService
  ) { }

  Get(){
    return this.httpClient.get<Movie[]>('http://tfcybersecu.somee.com/api/Movie');
  }

  GetDetails(id : number){
    return this.httpClient.get<Movie>('http://tfcybersecu.somee.com/api/Movie/'+ id);
  }

  AddMovie(movieModel : CreateMovie){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.httpClient.post('http://tfcybersecu.somee.com/api/Movie',movieModel, {headers: headers}).subscribe({
      next: (response) => console.log(response)
      
    })
  }

  DeleteMovie(id : number){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.httpClient.delete('http://tfcybersecu.somee.com/api/Movie/'+id, {headers: headers}).subscribe({
      next: (response) => console.log(response)
      
    })
  }

  UpdateMovie(id : number,movie : CreateMovie ){    
    const token = this.authService.token()
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.httpClient.put('http://tfcybersecu.somee.com/api/Movie/'+ id, movie, {headers: headers}).subscribe({
      next: (response) => console.log(response)
      
    })
  }

  GetMovieByActorId(id : number){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.httpClient.get<Movie[]>('http://tfcybersecu.somee.com/api/Movie/byActorId/'+id, {headers: headers});
  }
}
