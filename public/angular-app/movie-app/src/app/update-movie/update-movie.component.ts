import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../movies-api.service';
import { Actor, Location, Movie, Production } from '../movies/movies.component';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {
  movieId!:string;
  movie!:Movie;
  visible:boolean = false;
  constructor(private route:ActivatedRoute, private movieService:MoviesApiService) { 
    this.movieId = this.route.snapshot.params['movieId'];
    this.movie = new Movie('','',0,'', [new Actor('','',0)],new Production('',new Location('',[0,0])))

  }
  ngOnInit(): void {
    this.movieService.getOne(this.movieId)
    .then(movie => this._setMovie(movie))
    .catch(err => this._errorHandler(err));
  }
  fullUpdate():void{
    this.movieService.fullUpdate(this.movie,this.movieId)
    .then( response=> {
      this.movieId = response._id;      
    })
    .catch(err=>this._errorHandler(err))
    this.visible = true;
  }

  partialUpdate():void{
    this.movieService.partialUpdate(this.movie,this.movieId)
    .then( response=> {
      this.movieId = response._id;      
    })
    .catch(err=>this._errorHandler(err))
    this.visible = true;
  }


  private _setMovie(movie:Movie):void{
    this.movie = movie;
  }
  private _errorHandler(err: any):void{
    console.log(err);    
  }
}
