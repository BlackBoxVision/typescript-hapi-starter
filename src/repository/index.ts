export default class Repository<T> {
    public dataSource = new Map();

    public save(id: string, data: T): void {
        this.dataSource.set(id, data);
    }

    public getById(id: string) {
        return this.dataSource.get(id);
    }

    public getAll() {
        const data: T[] = [];

        this.dataSource.forEach((value: T) => data.push(value));

        return data;
    }

    public updateById(id: string, data: T): void {
        const user: T = this.dataSource.get(id);

        if (user) {
            this.dataSource.delete(id);
        }

        this.dataSource.set(id, data);
    }

    public delete(id: string) {
        this.dataSource.delete(id);
    }
}
