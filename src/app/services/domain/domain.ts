import { EClientState } from './client-state';
export class Domain<TData> {
    public id: string;
    public data: TData;
    public state: EClientState;
}
