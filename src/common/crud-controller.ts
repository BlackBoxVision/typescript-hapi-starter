import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { injectable } from 'inversify';
import { ICrudController, IResolver } from 'app/interfaces';

@injectable()
export default class CrudController<T> implements ICrudController<T> {
    /**
     * Resolver Instance
     */
    protected crudResolver: IResolver<T>;

    /**
     * Crud Controller constructor
     *
     * @param {IResolver<T>} crudResolver
     */
    constructor(crudResolver: IResolver<T>) {
        this.crudResolver = crudResolver;
    }

    /**
     * Create
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public create = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            const data: any = await this.crudResolver.save(request.payload);

            return response({
                statusCode: 201,
                data: {
                    _id: data['_id'],
                },
            }).code(201);
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    /**
     * Update By ID
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public updateById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
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

    /**
     * Get By ID
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public getById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
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

    /**
     * Get All
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public getAll = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            const entities: T[] = await this.crudResolver.getAll();

            return response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    /**
     * Delete By ID
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public deleteById = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            const id = encodeURIComponent(request.params.id);

            await this.crudResolver.deleteOneById(id);

            return response({
                statusCode: 200,
                data: { _id: id },
            });
        } catch (error) {
            return response(Boom.badImplementation(error));
        }
    };

    /**
     * Bulk Update
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public bulkUpdate = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
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

    /**
     * Bulk Delete
     *
     * @param {Request} request
     * @param {ReplyNoContinue} response
     * @returns {Promise<any>}
     */
    public bulkDelete = async (request: Hapi.Request, response: Hapi.ReplyNoContinue): Promise<any> => {
        try {
            const ids: string[] = request.payload.ids as string[];

            const entities: string[] = await this.crudResolver.bulkDelete(ids);

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
