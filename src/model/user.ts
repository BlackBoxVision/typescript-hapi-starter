export default class User {
    
    public _id: string;
    public age: Number;
    public name: string;
    public lastName: string;

    constructor(name: string) {
        this._id = "test";
        this.name = name;
        this.age = 12;
        this.lastName = "Smith";
    }

    toString() {
        return `UserID: ${this._id}, Age: ${this.age}, Name: ${this.name}, LastName: ${this.lastName}`;
    }
}
