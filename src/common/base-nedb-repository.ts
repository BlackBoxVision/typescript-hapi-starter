import { injectable } from 'inversify';
import { INedbDatastore, IRepository } from 'app/interfaces';

@injectable()
export default class BaseNedbRepository<T> implements IRepository<T, string> {
    /**
     * Datasource
     */
    protected dataSource: INedbDatastore;

    /**
     * BaseNedbRepository Constructor
     *
     * @param {INedbDatastore} datastore
     */
    public constructor(datastore: INedbDatastore) {
        this.dataSource = datastore;
    }

    /**
     * Save an entity
     *
     * @param {T} data
     * @returns {Promise<T>}
     */
    public save(data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataSource.insert<T>(data, (error, document) => {
                if (error) {
                    reject(error);
                }

                resolve(document);
            });
        });
    }

    /**
     * Get entity by ID
     *
     * @param {string} _id
     * @returns {Promise<T>}
     */
    public getById(_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataSource.findOne<T>({ _id }, (error, document) => {
                if (error) {
                    reject(error);
                }

                resolve(document);
            });
        });
    }

    /**
     * Get all entities
     *
     * @returns {Promise<T[]>}
     */
    public getAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.dataSource.find<T>({}, (error, documents) => {
                if (error) {
                    reject(error);
                }

                resolve(documents);
            });
        });
    }

    /**
     * Update entity by ID
     *
     * @param {string} _id
     * @param {T} data
     * @returns {Promise<T>}
     */
    public updateById(_id: string, data: T): Promise<T> {
        return new Promise((resolve, reject) => {
            this.dataSource.update({ _id }, data, undefined, error => {
                if (error) {
                    reject(error);
                }

                this.getById(_id).then(value => resolve(value));
            });
        });
    }

    /**
     * Delete entity by ID
     *
     * @param {string} _id
     * @returns {Promise<string>}
     */
    public deleteById(_id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.dataSource.remove({ _id }, error => {
                if (error) {
                    reject(error);
                }

                resolve(_id);
            });
        });
    }

    public async bulkUpdate(ids: string[], fields: T): Promise<T[]> {
        return await Promise.all(ids.map(async id => await this.updateById(id, fields)));
    }

    public async bulkDelete(ids: string[]): Promise<string[]> {
        return await Promise.all(ids.map(async id => await this.deleteById(id)));
    }
}
