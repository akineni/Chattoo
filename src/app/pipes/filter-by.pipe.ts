import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: any, arg: any): any[] {
    if(!arg) return value
    return value.filter((e: any) => e.toLowerCase().includes(arg.toLowerCase()))
  }

}
