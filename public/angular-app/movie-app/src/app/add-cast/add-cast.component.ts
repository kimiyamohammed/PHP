import { Component, Input, OnInit } from '@angular/core';


import { MoviesApiService } from '../movies-api.service';
import { Actor } from '../movies/movies.component';

@Component({
  selector: 'app-add-cast',
  templateUrl: './add-cast.component.html',
  styleUrls: ['./add-cast.component.css']
})
export class AddCastComponent implements OnInit {
  actor!:Actor;
  @Input() movieId!:string;  

  constructor(private movieService:MoviesApiService) {
    this.actor = new Actor("","",0);
   }

  ngOnInit(): void {
    console.log(this.movieId);
    
  }
  saveActor():void{
    this._saveActor(this.actor);
  }
  private _saveActor(actor:Actor){
    this.movieService.addCast(actor,this.movieId)
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
