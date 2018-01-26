import { IUser } from '../interfaces';

export default class Article implements IUser {
    public _id: string;
    public name: string;
}
