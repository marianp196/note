import * as moment from 'moment';

export class NoteData {
    public title: string = null;
    public text: string = null;
    public timestamp: moment.Moment = moment();

    public categories: string[] = [];
    public freeTags: string = null;
    public attechments: string[] = [];
}
