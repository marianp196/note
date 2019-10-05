import { NoteData } from '../services/note/note-data';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (args.length === 0 || !value) {
      return value;
    }

    const search = args[0];
    const list = value as NoteData[];

    if (!search || search === '') {
      return value;
    }

    return list.filter(note => {
      return (note.freeTags &&note.freeTags
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()))

      || (note.title && note.title
      
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase()));
    });
  }

}
