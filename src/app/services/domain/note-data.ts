export class NoteData {
    public title: string;
    public text: string;
    public timestamp: Date;

    public categories: string[] = [];
    public freeTags: string;
    public attechments: string[] = [];
}
