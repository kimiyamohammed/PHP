import { Component, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Location, Production } from '../movies/movies.component';

@Component({
  selector: 'app-add-production',
  templateUrl: './add-production.component.html',
  styleUrls: ['./add-production.component.css']
})
export class AddProductionComponent implements OnInit {
  production!:Production
  // lng:number = 0;
  // lat:number = 0;
  @Input() movieId!:string;  

  constructor(private movieService:MoviesApiService) {
    this.production = new Production("",new Location('',[0,0]));
   }

  ngOnInit(): void {
  }

  saveProduction():void{
    this._saveProduction(this.production);
  }
  private _saveProduction(production:Production){
    this.movieService.addProduction(production,this.movieId)
    .then( response=> {
      console.log(response)   ;
      this.movieId = response._id;
    }
    )
    .catch(err=>this._errorHandler(err))
  }
  private _errorHandler(err: any):void{
    console.log(err);    
  }
}
