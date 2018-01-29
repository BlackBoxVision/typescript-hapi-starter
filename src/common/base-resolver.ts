import { injectable } from 'inversify';
import { IRepository, IResolver } from 'app/interfaces';

@injectable()
export default class CrudResolver<T, PKeyType = string> implements IResolver<T, PKeyType> {
    protected repository: IRepository<T, PKeyType>;

    constructor(repository: IRepository<T, PKeyType>) {
        this.repository = repository;
    }

    public async save(data: T): Promise<T> {
        return await this.repository.save(data);
    }

    public async getOneById(id: PKeyType): Promise<T> {
        return await this.repository.getById(id);
    }

    public async updateOneById(id: PKeyType, update: any): Promise<T> {
        return await this.repository.updateById(id, update);
    }

    public async deleteOneById(id: PKeyType): Promise<PKeyType> {
        return await this.repository.deleteById(id);
    }

    public async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }

    public async bulkUpdate(ids: PKeyType[], field: string, value: string): Promise<T[]> {
        return await Promise.all(ids.map(async id => await this.updateOneById(id, { [field]: value })));
    }

    public async bulkDelete(ids: PKeyType[]): Promise<PKeyType[]> {
        return await Promise.all(ids.map(async id => await this.deleteOneById(id)));
    }
}
