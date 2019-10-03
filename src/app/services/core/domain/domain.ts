export interface Domain {
    id: string;
    getMemento(): any;
    setMemento(memento: any);
}