import * as moment from 'moment';
import { Domain } from '../core/domain/domain';

export class NoteData implements Domain {
    public id: string;

    public title: string;
    public text: string;
    public timestamp: moment.Moment;

    public spaceId: string;
    public categories: string[];
    public freeTags: string;
    public attechments: string[];

    getMemento() {
        return {
            id: this.id,
            title: this.title,
            text: this.text,
            timestamp: this.timestamp ? this.timestamp.format() : null,
            categories: this.categories,
            freeTags: this.freeTags,
            attechments: this.attechments,
            spaceId: this.spaceId
        }
    }

    setMemento(memento: any) {
        this.id = memento.id;
        this.text = memento.text;
        this.title = memento.title;
        this.categories = memento.categories;
        this.freeTags = memento.freeTags;
        this.attechments = memento.attechments;
        if (memento.timestamp) {
            this.timestamp = moment(memento.timestamp);
        }
        this.spaceId = memento.spaceId;
    }

    copy(): NoteData {
        const newSpace = new NoteData();
        newSpace.setMemento(this.getMemento());
        return newSpace; 
    }
}
