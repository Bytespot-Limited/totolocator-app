import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitle',
  standalone: false
})
export class CamelToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // SCREAMING_SNAKE_CASE → Title Case  (GRADE_1 → Grade 1, PICKUP → Pickup)
    if (/^[A-Z0-9_]+$/.test(value)) {
      return value.replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, s => s.toUpperCase());
    }
    // camelCase → Title Case  (entityStatus → Entity Status)
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  }
}
