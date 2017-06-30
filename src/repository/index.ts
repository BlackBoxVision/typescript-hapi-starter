export default class Repository<T> {
    public dataSource = new Map();

    public save(id: string, dataToSave: T): void {
        this.dataSource.set(id, dataToSave);
    }

    public getById(id: string) {
        return this.dataSource.get(id);
    }

    public getAll() {
        const data: T[] = [];

        this.dataSource.forEach((value: T) => data.push(value));

        return data;
    }

    public updateById(id: string, dataToUpdate: T): void {
        const data: T = this.dataSource.get(id);

        if (data) {
            this.dataSource.delete(id);
        }

        this.dataSource.set(id, dataToUpdate);
    }

    public delete(id: string) {
        this.dataSource.delete(id);
    }
}
