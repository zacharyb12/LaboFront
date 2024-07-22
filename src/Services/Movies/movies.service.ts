import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../../Models/Movie/movie.model';
import { CreateMovie } from '../../Models/Movie/createMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient : HttpClient
  ) { }

  Get(){
    return this.httpClient.get<Movie[]>('http://tfcybersecu.somee.com/api/Movie');
  }

  GetDetails(id : number){
    return this.httpClient.get<Movie>('http://tfcybersecu.somee.com/api/Movie/'+ id);
  }

  AddMovie(movieModel : CreateMovie){
    
    return this.httpClient.post('http://tfcybersecu.somee.com/api/Movie',movieModel);
  }

  DeleteMovie(id : number){
    return this.httpClient.delete('http://tfcybersecu.somee.com/api/Movie/'+id);
  }

  UpdateMovie(id : number,movie : CreateMovie ){    
    return this.httpClient.put('http://tfcybersecu.somee.com/api/Movie/'+id,movie).subscribe({
      next: (response) => console.log(response)
      
    })
  }

  GetMovieByActorId(id : number){
    return this.httpClient.get('http://tfcybersecu.somee.com/api/Movie/'+id);
  }
}
