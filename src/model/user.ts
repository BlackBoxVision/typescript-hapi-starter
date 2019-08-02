export default class User {
  public _id: string;

  public age: number;

  public name: string;

  public lastName: string;

  public creationDate: Date;

  constructor(name: string) {
    this._id = 'test';
    this.name = name;
    this.age = 12;
    this.lastName = 'Smith';
    this.creationDate = new Date();
  }

  public toString() {
    return `UserID: ${this._id}, Age: ${this.age}, Name: ${this.name}, LastName: ${this.lastName}`;
  }
}
