import { Pipe, PipeTransform } from '@angular/core';

/*
 *  @Brief: Dynamically filters items in an array based on the given string.
 *
 *  @Params:
 *      - items[]: array of heroes
 *      - searchText: search input
 *
 *  @Description: As the user types in the heroes' name in the search bar in the HeroesComponent,
 *  this custom pipe uses the transform function to dynamically filter the given object 'items'
 *  based on the 'searchText' string, which displays only heroes' names which include that string.
 */

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        const lowerSearchText = searchText.toLowerCase();
        return items.filter((it) => {
            return it.niceName.toLowerCase().includes(lowerSearchText);
        });
    }
}
