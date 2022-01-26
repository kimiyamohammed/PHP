import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Actor, Location, Movie, Production } from '../movies/movies.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie!:Movie;
  movieId!:string;
  visible:boolean = false;
  invisible:boolean = false;
  constructor(private movieService:MoviesApiService) {
    this.movie = new Movie('','',0,'', [new Actor('','',0)],new Production('',new Location('',[0])))
   }

  ngOnInit(): void {
  }
  saveMovie():void{
    this._saveMovie(this.movie);
    this.visible = true;
    this.movieId = this.movie._id;
  }
  private _saveMovie(movie:Movie){
    this.movieService.addOne(movie)
    .then( response=> {
      console.log(response);
      this.movieId = response._id;      
    })
    .catch(err=>this._errorHandler(err))
  }
  private _errorHandler(err: any):void{
    console.log(err);    
  }
}
