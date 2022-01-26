import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddProductionComponent } from './add-production/add-production.component';
import { AddCastComponent } from './add-cast/add-cast.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { UpdateCastComponent } from './update-cast/update-cast.component';
import { UpdateProductionComponent } from './update-production/update-production.component';
import { GeoSearchComponent } from './geo-search/geo-search.component';
import { RatePipe } from './rate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    MovieComponent,
    ErrorPageComponent,
    AddMovieComponent,
    AddProductionComponent,
    AddCastComponent,
    UpdateMovieComponent,
    UpdateCastComponent,
    UpdateProductionComponent,
    GeoSearchComponent,
    RatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      }, 
      {
        path:'movies/:movieId',
        component:MovieComponent
      }, 
      {
        path:'movies',
        component:MoviesComponent
      }, 
      {
        path:'addMovie',
        component:AddMovieComponent
      },
      {
        path:'movies/:movieId/update',
        component:UpdateMovieComponent
      },
      {
        path:'geoSearch',
        component:GeoSearchComponent
      },
      {
        path:'**',
        component:ErrorPageComponent
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
