import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor, Movie, Production } from './movies/movies.component';


@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  #baseApiUrl = "http://localhost:3000/api/"
  constructor(private http:HttpClient) { }
  getAll():Promise<Movie[]>{
    const url = this.#baseApiUrl + 'movies'
    return this.http.get(url).toPromise()
      .then(jobs => jobs as Movie)
      .catch(err=> this._handleError(err))
  }
  private _handleError(err:any):Promise<any>{
    return Promise.reject(err);
  }
  getOne(movieId:string):Promise<Movie>{
    const url = this.#baseApiUrl + 'movies/' + movieId;
    return this.http.get(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  addOne(movie:Movie){
    const url = this.#baseApiUrl + 'movies/';
    const newMovie = {
      title:movie.title,
      year:movie.year,
      genre:movie.genre,
    }
    return this.http.post(url,newMovie).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  addCast(actor:Actor, movieId:string){
    const url = this.#baseApiUrl + 'movies/' + movieId + '/actors';
    const newActor = {
      name:actor.name,
      age:actor.age
    }
    return this.http.post(url,newActor).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  addProduction(production:Production, movieId:string){
    const url = this.#baseApiUrl + 'movies/' + movieId + '/production';
    const newProduction = {
      prodName:production.prodName,
      state:production.location.state,
      lng:production.location.coordinates[0],
      lat:production.location.coordinates[1]
    }
    console.log(newProduction);
    return this.http.post(url,newProduction).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  fullUpdate(movie:Movie,  movieId:string){
    const url = this.#baseApiUrl + 'movies/'  + movieId;
    const newMovie = {
      title:movie.title,
      year:movie.year,
      genre:movie.genre,
    }
    return this.http.put(url,newMovie).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  partialUpdate(movie:Movie,  movieId:string){
    const url = this.#baseApiUrl + 'movies/'  + movieId;
    const newMovie = {
      title:movie.title,
      year:movie.year,
      genre:movie.genre,
    }
    return this.http.patch(url,newMovie).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  deleteOne(movieId:string){
    const url = this.#baseApiUrl + 'movies/' + movieId;
    return this.http.delete(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  searchByTitle(title:string){
    const url = this.#baseApiUrl + 'movies?title=' + title;
    return this.http.get(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  searchByState(state:string){
    const url = this.#baseApiUrl + 'movies?state=' + state;
    return this.http.get(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  getMoviesByOffset(offset:number){
    const url = this.#baseApiUrl + 'movies?offset=' + offset;
    return this.http.get(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
  geoSearch(lng:number, lat:number, dist:number){
    const url = this.#baseApiUrl + 'movies?lng=' + lng +'&lat=' + lat + '&distance=' + dist;
    return this.http.get(url).toPromise()
      .then(movie => movie as Movie)
      .catch(err=> this._handleError(err))
  }
}
