import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitle',
  standalone: false
})
export class CamelToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  }
}
