import { injectable } from 'inversify';
import { IRepository, IResolver, IUser } from '../interfaces';

@injectable()
export default class CrudResolver<T> implements IResolver<T> {
    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    public async save(data: T): Promise<T> {
        return await this.repository.save(data);
    }

    public async getOneById(id: string): Promise<T> {
        return await this.repository.getById(id);
    }

    public async updateOneById(id: string, update: any): Promise<T> {
        return await this.repository.updateById(id, update);
    }

    public async deleteOneById(id: string): Promise<string> {
        return await this.repository.deleteById(id);
    }

    public async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }

    public async bulkUpdate(ids: string[], field: string, value: string): Promise<T[]> {
        return await Promise.all(ids.map(async id => await this.updateOneById(id, { [field]: value })));
    }

    public async bulkDelete(ids: string[]): Promise<string[]> {
        return await Promise.all(ids.map(async id => await this.deleteOneById(id)));
    }
}
