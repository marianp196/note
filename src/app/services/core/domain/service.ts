import { Domain } from './domain';

export interface Service<T extends Domain> {
    createObj(): T;
    create(domain: T): Promise<any>;
    update(domain: T): Promise<any>;
    delete(domain: T): Promise<boolean>;
    getAll(): Promise<T[]>;
    get(id: string): Promise<T>;
}