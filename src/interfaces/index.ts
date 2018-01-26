import * as Hapi from 'hapi';
import * as Nedb from 'nedb';
import Config from '../config';

/**
 * 1. Generic Interfaces
 * 2. Services
 * 3. Models
 * 4. Repositories
 * 5. Resolvers
 * 7. Controllers
 */

/**
 * 1. Generic Interfaces
 */
export interface IServerRegisterable {
    register: (server: Hapi.Server) => Promise<Error | any>;
}

// tslint:disable-next-line no-empty-interface
export interface IRouteConfiguration extends Hapi.RouteConfiguration {}

// tslint:disable-next-line no-empty-interface
export interface IServer extends Hapi.Server {}

export type INedbDatastore = Nedb;

/**
 * 2. Services
 */
export type IConfig = typeof Config;

export interface ILogger {
    log: (level: string, message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
}

export interface IServerFactory {
    create: () => Promise<IServer>;
}

/**
 * 3. Models
 */
export interface IUser {
    _id?: string;
    age?: number;
    name?: string;
    lastName?: string;
}

export interface IArticle {
    _id?: string;
    name?: string;
}

/**
 * 4. Repositories
 */
export interface IRepository<T> {
    save: (data: T) => Promise<T>;
    getById: (_id: string) => Promise<T>;
    getAll: () => Promise<T[]>;
    updateById: (_id: string, data: T) => Promise<T>;
    deleteById: (_id: string) => Promise<string>;
}

export interface IUserRepository extends IRepository<IUser> {}
export interface IArticleRepository extends IRepository<IArticle> {}

/**
 * 5. Resolvers
 */
export interface IResolver<T> {
    save: (data: T) => Promise<T>;
    getOneById: (id: string) => Promise<T>;
    updateOneById: (id: string, update: any) => Promise<T>;
    deleteOneById: (id: string) => Promise<string>;
    getAll: () => Promise<T[]>;
    bulkUpdate: (ids: string[], field: string, value: string) => Promise<T[]>;
    bulkDelete: (ids: string[]) => Promise<string[]>;
}

export interface IUserResolver extends IResolver<IUser> {}
export interface IArticleResolver extends IResolver<IArticle> {}

/**
 * 6. Controllers
 */

export interface ICrudController {
    create: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    updateById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    getById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    getAll: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    deleteById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    bulkUpdate: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    bulkDelete: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
}
