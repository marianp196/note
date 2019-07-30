import { NoteData } from './../services/domain/note-data';
import { Domain } from './../services/domain/domain';
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
    const list = value as Domain<NoteData>[];

    if (!search || search === '') {
      return value;
    }

    return list.filter(note => {
      return note.data.freeTags
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
      || note.data.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    });
  }

}
