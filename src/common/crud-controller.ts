import * as Hapi from 'hapi';
import * as Boom from 'boom';

import Utils from '../helper/utils';
import Logger from '../helper/logger';
import CrudResolver from '../common/base-resolver';

export default class CrudController<T> {
    constructor(private crudResolver: CrudResolver<T>) {}

    public create = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            const data: any = await this.crudResolver.save(request.payload);

            return response({
                statusCode: 200,
                data: {
                    id: data['_id'],
                },
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public updateById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`PUT - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            const entity: T = await this.crudResolver.updateOneById(id, request.payload);

            return response({
                statusCode: 200,
                data: entity,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public getById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            const entity: T = await this.crudResolver.getOneById(id);

            return response({
                statusCode: 200,
                data: entity,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public getAll = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const entities: T[] = await this.crudResolver.getAll();

            return response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public deleteById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`DELETE - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            await this.crudResolver.deleteOneById(id);

            return response({
                statusCode: 200,
                data: { id },
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public bulkUpdate = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const ids: string[] = request.payload.ids as string[];
            let field: string = '';
            let value: string = '';

            for (const param of Object.keys(request.payload)) {
                if (!Array.isArray(request.payload[param])) {
                    field = param;
                    value = request.payload[param];
                }
            }

            const entities: any[] = await this.crudResolver.bulkUpdate(ids, field, value);

            return response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    public bulkDelete = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const ids: string[] = request.payload.ids as string[];

            const entities: T[] = await this.crudResolver.bulkDelete(ids);

            if (!entities) {
                return response(Boom.notFound('Items not found.'));
            }

            return response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };
}
