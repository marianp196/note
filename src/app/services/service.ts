import { Domain } from './domain';

export interface Service<T extends Domain> {
    createObj(): T;
    create(domain: T): Promise<T>;
    update(domain: T): Promise<T>;
    delete(domain: T): Promise<boolean>;
    getAll(): Promise<T[]>;
    get(id: string): Promise<T>;
}