import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rate'
})
export class RatePipe implements PipeTransform {
  #stars="";

  transform(value: number, ...args: unknown[]): string {
    if(value > 5){
      value = 5;
    }
    else if(value < 0){
      value = 0;
    }
    for(let i = 0; i < value; i++){
      this.#stars += "⭐";
    }
    return this.#stars;
  }

}
