import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';

export class Actor{
  #_id!:string;
  #name!:string;
  #age!:number

   
  get _id():string {return this.#_id};
  get name():string {return this.#name};
  get age():number {return this.#age};
 

  set _id(_id:string) { this.#_id = _id};
  set name(name:string) { this.#name = name};
  set age(age:number) { this.#age = age};
  constructor(_id:string,name:string,age:number){

    this._id = _id;
    this.name = name;
    this.age = age;
  }
}
export class Location{
  #state!:string;
  #coordinates!:number[];

  get state():string {return this.#state};
  get coordinates():number[] {return this.#coordinates};

  set state(state:string) { this.#state = state};
  set coordinates(coordinates:number[]) { this.#coordinates = coordinates};

  
  constructor(state:string, coor:number[]){
    this.state = state;
    this.#coordinates = coor;

  }

}
export class Production{
  #prodName!:string;
  #location!: Location;
  //#state!:string;
  // #lng!:number
  // #lat!:number

   
  get prodName():string {return this.#prodName};
  get location():Location {return this.#location};

  // get lng():number {return this.#lng};
  // get lat():number {return this.#lat};

  set prodName(prodName:string) { this.#prodName = prodName};
  set location(location:Location) { this.#location = location};

  // set lng(lng:number) { this.#lng = lng};
  // set lat(lat:number) { this.#lat = lat};
  // constructor(prodName:string,state:string,lng:number,lat:number){
  constructor(prodName:string,location:Location){

    this.prodName = prodName;
    this.location = location;

    // this.lng = lng;
    // this.lat = lat;
  }
}

export class Movie{
  #_id!:string;
  #title!:string;
  #year!:number
  #genre!:string
  #casts!:[Actor];
  #production!:Production
  
  get _id():string {return this.#_id};
  get title():string {return this.#title};
  get year():number {return this.#year};
  get genre():string {return this.#genre};
  get casts():[Actor] {return this.#casts};
  get production():Production {return this.#production};

  set _id(_id:string) { this.#_id = _id};
  set title(title:string) { this.#title = title};
  set year(year:number) { this.#year = year};
  set genre(genre:string) { this.#genre = genre};
  set casts(casts:[Actor]) { this.#casts = casts};
  set production(production:Production) { this.#production = production};
  constructor(_id:string,title:string,year:number,genre:string,casts:[Actor],production:Production){
    this._id = _id;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.casts = casts;
    this.production = production;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies:Movie[] = [];
  title:string = '';
  state:string ='';
  searchBy:string = '';
  offset:number = 0;
  count:number = 5;

  constructor(private movieServices:MoviesApiService) { }

  ngOnInit(): void {
    this.movieServices.getAll()
      .then(movies=>this._setMovies(movies))
      .catch(err=>this._handleError(err))
      ;
  }
  private _handleError(err:any):void{
    console.log(err);
  }
  private _setMovies(movies:Movie[]):void{
    console.log(movies);
      this.movies = movies;
  }
  search(){
      if(this.searchBy === "title"){
           this.searchByTitle();
      }
      else{
        this.searchByState();
        console.log(this.state);
        
      }
  }
  searchByTitle(){
    this.movieServices.searchByTitle(this.title)
    .then(movies=>this._setMovies(movies))
    .catch(err=>this._handleError(err))
    ;
  }
  searchByState(){
    this.movieServices.searchByState(this.state)
    .then(movies =>this._setMovies(movies))
    .catch(err=>this._handleError(err))
    ;
  }
  previous(){
     this.offset = this.offset - this.count;
     this._getMoviesLimit();
  }
  
  next(){
    this.offset = this.offset + this.count;
    this._getMoviesLimit();
  }
 private _getMoviesLimit(){
  this.movieServices.getMoviesByOffset(this.offset)
  .then(movies =>this._setMovies(movies))
  .catch(err=>this._handleError(err));
 }

}
