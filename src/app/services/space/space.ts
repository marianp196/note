import { Domain } from '../core/domain/domain';
import * as _ from 'lodash';

export class Space implements Domain {
    public id: string;    
    public header: string;
    public iconKey: string;
    public safe: boolean;

    getMemento() {
        return _.assign({}, this);
    }

    setMemento(memento: any) {
        _.assign(this, memento);
    }


}