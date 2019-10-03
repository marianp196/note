import { StoreDef } from './store-def.model';

export class DatabaseSchema {
    public dbName: string;
    public currentVersion: number;

    public tables: StoreDef[];
}