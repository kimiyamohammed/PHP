import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.css']
})
export class GeoSearchComponent implements OnInit {
  movies:Movie[] = [];
  lat:number = 0;
  lng:number = 0;
  dist:number = 0;
  constructor(private movieServices:MoviesApiService) { }

  ngOnInit(): void {
  }
searchGeo():void{
  this.movieServices.geoSearch(this.lng, this.lat, this.dist)
  .then( response=> {this.movies = response;console.log(response)})
  .catch(err =>this._errorHandler(err))

}



private _errorHandler(err: any):void{
console.log(err);    
}



}
