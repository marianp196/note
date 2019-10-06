export enum ChangeType {
    Add, Update, Delete
}

export interface ChangeTrigger {
    trackId(changeType: ChangeType, domainName: string, id: string): Promise<any>;
}