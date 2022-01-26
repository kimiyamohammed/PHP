import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../movies-api.service';
import { Actor, Location, Movie, Production } from '../movies/movies.component';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie!: Movie;
  #movieId!:string;
  constructor(private route:ActivatedRoute, private movieService:MoviesApiService) { 
    this.#movieId = this.route.snapshot.params['movieId'];
    console.log(this.#movieId);
    this.movie = new Movie('','',0,'', [new Actor('','',0)],new Production('',new Location('',[0,0])))
  }

  ngOnInit(): void {
    this._getMovie(this.#movieId);

  }
  private _getMovie(movieId: string){
    this.movieService.getOne(movieId)
      .then(movie => this._setMovie(movie))
      .catch(err => this._errorHandler(err));
  }

  private _setMovie(movie:Movie):void{
    console.log(movie);
    
    this.movie = movie;
  }
  private _errorHandler(err: any):void{
    console.log(err);    
  }
  deleteMovie(){
    this._deleteMovie(this.#movieId);
  }
  private _deleteMovie(movieId:string):void{
    this.movieService.deleteOne(movieId)
      .then(movie => console.log(movie))
      .catch(err => this._errorHandler(err));
  }
}
