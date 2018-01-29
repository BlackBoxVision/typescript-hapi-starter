import * as Hapi from 'hapi';
import * as Nedb from 'nedb';
import Config from 'app/config';

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

export interface IPayload<T> {
    status: number;
    data: T;
}

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
export interface IRepository<EntityType, PKeyType = string> {
    save: (data: EntityType) => Promise<EntityType>;
    getById: (_id: PKeyType) => Promise<EntityType>;
    getAll: () => Promise<EntityType[]>;
    updateById: (_id: PKeyType, data: EntityType) => Promise<EntityType>;
    deleteById: (_id: PKeyType) => Promise<PKeyType>;
}

export interface IUserRepository extends IRepository<IUser, string> {}
export interface IArticleRepository extends IRepository<IArticle, string> {}

/**
 * 5. Resolvers
 */
export interface IResolver<T, PKeyType = string> {
    save: (data: T) => Promise<T>;
    getOneById: (id: PKeyType) => Promise<T>;
    updateOneById: (id: PKeyType, update: any) => Promise<T>;
    deleteOneById: (id: PKeyType) => Promise<PKeyType>;
    getAll: () => Promise<T[]>;
    bulkUpdate: (ids: PKeyType[], field: string, value: string) => Promise<T[]>;
    bulkDelete: (ids: PKeyType[]) => Promise<PKeyType[]>;
}

export interface IUserResolver extends IResolver<IUser, string> {}
export interface IArticleResolver extends IResolver<IArticle, string> {}

/**
 * 6. Controllers
 */

export interface ICrudController<T> {
    create: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    updateById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    getById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    getAll: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    deleteById: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    bulkUpdate: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
    bulkDelete: (request: Hapi.Request, response: Hapi.ReplyNoContinue) => Promise<any>;
}

export interface IUsersController extends ICrudController<IUser> {}
export interface IArticlesController extends ICrudController<IArticle> {}
