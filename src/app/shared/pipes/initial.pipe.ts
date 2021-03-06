import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'initial'})
export class Initial implements PipeTransform {
    transform(value: string): string {
        const initial = value.substring(0, 1);
        initial.toUpperCase();
        return initial;
    }
}
